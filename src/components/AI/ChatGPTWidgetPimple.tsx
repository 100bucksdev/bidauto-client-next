import TAutoAILogo from '@images/T-AutoAILogo.svg'
import Image from 'next/image'
import { Dispatch, SetStateAction } from 'react'
import { RxCross2 } from 'react-icons/rx'

const ChatGPTWidgetPimple = ({
	isNewNotification,
	isChatOpen,
	setIsChatOpen,
	setIsQuestionMessage,
	isDragging,
}: {
	isNewNotification: boolean
	isChatOpen: boolean
	setIsChatOpen: Dispatch<SetStateAction<boolean>>
	setIsQuestionMessage: Dispatch<SetStateAction<boolean>>
	isDragging: boolean
}) => {
	const toggleChat = () => {
		if (!isDragging) {
			setIsChatOpen(prev => !prev)
			setIsQuestionMessage(false)
		}
	}

	return (
		<strong
			onTouchEnd={toggleChat}
			onClick={toggleChat}
			className='cursor relative flex select-none w-[60px] h-[60px] bg-t-blue-light text-white rounded-full justify-center items-center cursor-pointer hover:bg-t-blue-light/85 duration-100 active:bg-t-blue-light'
		>
			{isNewNotification && (
				<div className='w-4 h-4 bg-orange-400 absolute right-0 top-0 rounded-full' />
			)}
			{isChatOpen ? (
				<div className='text-3xl'>
					<RxCross2 />
				</div>
			) : (
				<Image
					draggable={false}
					src={TAutoAILogo}
					width={68}
					height={68}
					className='rounded-full'
					alt='T-AutoAILogo'
				/>
			)}
		</strong>
	)
}

export default ChatGPTWidgetPimple
