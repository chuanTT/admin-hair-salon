import { getLoadSettingsLogo } from "@/api/otherApi"
import { fucStyleCovert, isObject, setStyleImageSettings } from "@/common/functions"
import { ReactSelectCus } from "@/components/CustomField"
import ListImagesUploadFile, { refListImage } from "@/components/CustomField/ListImagesUploadFile"
import { childrenFormHandel } from "@/components/FormHandel"
import Loading from "@/components/Loading"
import useFetchingApi from "@/hooks/useFetchingApi"
import LayoutFormDefault from "@/layout/LayoutFormDefault"
import { SelectDefault } from "@/types"
import { FC, useEffect, useRef, useState } from "react"

interface listOpt {
  name: string
  option: SelectDefault[]
}

interface typeTranslate {
  title?: string
  placeholder?: string
}

const fucTranslate = (name: string): typeTranslate => {
  const opt: { [key: string]: { title?: string; placeholder?: string } } = {
    "object-fit": {
      title: "Kích thước",
      placeholder: "Chọn kích thước"
    },
    "object-position": {
      title: "Vị trí",
      placeholder: "Chọn vị trí"
    }
  }

  return opt?.[name] || {}
}

interface UpdateLogoSettingProps extends childrenFormHandel {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  logo?: any
  isFetchedSettings?: boolean
}

const UpdateLogoSetting: FC<UpdateLogoSettingProps> = ({
  propForm,
  isPending,
  setResertForm,
  logo,
  isFetchedSettings
}) => {
  const { setValue, register, getValues, clearErrors } = propForm
  const ImgRef = useRef<refListImage>(null)
  const [, setUpdated] = useState(false)
  const [dataOption, setDataOption] = useState<listOpt[]>([])
  const [settingsImg, setSettingsImg] = useState({})
  const { data, isFetched } = useFetchingApi({
    nameTable: "load_settings_logo",
    CallAPi: getLoadSettingsLogo
  })

  useEffect(() => {
    if (data?.data) {
      if (isObject(data?.data)) {
        const arrKey = Object.keys(data?.data)

        if (arrKey) {
          let OptionArr: listOpt[] = []
          arrKey.forEach((key) => {
            const item: listOpt = {
              name: key,
              option: []
            }
            const result = data?.data?.[key]

            if (isObject(result)) {
              const arrKeyItem = Object.keys(result)

              if (arrKeyItem) {
                item.option = arrKeyItem.map((itemKey) => {
                  return {
                    label: itemKey,
                    value: result?.[itemKey]
                  }
                })
              }
            } else {
              if (Array.isArray(result)) {
                item.option = result.map((itemKey) => ({ label: itemKey, value: itemKey }))
              }
            }

            OptionArr = [...OptionArr, { ...item }]
          })

          setDataOption(OptionArr)
        }
      }
    }
  }, [data])

  useEffect(() => {
    if (logo) {
      const settingsStyle = setStyleImageSettings({
        logo,
        callback: (src) => {
          if (src) {
            ImgRef.current && ImgRef.current?.setSrc?.(src)
          }
          setUpdated((prev) => !prev)
        },
        callLoop: (key, value) => {
          setValue(key, value)
        }
      })
      setSettingsImg(settingsStyle)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [logo])

  return (
    <div>
      <h2 className="text-lg">Thay đổi logo</h2>

      {!isFetchedSettings && <Loading classNameDiv="flex justify-center [&>*]:scale-50 items-start py-4" />}
      {isFetchedSettings && (
        <LayoutFormDefault
          isPending={isPending}
          txtButtonPrimary="Chỉnh sửa"
          clickButtonCancel={() => {
            clearErrors()
            typeof setResertForm === "function" && setResertForm((prev) => !prev)
          }}
        >
          {!isFetched && <Loading classNameDiv="flex justify-center [&>*]:scale-50 items-start py-4" />}
          {isFetched &&
            dataOption &&
            dataOption.map((opt, index) => {
              const translate = fucTranslate(opt.name)
              return (
                <ReactSelectCus
                  key={index}
                  title={translate?.title}
                  parenSelect="mb-3 col-md-6"
                  placeholder={translate?.placeholder}
                  name={opt.name}
                  options={opt.option || []}
                  getValue={getValues}
                  setValue={setValue}
                  changeSelected={(selected) => {
                    const { value } = selected
                    const nameFisrt = fucStyleCovert(opt.name)
                    setSettingsImg({ ...settingsImg, [nameFisrt]: value })
                  }}
                />
              )
            })}
          <ListImagesUploadFile
            title="Hình ảnh"
            classParentImg="mb-3"
            ref={ImgRef}
            setValue={setValue}
            name="logo"
            register={register}
            styleImg={{ style: settingsImg }}
          />
        </LayoutFormDefault>
      )}
    </div>
  )
}

export default UpdateLogoSetting
