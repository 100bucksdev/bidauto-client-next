import { useSupportChatContext } from '@/hooks/SupportChat.hooks'
import { gptStore } from '@/store/gpt.store'
import { GPTMessage } from '@/types/GPTMessage.interface'
import { useEffect, useRef, useState } from 'react'
import Draggable from 'react-draggable'
import ChatGPTWidgetChat from './ChatGPTWidgetChat'
import ChatGPTWidgetPimple from './ChatGPTWidgetPimple'

const ChatGPTWidget = () => {
	const { isGPTAllowed } = gptStore()
	const [operatorEndedChat, setOperatorEndedChat] = useState(false)

	const [messages, setMessages] = useState<GPTMessage[]>([])

	// Добавлен таймер отображения стартового сообщения

	const errors = {
		operator_already_called: 'Operator is already called',
		you_already_end_chat_with_operator: 'This chat ended, create new chat',
		wait_until_operator_accept_request:
			'Please wait until operator accept your request',
		wait_5_sec: 'Please wait 5 seconds',
		ask_ai_more: 'Please ask AI more to be able to call operator',
		auth_needed: 'Authentication needed',
		all_operators_busy_at_the_moment: 'All operators are busy at the moment',
	}

	const { lastMessage } = useSupportChatContext()

	useEffect(() => {
		setMessages(prev => {
			if (prev.length === 0) {
				return [
					{
						from: 'gpt',
						status: 'success',
						message: 'Hello, how can I help you?',
						type: 'message',
					},
				]
			}
			return prev
		})
	}, [lastMessage])

	useEffect(() => {
		if (lastMessage?.data) {
			const data = JSON.parse(lastMessage.data)

			if ('error' in data) {
				setMessages(prev => {
					if (
						prev.some(
							msg => msg.message === errors[data.error as keyof typeof errors]
						)
					) {
						return prev
					}
					return [
						{
							from: 'operator',
							status: 'error',
							message: errors[data.error as keyof typeof errors] || data.error,
							type: data.type,
						},
						...prev,
					]
				})
			}

			if ('chat_code' in data) {
				localStorage.setItem('support_chat_id', data.chat_code)
			}

			if (data.type === 'message') {
				if ('info' in data && data.info === 'ended') {
					setOperatorEndedChat(true)
				}

				setMessages(prev => {
					const withoutPending = prev.filter(msg => msg.status !== 'pending')
					if (
						withoutPending.some(
							msg =>
								msg.message === data.message &&
								msg.from === (data.role === 'ai' ? 'gpt' : 'operator') &&
								msg.type === data.type
						)
					) {
						return withoutPending
					}
					return [
						{
							from: data.role === 'ai' ? 'gpt' : 'operator',
							status: 'success',
							message: data.message,
							type: data.type,
						},
						...withoutPending,
					]
				})
			} else if (data.type === 'info') {
				setMessages(prev => {
					if (prev.some(msg => msg.message === data.message)) return prev
					return [
						{
							from: data.role === 'ai' ? 'gpt' : 'operator',
							status: 'success',
							message: data.message,
							type: 'info',
							info: data.info,
							lot_id: data.lot_id,
							auction: data.auction,
						},
						...prev,
					]
				})
			}
		}
	}, [lastMessage])

	const widgetRef = useRef(null)
	const [isChatOpen, setIsChatOpen] = useState<boolean>(false)
	const [isDragging, setIsDragging] = useState(false)
	const [isNewNotification, setIsNewNotification] = useState(true)
	const [isQuestionMessage, setIsQuestionMessage] = useState(true)

	const [isNotificationAllowed, setIsNotificationAllowed] = useState(
		localStorage.getItem('isChatGPTNotificationAllowed')
			? JSON.parse(
					localStorage.getItem('isChatGPTNotificationAllowed') as string
			  )
			: true
	)

	useEffect(() => {
		if (isNotificationAllowed) {
			localStorage.setItem('isChatGPTNotificationAllowed', JSON.stringify(true))
		} else {
			localStorage.setItem(
				'isChatGPTNotificationAllowed',
				JSON.stringify(false)
			)
		}
	}, [isNotificationAllowed])

	const [state, setState] = useState<any>({
		activeDrags: 0,
		deltaPosition: {
			x: 0,
			y: 0,
		},
		controlledPosition: {
			x: -400,
			y: 200,
		},
	})

	const handleDrag = () => {
		setIsDragging(true)
	}

	function onStart() {
		setState({ activeDrags: ++state.activeDrags })
	}

	function onStop() {
		setTimeout(() => {
			setIsDragging(false)
		}, 0)
		setState({ activeDrags: --state.activeDrags })
	}

	const handlers = { onStart, onStop }

	return (
		<>
			{isGPTAllowed ? (
				<Draggable handle='strong' onDrag={handleDrag} {...handlers}>
					<div
						ref={widgetRef}
						className='box no-cursor fixed bottom-10 right-10 z-[99999]'
					>
						{!isChatOpen && isQuestionMessage ? (
							<div className='absolute -top-8 right-14 w-56 bg-t-blue-light text-white p-2 rounded-lg rounded-br-none max-sm:hidden'>
								Have a question? Write to us!
							</div>
						) : null}
						<ChatGPTWidgetPimple
							setIsChatOpen={setIsChatOpen}
							setIsQuestionMessage={setIsQuestionMessage}
							isDragging={isDragging}
							isChatOpen={isChatOpen}
							isNewNotification={isNewNotification}
						/>
						{isChatOpen && (
							<ChatGPTWidgetChat
								messages={messages}
								setMessages={setMessages}
								setIsNewNotification={setIsNewNotification}
								setIsNotificationAllowed={setIsNotificationAllowed}
								widgetRef={widgetRef}
								isNotificationAllowed={isNotificationAllowed}
								isNewNotification={isNewNotification}
								operatorEndedChat={operatorEndedChat}
							/>
						)}
					</div>
				</Draggable>
			) : null}
		</>
	)
}

export default ChatGPTWidget
