"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { DOMAttributes, MouseEventHandler, ReactNode, useCallback, useRef } from "react";

type ModalProps = {
    children: ReactNode
}

const Modal = ({ children }: ModalProps) => {
    const router = useRouter()
    const overlay = useRef<HTMLDivElement>(null)
    const wrapper = useRef<HTMLDivElement>(null)


    const onDismiss = useCallback(() => {
        router.push("/")
    }, [router])

    const handleClick = useCallback((e: any) => {
        if ((e.target === overlay.current) && onDismiss) {
            onDismiss()
        }
    }, [onDismiss, overlay]);




    return (
        <div ref={overlay} className="modal" onClick={handleClick}>
            <button
                type="button"
                onClick={onDismiss}
                className="absolute top-4 right-8"
            >
                <Image
                    src="/close.svg"
                    alt="close"
                    width={17}
                    height={17}
                />
            </button>
            <div ref={wrapper} className="modal_wrapper overflow-y-auto">
                {children}
            </div>
        </div>
    )
}
export default Modal