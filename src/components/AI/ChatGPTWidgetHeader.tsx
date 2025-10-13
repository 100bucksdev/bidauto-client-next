import { GPTMessage } from '@/types/GPTMessage.interface'
import TAutoAILogo from '@images/T-AutoAILogo.svg'
import { Dispatch, RefObject, SetStateAction } from 'react'
import ChatGPTWidgetMore from './ChatGPTWidgetMore'

const ChatGPTWidgetHeader = ({
	widgetRef,
	setIsNotificationAllowed,
	isNotificationAllowed,
	setMessages,
}: {
	widgetRef: RefObject<HTMLDivElement>
	setIsNotificationAllowed: Dispatch<SetStateAction<boolean>>
	isNotificationAllowed: boolean
	setMessages: Dispatch<SetStateAction<GPTMessage[]>>
}) => {
	return (
		<header className='bg-t-blue-light font-normal !block !h-auto !relative text-t-text-primary rounded-t-xl pl-3 pr-4 py-3'>
			<div className='flex justify-between items-center'>
				<div className='flex items-center space-x-3'>
					<img
						src={TAutoAILogo}
						alt='T-AutoAILogo'
						className='rounded-full !w-[45px] !h-[45px]'
						draggable={false}
					/>
					{/* <span>AI Customer Support</span> */}
					<span>T-auto AI</span>
				</div>
				<ChatGPTWidgetMore
					isNotificationAllowed={isNotificationAllowed}
					setIsNotificationAllowed={setIsNotificationAllowed}
					widgetRef={widgetRef}
					setMessages={setMessages}
				/>
			</div>
		</header>
	)
}

export default ChatGPTWidgetHeader
