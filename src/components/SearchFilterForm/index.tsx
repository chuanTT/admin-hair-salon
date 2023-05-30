import { Dispatch, FC, SetStateAction } from "react";
import { FaSearch } from "react-icons/fa";
import ButtonLoading from "../ButtonLoading";
import { InputField } from "../CustomField";

interface SearchFilterFormProps {
    name: string
    placeholder?: string
    searchValue?: {
        [key: string]: string | number | boolean
    }
    setSearchValue?: Dispatch<SetStateAction<{
        [key: string]: string | number | boolean;
    }>>
}

const SearchFilterForm: FC<SearchFilterFormProps> = ({ name, placeholder, setSearchValue, searchValue }) => {
    const valueInput = searchValue?.[name] ? typeof searchValue[name] === "boolean" ? "" : searchValue[name] : ""
    const valuesNew = !(typeof valueInput === "boolean") ? valueInput : ""
    return (<div className="flex items-center space-x-2">
        <InputField
            classInputContainer="flex-1 h-full [&>input]:rounded-sm [&>input]:h-full"
            placeholder={placeholder ?? "Tìm kiếm..."}
            name={name}
            value={valuesNew}
            onChange={(e) => {
                const elemet = e.target as HTMLInputElement
                if (elemet && setSearchValue) {
                    setSearchValue((prev) => ({ ...prev, [name]: elemet?.value?.toString()?.trim(), submit: false }))
                }
            }}
        />

        <ButtonLoading isPrimary classCustom="text-lg font-medium p-2 text-white h-full" onClick={() => {
            const vl = searchValue?.[name]?.toString()?.trim()
            if (vl && setSearchValue) {
                setSearchValue((prev) => ({ ...prev, [name]: vl, submit: true }))
            }
        }}>
            <FaSearch />
        </ButtonLoading>
    </div>);
}

export default SearchFilterForm;