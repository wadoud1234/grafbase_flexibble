import Image from "next/image"
import { MouseEventHandler } from "react"

type ButtonProps = {
    title: string,
    type?: "button" | "submit" | "reset" | undefined,
    leftIcon?: string | undefined,
    rightIcon?: string | undefined,
    handleClick?: MouseEventHandler,
    isSubmitting?: boolean,
    bgColor?: string,
    textColor?: string
}
const Button = ({
    title,
    type,
    leftIcon,
    rightIcon,
    handleClick,
    bgColor,
    textColor,
    isSubmitting
}: ButtonProps) => {
    return (
        <button
            type={type || "button"}
            disabled={isSubmitting}
            onClick={handleClick}
            className={`flexCenter gap-3 px-3 py-4
            ${textColor || "text-white"} 
            ${isSubmitting ? "bg-black/50" : bgColor || "bg-primary-purple"}
            w-full rounded-xl text-sm font-medium max-md:w-full`}
        >
            {leftIcon && (
                <Image
                    src={leftIcon}
                    alt="left"
                    height={14}
                    width={14}
                />
            )}
            {title}
            {rightIcon && (
                <Image
                    src={rightIcon}
                    alt="left"
                    height={14}
                    width={14}
                />
            )}
        </button>
    )
}
export default Button