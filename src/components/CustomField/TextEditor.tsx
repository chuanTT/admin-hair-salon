import { useState, useRef, useMemo, forwardRef, ForwardedRef, useImperativeHandle } from "react"
import JoditEditor from "jodit-react"
import { FieldValues, UseFormSetValue } from "react-hook-form"

export interface refTextEditor {
  clearValue: () => void
  setValue: (data?: string) => void
}

interface TextEditorProps {
  placeholder?: string
  name: string
  title?: string
  classAreaContainer?: string
  setValue?: UseFormSetValue<FieldValues>
  isRequire?: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  errors?: any
}

const TextEditor = ({ placeholder, name, title, classAreaContainer, setValue, isRequire, errors }: TextEditorProps, ref: ForwardedRef<refTextEditor>) => {
  const editor = useRef(null)
  const [content, setContent] = useState("")

  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: placeholder || "Start typings...",
      //   uploader: {
      //     insertImageAsBase64URI: true
      //   },
      showCharsCounter: false,
      showWordsCounter: false,
      showXPathInStatusbar: false,
      height: 600,
      buttons:
        "bold,italic,underline,strikethrough,ul,ol,font,fontsize,paragraph,lineHeight,superscript,subscript,image,cut,copy,hr,table,link,symbols,find,source,fullsize,preview,print"
    }),
    [placeholder]
  )

  useImperativeHandle(ref, () => {
    return {
      clearValue: () => {
        setContent("")
      },
      setValue: (data) => {
        setContent(data || "")
      }
    }
  }, [])

  return (
    <div className={classAreaContainer ?? ""}>
      {title && (
        <label className="block mb-2 text-sm font-medium text-gray-900 " htmlFor={name}>
          {title} {isRequire && <span className="text-red-500">*</span>}
        </label>
      )}
      <JoditEditor
        ref={editor}
        value={content}
        config={config}
        className="h-[400px]"
        //   tabIndex={1} // tabIndex of textarea
        onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
        onChange={(newContent) => {
          typeof setValue === "function" && setValue(name ?? "", newContent)
        }}
      />

      {errors?.[name]?.message && (
        <span className="text-sm text-red-600 block mt-2">
          {errors?.[name]?.message}
        </span>
      )}
    </div>
  )
}


const TextEditorCustom = forwardRef(TextEditor)

export default TextEditorCustom
