import { FC, ReactNode } from "react";
import Button, { ButtonProps } from "../Button";

interface ButtonLoadingProps extends ButtonProps {
    children: ReactNode
    isPending?: boolean
    isPrimary?: boolean
    classCustom?: string
}

const ButtonLoading: FC<ButtonLoadingProps> = ({ children, isPending, isPrimary, classCustom, ...rest }) => {
    return <Button
        isPending={isPending}
        customClass={`font-bold py-2 px-4 border !rounded ${isPrimary ? 'bg-indigo-600 hover:bg-indigo-500 text-white' : ' '} ${classCustom}`}
        {...rest}
    >
        {children}
    </Button>;
}

export default ButtonLoading;