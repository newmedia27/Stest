import React, { useState, useCallback, useMemo } from "react"
import ModalContent from "./Modal"
import { ModalContext, ModalHook } from "./context"

const Modal = ({ isOpen, children, onClose, submit, className }) => {
	const [disabled, setDisabled] = useState(false)
	const [closingAnimate, setClosingAnimate] = useState(false)

	const close = useCallback(() => {
		setClosingAnimate(true)
		setTimeout(() => {
			setClosingAnimate(false)
			if (onClose) {
				onClose()
			}
		}, 600) // must less  than the transition time in css 0.5s
	}, [onClose, disabled, setClosingAnimate])

	const value = useMemo(
		() => ({
			disabled,
			close,
			isOpen,
		}),
		[disabled, close, isOpen]
	)
	return (
		<ModalContext.Provider value={value}>
			<ModalContent
				closingAnimate={closingAnimate}
				submit={submit}
				className={className}
			>
				{children}
			</ModalContent>
		</ModalContext.Provider>
	)
}

export const useModal = () => ModalHook()

export default Modal
