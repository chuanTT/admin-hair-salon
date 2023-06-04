import { convertNumber, numberMoneyVND } from "@/common/functions";
import {
  ForwardRefRenderFunction,
  HTMLAttributes,
  InputHTMLAttributes,
  forwardRef,
  useImperativeHandle,
  useState,
} from "react";
import {
  UseFormRegister,
  FieldValues,
} from "react-hook-form";

interface InputPriceProps extends InputHTMLAttributes<HTMLElement> {
  name: string;
  register: UseFormRegister<FieldValues>;
  classInput?: HTMLAttributes<HTMLDivElement>["className"];
  classCustomInput?: HTMLAttributes<HTMLDivElement>["className"];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  errors?: any;
  // setValue?: UseFormSetValue<FieldValues>;
  isFormatPrice?: boolean;
  onChangePrice?: (value: string | number) => void;
  title?: string;
  isRequire?: boolean;
}

export interface RefType {
  clearValue?: () => void;
  setValue?: (value: string | number) => void;
}

const InputPrice: ForwardRefRenderFunction<RefType, InputPriceProps> = (
  prop,
  ref
) => {
  const {
    register,
    name,
    classInput,
    classCustomInput,
    errors,
    // setValue,
    isFormatPrice,
    onChangePrice,
    title,
    isRequire,
    ...rest
  } = prop;

  const [valueInput, setValueInput] = useState("");

  useImperativeHandle(ref, () => {
    return {
      clearValue: () => {
        setValueInput("");
      },
      setValue: (value: string | number) => {
        let v = value;

        if (typeof v === "number") {
          v = !isFormatPrice ? numberMoneyVND(Number(v || 0)) : v;
        }
        setValueInput(v.toString());
      },
    };
  });

  return (
    <div className={`${classInput ?? ""}`}>
      {title && (
        <label
          className="block mb-2 text-sm font-medium text-gray-900 "
          htmlFor={name}
        >
          {title} {isRequire && <span className="text-red-500">*</span>}
        </label>
      )}

      <input
        {...rest}
        {...register(name)}
        autoComplete="off"
        className={`bg-gray-50 border outline-none border-gray-300 text-gray-900 text-sm rounded block w-full p-2.5 ${classCustomInput}`}
        value={valueInput}
        inputMode="decimal"
        onKeyDown={(e) => {
          const { check } = convertNumber(e.key);
          const arrWhich = ["Backspace", "ArrowLeft", "ArrowRight"];
          if (!check) {
            if (
              arrWhich.includes(e.key) ||
              (e.ctrlKey && (e.keyCode === 65 || e.keyCode === 86))
            ) {
              return;
            }
            e.preventDefault();
          }
        }}
        onChange={(e) => {
          const { value } = convertNumber(e.target.value);
          typeof onChangePrice === "function" && onChangePrice(value);
          const formattedValue = !isFormatPrice ? numberMoneyVND(value) : value;

          setValueInput(formattedValue === '0' ? "" : formattedValue.toString());
        }}
        onPaste={(event) => {
          const { check } = convertNumber(event.clipboardData.getData("Text"));
          if (!check) event.preventDefault();
        }}
        onFocus={(event) => {
          const { check } = convertNumber(event.target.value);
          if (!check) {
            setValueInput("");
          }
        }}
      />

      {errors?.[name]?.message && (
        <span className="text-sm text-red-600 block mt-2">
          {errors?.[name]?.message}
        </span>
      )}
    </div>
  );
};

const InputPriceField = forwardRef(InputPrice);

export default InputPriceField;
