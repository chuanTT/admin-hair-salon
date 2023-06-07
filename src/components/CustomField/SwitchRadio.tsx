import { FC, useRef, useState } from "react";

interface SwitchRadioProps {
    isCheck?: boolean
    classChecked?: string
    w?: number
    h?: number
    ClickRadio?: (checked?: boolean) => void
    title?: string
}

const SwitchRadio: FC<SwitchRadioProps> = ({ isCheck, classChecked = "#00868f", w = 36, h = 18, ClickRadio, title }) => {
    const [checked, setChecked] = useState(isCheck ?? false);
    const radioElement = useRef<HTMLDivElement>(null);
    const sizeThumb = h / 2 + 4;

    return (
        <div className="flex items-center">
            {title && (
                <span
                    aria-hidden="true"
                    style={{ fontSize: 14, lineHeight: "20px" }}
                    className="block text-base mr-3 align-middle cursor-pointer font-normal select-none"
                    onClick={() => {
                        setChecked(!checked);
                        ClickRadio && ClickRadio(!checked);
                    }}
                >
                    {title}
                </span>
            )}

            <div
                aria-hidden="true"
                style={{
                    width: w,
                    height: h,
                    backgroundColor: `${checked ? classChecked : "#b3bacc"}`,
                    transitionDelay: "200ms",
                }}
                data-checked={checked}
                className={`flex-shrink-0 rounded-3xl cursor-pointer relative transition-all`}
                ref={radioElement}
                onClick={() => {
                    setChecked(!checked);
                    ClickRadio && ClickRadio(!checked);
                }}
            >
                <div
                    style={{
                        height: sizeThumb,
                        width: sizeThumb,
                        left: checked ? w - sizeThumb - 2 : 2,
                    }}
                    className={`bg-slate-100 absolute w-[14px] rounded-full top-1/2 duration-500 transition-all ${checked ? "left-[calc(2.25rem_-_14px-_2px)]" : "left-[2px]"
                        } -translate-y-1/2`}
                ></div>
            </div>
        </div>
    );
};

export default SwitchRadio;
