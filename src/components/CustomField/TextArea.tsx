import { ComponentClass, FC, InputHTMLAttributes } from "react";
import { FieldError, FieldValues, UseFormRegister } from "react-hook-form";

interface TextAreaProps extends InputHTMLAttributes<HTMLElement> {
  title?: string;
  name: string;
  register: UseFormRegister<FieldValues>;
  isError?: boolean;
  errors?: FieldError | undefined;
  classAreaContainer?: ComponentClass;
}

const TextArea: FC<TextAreaProps> = ({
  title,
  name,
  register,
  isError,
  errors,
  classAreaContainer,
  ...rest
}) => {
  return (
    <div className={`${classAreaContainer ?? ""}`}>
      {title && (
        <label
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          htmlFor={name}
        >
          {title}
        </label>
      )}
      <textarea
        className="bg-gray-50 border outline-none resize-none border-gray-300 text-gray-900 text-sm rounded block w-full p-2.5"
        autoComplete="off"
        id={name}
        {...register(name)}
        type="text"
        {...rest}
      ></textarea>
      {isError && errors?.message && (
        <span className="mt-2 block text-sm text-red-600 dark:text-red-500">
          {errors.message}
        </span>
      )}
    </div>
  );
};

export default TextArea;
