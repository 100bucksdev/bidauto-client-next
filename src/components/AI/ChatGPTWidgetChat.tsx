import { GPTMessage } from '@/types/GPTMessage.interface'
import { Dispatch, RefObject, SetStateAction, useEffect } from 'react'
import ChatGPTWidgetDialog from './ChatGPTWidgetDialog'
import ChatGPTWidgetForm from './ChatGPTWidgetForm'
import ChatGPTWidgetHeader from './ChatGPTWidgetHeader'

const ChatGPTWidgetChat = ({
	operatorEndedChat,
	setIsNotificationAllowed,
	setIsNewNotification,
	isNotificationAllowed,
	widgetRef,
	messages,
	setMessages,
	isNewNotification,
}: {
	operatorEndedChat: boolean
	widgetRef: RefObject<HTMLDivElement>
	setIsNotificationAllowed: Dispatch<SetStateAction<boolean>>
	isNotificationAllowed: boolean
	isNewNotification: boolean
	setIsNewNotification: Dispatch<SetStateAction<boolean>>
	messages: GPTMessage[]
	setMessages: Dispatch<SetStateAction<GPTMessage[]>>
}) => {
	useEffect(() => {
		setIsNewNotification(false)
	}, [isNewNotification])

	return (
		<>
			<div className='absolute shadow-lg z-[9999] bottom-[70px] max-md:w-[300px] max-md:h-[400px] right-0 w-[400px] h-[500px] bg-white !border-[1px] !border-slate-300 !rounded-xl text-black cursor-default'>
				<div className='relative h-full'>
					<strong>
						<ChatGPTWidgetHeader
							isNotificationAllowed={isNotificationAllowed}
							setIsNotificationAllowed={setIsNotificationAllowed}
							widgetRef={widgetRef}
							setMessages={setMessages}
						/>
					</strong>
					<>
						<ChatGPTWidgetDialog
							setMessages={setMessages}
							messages={messages}
							operatorEndedChat={operatorEndedChat}
						/>
					</>
					<>
						<ChatGPTWidgetForm
							messages={messages}
							setIsNewNotification={setIsNewNotification}
							setMessages={setMessages}
							operatorEndedChat={operatorEndedChat}
						/>
					</>
				</div>
			</div>
		</>
	)
}

export default ChatGPTWidgetChat
