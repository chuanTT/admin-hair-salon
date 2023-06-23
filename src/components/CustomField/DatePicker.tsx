import {
    forwardRef,
    useImperativeHandle,
    useRef,
    useState,
    useEffect,
    ForwardRefRenderFunction,
} from 'react';
import { FieldValues, UseFormSetValue } from 'react-hook-form';
import DatePicker, { ReactDatePickerProps } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface InputPriceProps {
    name: string;
    classDate?: string;
    setValue?: UseFormSetValue<FieldValues>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onChange?: (date: any) => void;
    isRange?: boolean;
    placeholder?: string;
    title?: string;
    isRequire?: boolean;
    rest?: ReactDatePickerProps;
    isInit?: boolean;
}

export interface RefType {
    clearValue?: () => void;
    setValue?: (value: string | number) => void;
}
const DatePickerCustom: ForwardRefRenderFunction<RefType, InputPriceProps> = (
    {
        name,
        setValue,
        onChange,
        isRange = false,
        placeholder = 'dd/mm/yyyy',
        classDate = '',
        title,
        isRequire,
        isInit,
        rest,
    },
    ref,
) => {
    const [startDate, setStartDate] = useState(() => {
        let date = null;
        if (isInit) {
            date = new Date();
        }
        return isRange ? [date, date] : date;
    });
    const [updated, setUpdated] = useState({ update: false, data: null });

    useEffect(() => {
        if (updated?.update) {
            setStartDate(updated?.data);
            setUpdated({ update: !updated?.update, data: null });
        }
    }, [updated]);

    useEffect(() => {
        let date = null;
        if (isInit) {
            date = new Date();
        }
        setStartDate(isRange ? [date, date] : date);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isRange]);

    useImperativeHandle(
        ref,
        () => {
            return {
                clearValue: () => {
                    setStartDate(isRange ? [null, null] : null);
                },
                // setValue: (date: any, strFormat = 'YYYY-MM-DD HH:mm:ss') => {
                //     // let d;
                //     // if (isRange) {
                //     //     const range = [];
                //     //     const [s1, s2] = date;
                //     //     const { _d: strS1 } = moment(s1, strFormat);
                //     //     const { _d: strS2 } = moment(s2, strFormat);
                //     //     range.push(strS1);
                //     //     range.push(strS2);
                //     //     d = range;
                //     // } else {
                //     //     const { _d } = moment(date, strFormat);
                //     //     d = _d;
                //     // }
                //     // setValue && setValue(name, d);
                //     // setUpdated({ update: !updated?.update, data: d });
                // },
            };
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [isRange],
    );

    const options = useRef<ReactDatePickerProps>({
        ...rest,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onChange: (date: any) => {
            setStartDate(date);
            setValue && setValue(name, date);
            onChange && onChange(date);
        },
    });

    if (isRange) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { selected, ...rest } = options.current;
        const [s, e] = Array.isArray(startDate) ? startDate : [];

        options.current = {
            ...rest,
            startDate: s,
            endDate: e,
        };
    } else {
        options.current = {
            ...options.current,
            selected: Array.isArray(startDate) ? null : startDate,
        };
    }

    return (
        <div className="">
            {title && (
                <label className="block mb-2 text-sm font-medium text-gray-900 " htmlFor={name}>
                    {title} {isRequire && <span className="text-red-500">*</span>}
                </label>
            )}
            <div className={`relative ${classDate}`}>
                <DatePicker
                    isClearable
                    name={name}
                    autoComplete="off"
                    dateFormat="dd/MM/yyyy"
                    selectsRange={isRange}
                    {...options.current}
                    // showMonthYearPicker
                    placeholderText={placeholder}
                    className="pl-9 bg-gray-50 border outline-none border-gray-300 text-gray-900 text-sm rounded block w-full p-2.5"
                />

                <div className=" absolute inset-0 right-auto flex items-center pointer-events-none">
                    <svg className="w-4 h-4 fill-current text-slate-500 ml-3" viewBox="0 0 16 16">
                        <path d="M15 2h-2V0h-2v2H9V0H7v2H5V0H3v2H1a1 1 0 00-1 1v12a1 1 0 001 1h14a1 1 0 001-1V3a1 1 0 00-1-1zm-1 12H2V6h12v8z" />
                    </svg>
                </div>
            </div>
        </div>
    );
};

const DatePickerField = forwardRef(DatePickerCustom);

export default DatePickerField;
