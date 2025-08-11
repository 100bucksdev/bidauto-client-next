import Modal, { IModalProps } from '@/shared/ui/Modal'
import { RxCross1 } from 'react-icons/rx'

const EngineStartVideoModal = ({
	isVisible,
	setIsVisible,
	src,
}: IModalProps & { src: string }) => {
	return (
		<Modal
			childrenCl='max-w-[800px]'
			isVisible={isVisible}
			centerChildren
			setIsVisible={setIsVisible}
		>
			<button
				onClick={() => setIsVisible(false)}
				className='absolute top-0 right-0 text-4xl z-20 text-white bg-zinc-700 p-4 rounded-lg'
			>
				<RxCross1 />
			</button>
			<video autoPlay controls className='w-full h-full rounded-lg'>
				<source src={src} type='video/mp4' />
			</video>
		</Modal>
	)
}

export default EngineStartVideoModal
