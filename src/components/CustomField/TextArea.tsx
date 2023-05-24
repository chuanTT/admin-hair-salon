import { FC, HTMLAttributes, TextareaHTMLAttributes } from "react"
import { FieldError, FieldValues, UseFormRegister } from "react-hook-form"

interface TextAreaProps extends TextareaHTMLAttributes<HTMLElement> {
  title?: string
  name: string
  register: UseFormRegister<FieldValues>
  isError?: boolean
  errors?: FieldError | undefined
  classAreaContainer?: HTMLAttributes<HTMLElement>["className"]
  isRequire?: boolean
}

const TextArea: FC<TextAreaProps> = ({
  title,
  name,
  register,
  isError,
  errors,
  classAreaContainer,
  isRequire,
  ...rest
}) => {
  return (
    <div className={`${classAreaContainer ?? ""}`}>
      {title && (
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor={name}>
          {title} {isRequire && <span className="text-red-500">*</span>}
        </label>
      )}
      <textarea
        className="bg-gray-50 border outline-none resize-none border-gray-300 text-gray-900 text-sm rounded block w-full p-2.5"
        autoComplete="off"
        id={name}
        {...register(name)}
        {...rest}
      ></textarea>
      {isError && errors?.message && (
        <span className="mt-2 block text-sm text-red-600 dark:text-red-500">{errors.message}</span>
      )}
    </div>
  )
}

export default TextArea
