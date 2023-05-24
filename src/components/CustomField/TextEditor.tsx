import { useState, useRef, useMemo } from "react"
import JoditEditor from "jodit-react"
import { FieldValues, UseFormSetValue } from "react-hook-form"

interface TextEditorProps {
  placeholder?: string
  name?: string
  title?: string
  classAreaContainer?: string
  setValue?: UseFormSetValue<FieldValues>
  isRequire?: boolean
}

const TextEditor = ({ placeholder, name, title, classAreaContainer, setValue, isRequire }: TextEditorProps) => {
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

  return (
    <div className={classAreaContainer ?? ""}>
      {title && (
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor={name}>
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
    </div>
  )
}

export default TextEditor
