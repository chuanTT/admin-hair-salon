import { useState, useRef, useEffect, FC, Dispatch, SetStateAction } from "react"
import { useForm, FieldValues, UseFormProps, UseFormReturn, UseFormSetValue } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { ObjectSchema } from "yup"

// react query
// import useFetchingApi from '../hooks/useFetchingApi';
import { useMutation, useQueryClient } from "@tanstack/react-query"
// end react query

import { dataInter, typeObject } from "@/types"
// import useFetchingApi from "../../hooks/useFetchingApi"
import ToastCustom, { TypeToast } from "../ToastCustom"
import Loading from "../Loading"
import { AxiosResponse } from "axios"
import { MsgType, isEmptyObj } from "@/common/functions"
import SendFormData from "./SendFormData"
import useFetchingApi, { customUrlProps } from "@/hooks/useFetchingApi"
// import SendFormData from "../CustomForm/SendFormData";

interface FormHandelProps {
  children: (obj: {
    propForm: UseFormReturn
    isPending?: boolean
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    result?: any
    setResertForm?: Dispatch<SetStateAction<boolean>>
  }) => JSX.Element
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  customSubmitForm?: (data?: any) => void
  isValidate?: boolean
  msgObj?: {
    erorr?: string
    suss?: string
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  closeToastEvent?: (object: { data?: any; propForm?: UseFormReturn; remove?: () => void }) => void
  ClassForm?: string
  isEdit?: boolean
  defaultValues?: typeObject
  nameTable?: string
  id?: number | string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  schema?: ObjectSchema<any>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  callApi: (url: any) => Promise<AxiosResponse<any, any>>
  errorFuc?: (resert: UseFormReturn["reset"]) => void
  closeFuncSucc?: (obj: {
    propForm?: UseFormReturn
    remove?: () => void
    refetch?: () => void
    setResertForm?: Dispatch<SetStateAction<boolean>>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data?: dataInter | any
  }) => void
  customDefaultValue?: (obj: typeObject) => void
  customValue?: (obj: {
    setValue?: UseFormSetValue<FieldValues>
    key?: string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data?: any
    propForm?: UseFormReturn
  }) => void | boolean | undefined
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  customValuesData?: (data: any, result: any) => void
  removeClassForm?: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  callApiEdit?: (url: string) => Promise<AxiosResponse<any, any>>
  customUrl?: (obj: customUrlProps) => string | void | undefined
  isFormData?: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  sussFuc?: (data: any) => void
}

const FormHandel: FC<FormHandelProps> = (prop) => {
  const {
    children,
    customSubmitForm,
    schema,
    isValidate,
    msgObj,
    closeToastEvent,
    callApi,
    customValuesData,
    ClassForm,
    isEdit,
    defaultValues,
    customUrl,
    nameTable,
    id,
    callApiEdit,
    customDefaultValue,
    removeClassForm,
    errorFuc,
    sussFuc,
    customValue,
    closeFuncSucc,
    isFormData
  } = prop
  // init
  const [isPending, setIsPending] = useState(false)
  const [isOpenToast, setIsOpenToast] = useState(false)
  const msgToast = useRef({ title: "", type: TypeToast.WARN })
  const [resertForm, setResertForm] = useState(false)

  const QueryClient = useQueryClient()

  //   form
  const optionValidate: UseFormProps =
    isValidate && schema
      ? {
          mode: "all",
          reValidateMode: "onChange",
          criteriaMode: "firstError",
          defaultValues: defaultValues || {},
          resolver: yupResolver(schema)
        }
      : {}

  const propForm = useForm<FieldValues, UseFormReturn>(optionValidate)
  //   end form

  const ReRender = () => {
    setIsPending(false)
    setIsOpenToast(true)
  }

  const { data, mutate } = useMutation({
    mutationFn: (values: string | FormData | typeObject) => {
      return callApi(values)
    },
    onError: (error) => {
      if (error) {
        msgToast.current = MsgType(msgObj?.erorr ?? "Thêm thất bại")
      }
      typeof errorFuc === "function" && errorFuc(propForm.reset)
      ReRender()
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onSuccess: (context: any) => {
      if (context?.code === 402 || context?.code === 400) {
        msgToast.current = MsgType(context?.msg ?? msgObj?.erorr ?? "Thêm thất bại")
        typeof errorFuc === "function" && errorFuc(propForm.reset)
      } else if (context?.code === 422) {
        msgToast.current = MsgType(msgObj?.erorr ?? "Thêm thất bại")
        typeof errorFuc === "function" && errorFuc(propForm.reset)
      } else {
        msgToast.current = MsgType(context?.msg ?? msgObj?.suss ?? "Thêm thành công", false)
        nameTable && QueryClient.invalidateQueries([nameTable])
        typeof sussFuc === "function" && sussFuc(context)
      }
      ReRender()
    }
  })

  // edit form
  const {
    data: result,
    isSuccess: sussessGetData,
    refetch,
    isFetched,
    remove
  } = useFetchingApi({
    nameTable: `${nameTable ?? ""}`,
    CallAPi: callApiEdit,
    configCus: {
      refetchOnWindowFocus: false,
      enabled: false
    },
    isConfig: false,
    customUrl: (object) => {
      return (
        (typeof customUrl === "function" && customUrl({ ...object, id })) ||
        object?.query?.for(`${nameTable}/${id}`)?.url()
      )
    }
  })

  useEffect(() => {
    if (id !== 0) {
      isEdit && refetch()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  useEffect(() => {
    if (id !== 0) {
      if (result?.data && defaultValues) {
        if (!isEmptyObj(defaultValues)) {
          const arrKey = Object.keys(
            (typeof customDefaultValue === "function" && customDefaultValue(defaultValues)) || defaultValues
          )

          if (arrKey?.length > 0) {
            arrKey.forEach((key) => {
              ;(typeof customValue === "function" &&
                customValue({ setValue: propForm.setValue, key, data: result?.data, propForm })) ||
                propForm.setValue(key, result.data[key])
            })
          }
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result?.data, sussessGetData, resertForm])

  // end edit form
  //  end react query

  // xử lý submit form
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const SubmitForm = (values: any) => {
    if (customSubmitForm) customSubmitForm(values)

    // call api
    const customData = (typeof customValuesData === "function" && customValuesData(values, result)) || values
    const data = isEdit ? customData : isFormData ? SendFormData(customData) : customData
    setIsPending(true)
    mutate(data)
  }
  // end xử lý submit form

  return (
    <ToastCustom
      isOpenToast={isOpenToast}
      title={msgToast.current.title}
      type={msgToast.current.type}
      timeEnd={1000}
      CloseEvent={() => {
        setIsOpenToast(false)
        if (closeToastEvent) {
          closeToastEvent({ data, propForm, remove })
        }
        if (msgToast.current.type === "success") {
          typeof closeFuncSucc === "function" && closeFuncSucc({ propForm, remove, refetch, setResertForm, data })
          isEdit && refetch()
        }
      }}
    >
      <form
        onSubmit={propForm.handleSubmit(SubmitForm)}
        className={`${
          isEdit ? (!removeClassForm ? `${isFetched ? "bg-white" : ""} ` : "") : !removeClassForm ? `bg-white ` : ""
        } ${
          !removeClassForm &&
          ` [&>:not(:last-child)]:max-md:flex-col space-y-4 [&>*>span]:!w-44 [&>*>span]:!mb-0 [&>*>span]:!pt-0 py-6 px-6 rounded-sm  flex-shrink-0 ${ClassForm}`
        }`}
        // [&>*]:lg:!w-[84%] [&>*]:max-lg:!w-full
      >
        {isEdit && !isFetched && <Loading classNameDiv="flex justify-center [&>*]:scale-50 items-start py-4" />}
        {isEdit
          ? isFetched && children({ propForm, isPending, result: result || {}, setResertForm })
          : children({ propForm, isPending, result: result || {}, setResertForm })}
      </form>
    </ToastCustom>
  )
}

export default FormHandel
