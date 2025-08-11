import { IModalProps } from '@/shared/ui/Modal'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect } from 'react'
import { RxCross1 } from 'react-icons/rx'

const View360Modal = ({
	isVisible,
	setIsVisible,
	src,
}: IModalProps & { src: string }) => {
	useEffect(() => {
		const handleBodyOverflow = () => {
			if (isVisible) {
				document.body.style.overflow = 'hidden'
				if (window.innerWidth > 768) {
					document.body.style.paddingRight = '8px'
				}
			} else {
				document.body.style.overflow = 'auto'
				document.body.style.paddingRight = '0'
			}
		}

		handleBodyOverflow()

		return () => {
			document.body.style.overflow = 'auto'
			document.body.style.paddingRight = '0'
		}
	}, [isVisible])

	return (
		<AnimatePresence>
			{isVisible && (
				<motion.div
					className='fixed top-0 left-0 z-[999] w-full h-full bg-black bg-opacity-35 flex justify-center items-center'
					initial={{ opacity: 0 }}
					onClick={() => setIsVisible(false)}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
				>
					<div
						onClick={e => e.stopPropagation()}
						className='flex flex-col w-full h-full justify-center'
					>
						<iframe className='h-[800px] max-lg:h-[500px]' src={src}></iframe>
					</div>
					<button
						onClick={() => setIsVisible(false)}
						className='absolute top-0 right-0 text-4xl z-20 text-white bg-zinc-700 p-4 rounded-bl-lg'
					>
						<RxCross1 />
					</button>
				</motion.div>
			)}
		</AnimatePresence>
	)
}

export default View360Modal
