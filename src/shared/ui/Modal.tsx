'use client'

import { AnimatePresence } from 'framer-motion'
import { Dispatch, FC, ReactNode, SetStateAction, useEffect } from 'react'
import { IoMdWarning } from 'react-icons/io'

export interface IModalProps {
	children?: ReactNode
	isVisible: boolean
	setIsVisible: Dispatch<SetStateAction<boolean>>
	centerChildren?: boolean
	warningMessage?: string
	childrenCl?: string
}

const Modal: FC<IModalProps> = ({
	children,
	isVisible,
	setIsVisible,
	centerChildren = false,
	warningMessage,
	childrenCl,
}) => {
	useEffect(() => {
		const handleBodyOverflow = () => {
			if (isVisible) {
				document.body.style.overflow = 'hidden'
			} else {
				document.body.style.overflow = 'auto'
			}
		}

		handleBodyOverflow()

		return () => {
			document.body.style.overflow = 'auto'
		}
	}, [isVisible])

	return (
		<AnimatePresence mode='wait'>
			{isVisible ? (
				<>
					<div
						onClick={() => setIsVisible(false)}
						className='overflow-auto top-0 left-0 w-full h-full fixed bg-t-modal-bg z-[999] text-t-text-primary'
					>
						<div
							className={`${
								centerChildren
									? 'top-1/2 -translate-y-1/2 flex justify-center mx-auto'
									: ''
							} my-0 flex flex-col relative max-w-[600px] ${childrenCl}`}
							onClick={e => e.stopPropagation()}
						>
							{warningMessage && (
								<div className='bg-yellow-400 pb-5 -mb-2 text-black rounded-t-lg p-3 flex items-center gap-x-2'>
									<span className='text-xl'>
										<IoMdWarning />
									</span>
									<span>{warningMessage}</span>
								</div>
							)}
							{children}
						</div>
					</div>
				</>
			) : (
				''
			)}
		</AnimatePresence>
	)
}

export default Modal
