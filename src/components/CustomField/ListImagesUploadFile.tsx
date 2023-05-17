import {
  useEffect,
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
  DragEvent,
  ChangeEvent,
  ForwardedRef,
  MouseEvent
} from "react"
import { UseFormRegister, FieldValues, UseFormSetValue } from "react-hook-form"

import Portal from "../Portal"
import Modal from "../Modal"
import Images from "../Images"

interface optListImages {
  src?: string
  del?: boolean
}

export interface refListImage {
  clearImage?: () => void
  setSrc?: (str: string | undefined) => void
}

interface ListImagesProps {
  name: string
  register: UseFormRegister<FieldValues>
  setValue?: UseFormSetValue<FieldValues>
  msgSize?: string
  msgType?: string
  sizeFile?: number | string
  validType?: []
  classParentImg?: string
  listImagesViews?: optListImages[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setFieldError?: any
  classWapper?: string
  isDisable?: string
  title?: string
  isRequire?: boolean
}

function ListImages(props: ListImagesProps, ref: ForwardedRef<refListImage>) {
  const {
    name,
    register,
    setValue,
    msgSize,
    msgType,
    sizeFile,
    validType,
    classParentImg,
    listImagesViews,
    setFieldError,
    classWapper,
    isDisable,
    title,
    isRequire
  } = props
  const dataFile = useRef(new DataTransfer())
  const [isOpen, setIsOpen] = useState(false)
  const InputFile = useRef<HTMLInputElement | null>(null)
  // const [images, setImages] = useState()
  const [srcViews, setSrcView] = useState("")
  const [listImages, setListImages] = useState<optListImages[] | undefined>([])

  useImperativeHandle(
    ref,
    () => {
      return {
        clearImage: () => {
          setListImages([])
          if (dataFile.current) {
            dataFile.current.items.clear()
          }
        },
        setSrc: (src: string | undefined) => {
          setListImages((prev) => {
            if (prev) {
              return [...prev, { src }]
            }

            return [{ src }]
          })
        }
      }
    },
    []
  )

  useEffect(() => {
    if (listImages?.length === 0) {
      setListImages(listImagesViews)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listImagesViews])

  const delFiles = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    dataFile.current.items.clear()
    InputFile?.current && (InputFile.current.files = dataFile.current.files)
    setListImages((prev) => {
      if (prev) {
        const newPrev = [...prev]
        const [oneItem, ...spread] = newPrev
        if (oneItem?.del) {
          return spread
        }
        return newPrev
      }
      return prev
    })
    typeof setValue === "function" && setValue(name, {})
  }

  const VaildateUploadFiles = (file: File | null | undefined, inputFile: HTMLInputElement) => {
    if (file) {
      if (validType && !(validType ?? ["image/jpg", "image/jpeg", "image/png"])?.includes(file?.type as never)) {
        inputFile && (inputFile.value = "")
        console.log(1)
        typeof setFieldError === "function" && setFieldError(name, { type: "custom", message: msgType })
        return
      }
      const size = Number((file?.size / 1024 / 1024).toFixed(2))

      if (!(size <= (Number(sizeFile) || 5))) {
        inputFile && (inputFile.value = "")
        typeof setFieldError === "function" && setFieldError(name, msgSize || "Dung dượng file vượt quá giới hạn")
        return
      }

      dataFile.current.items.clear()
      dataFile.current.items.add(file)
    } else if (dataFile.current.files.length > 0 && inputFile) {
      file = dataFile.current.files[0]
      if (file && inputFile?.files) {
        inputFile.files[0] = file
      }
    }

    let preview = ""
    if (file) {
      preview = URL.createObjectURL(file)
    }

    setListImages((prev) => {
      if (prev) {
        const newPrev = [...prev]
        let uniArr = []
        const option = { src: preview, del: true }

        if (newPrev[0]?.del) {
          const [, ...spread] = newPrev
          uniArr = [option, ...spread]
        } else {
          uniArr = [option, ...newPrev]
        }

        return uniArr
      }
      return [{ src: preview, del: true }]
    })
    // setImages(file)
    typeof setValue === "function" && setValue(name, file)
  }

  const handelPreview = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target) {
      const file = e.target?.files?.[0]

      if (!isDisable && file) {
        VaildateUploadFiles(file, e.target)
      } else {
        e.target.value = ""
      }
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const DropFile = (e: any) => {
    e.preventDefault(e)
    const file = e.dataTransfer.files as FileList
    if (!isDisable) {
      if (file.length > 0) {
        const index = file.length - 1
        if (InputFile.current) {
          VaildateUploadFiles(file[index], InputFile.current)
        }
      }
    }
  }

  const Dragover = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  const Dragleave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  const viewsImages = (src: string) => {
    setSrcView(src)
    setIsOpen((prev) => !prev)
  }

  return (
    <div>
      {title && (
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor={name}>
          {title} {isRequire && <span className="text-red-500">*</span>}
        </label>
      )}

      <div className="flex flex-wrap gap-2">
        {listImages && listImages?.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {listImages.map((item, index) => {
              return (
                <div
                  key={index}
                  style={{ width: 102, height: 102 }}
                  className="p-1 border border-solid rounded-md relative"
                >
                  <div className="relative hover:[&>span]:opacity-100 h-full">
                    <Images
                      w={"100%"}
                      h={"100%"}
                      classNameImg="rounded-md h-full w-full"
                      src={item?.src}
                      alt="images"
                    />

                    <span
                      className="absolute inset-0 rounded-md transition-opacity duration-600 opacity-0"
                      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
                    >
                      <div className="flex gap-2 absolute text-white top-1/2 left-1/2 -translate-x-2/4 -translate-y-2/4">
                        <button type="button" onClick={() => viewsImages(item?.src ?? "")}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="16"
                            height="16"
                            className="pointer-events-none"
                          >
                            <path
                              d="M12 4C4 4 1 12 1 12C1 12 4 20 12 20C20 20 23 12 23 12C23 12 20 4 12 4 z M 12 7C14.761 7 17 9.239 17 12C17 14.761 14.761 17 12 17C9.239 17 7 14.761 7 12C7 9.239 9.239 7 12 7 z M 12 9 A 3 3 0 0 0 9 12 A 3 3 0 0 0 12 15 A 3 3 0 0 0 15 12 A 3 3 0 0 0 12 9 z"
                              fill="currentColor"
                            />
                          </svg>
                        </button>

                        {item?.del && (
                          <button type="button" onClick={delFiles} aria-hidden="true">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16">
                              <path
                                d="M10 2L9 3L4 3L4 5L7 5L17 5L20 5L20 3L15 3L14 2L10 2 z M 5 7L5 20C5 21.1 5.9 22 7 22L17 22C18.1 22 19 21.1 19 20L19 7L5 7 z"
                                fill="currentColor"
                              />
                            </svg>
                          </button>
                        )}
                      </div>
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        <div
          className={`flex items-center justify-center [&>*]:!w-full [&>*]:!h-full ${classParentImg || "w-full"}`}
          style={{
            width: 102,
            height: 102
          }}
          onDragOver={Dragover}
          onDrop={DropFile}
          onDragLeave={Dragleave}
          aria-hidden="true"
        >
          <div
            aria-hidden="true"
            onClick={() => {
              if (InputFile.current && !isDisable) {
                InputFile.current?.click()
              }
            }}
            className={`flex flex-col items-center justify-center w-full border-2 border-gray-300 border-dashed rounded-lg ${
              isDisable ? "" : "cursor-pointer"
            } bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 relative ${classWapper}`}
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                <path
                  fillRule="evenodd"
                  d="M11 2L11 11L2 11L2 13L11 13L11 22L13 22L13 13L22 13L22 11L13 11L13 2Z"
                  fill="#5B5B5B"
                />
              </svg>
              <p className="text-xs text-gray-500 dark:text-gray-400 !mb-0 mt-1">Upload</p>
            </div>

            <input
              id={name}
              type="file"
              className="hidden"
              {...register(name)}
              onChange={handelPreview}
              ref={InputFile}
            />
          </div>
        </div>
      </div>

      <Portal>
        <Modal classModalWidth={"max-h-[90%] overflow-y-auto"} isOpen={isOpen} setIsOpen={setIsOpen}>
          <Images w={"100%"} h={"auto"} classNameImg="rounded-md w-full" src={srcViews} alt="images" />
        </Modal>
      </Portal>
      {/* {isError && (
        <span className="text-sm text-red-600 block mt-px">
          {errors[name]?.message}
        </span>
      )} */}
    </div>
  )
}

const ListImagesUploadFile = forwardRef(ListImages)

export default ListImagesUploadFile
