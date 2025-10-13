import CircleLoader from '@/shared/ui/CircleLoader'
import { GPTMessage } from '@/types/GPTMessage.interface'
import { usePathname, useSearchParams } from 'next/navigation'
import {
	ChangeEvent,
	Dispatch,
	SetStateAction,
	useEffect,
	useState,
} from 'react'
import { IoSend } from 'react-icons/io5'
import { useSupportChatContext } from './hook/useSupportChat'

const ChatGPTWidgetForm = ({
	messages,
	setMessages,
	operatorEndedChat,
}: {
	messages: GPTMessage[]
	setMessages: Dispatch<SetStateAction<GPTMessage[]>>
	setIsNewNotification: Dispatch<SetStateAction<boolean>>
	operatorEndedChat: boolean
}) => {
	const { sendMessage } = useSupportChatContext()
	const pathnameBase = usePathname()
	const params = useSearchParams()
	const [input, setInput] = useState('')
	const [isInputDisabled, setIsInputDisabled] = useState(false)
	const [countdown, setCountdown] = useState<number | null>(null)

	function onChange(e: ChangeEvent<HTMLInputElement>) {
		setInput(e.target.value)
	}

	const sendMessageToServer = (message: string) => {
		setIsInputDisabled(true)
		setCountdown(5)

		const pathname = pathnameBase + params

		// Start countdown
		const countdownInterval = setInterval(() => {
			setCountdown(prev => {
				if (prev === null || prev <= 1) {
					clearInterval(countdownInterval)
					return null
				}
				return prev - 1
			})
		}, 1000)

		setMessages(prev => [
			{ from: 'user', status: 'success', message: message, type: 'message' },
			...prev,
		])

		const withoutUserMessages = [...messages].filter(msg => msg.from !== 'user')

		if (withoutUserMessages[0].from === 'gpt') {
			setMessages(prev => [
				{ from: 'gpt', status: 'pending', message: '', type: 'message' },
				...prev,
			])
		}

		sendMessage('send_message', {
			message: message,
			user_route: pathname,
		})

		// Enable input after 5 seconds
		setTimeout(() => {
			setIsInputDisabled(false)
			setCountdown(null)
		}, 5000)
	}

	useEffect(() => {
		const hasInfoMessageOperatorCalled = messages.some(
			msg => msg.type === 'info' && msg.info === 'operator_called'
		)
		const hasInfoMessageOperatorAccepted = messages.some(
			msg => msg.type === 'info' && msg.info === 'accepted'
		)
		if (hasInfoMessageOperatorCalled) {
			setIsInputDisabled(true)
		}
		if (hasInfoMessageOperatorAccepted) {
			setIsInputDisabled(false)
		}
	}, [messages])

	return (
		<div className='absolute bottom-0 w-full rounded-b-xl overflow-hidden'>
			<form
				onSubmit={async e => {
					e.preventDefault()
					if (!input || isInputDisabled) return
					sendMessageToServer(input)
					setInput('')
				}}
				className='flex items-center border-t border-[#e5e7eb] border-solid'
			>
				<input
					type='text'
					className='w-full outline-none py-2 px-2'
					placeholder={
						countdown ? `Wait ${countdown} seconds...` : 'Enter your question'
					}
					onChange={onChange}
					value={input}
					disabled={
						!messages.length ||
						messages[messages.length - 1].status === 'pending' ||
						isInputDisabled
					}
				/>
				<button
					type='submit'
					className='text-t-blue-light mx-2 hover:bg-gray-300 duration-100 active:bg-gray-200 p-2 rounded-full flex justify-center items-center'
					disabled={
						!messages.length ||
						messages[messages.length - 1].status === 'pending' ||
						isInputDisabled ||
						operatorEndedChat
					}
				>
					{messages[messages.length - 1]?.status === 'pending' ? (
						<div>
							<CircleLoader />
						</div>
					) : (
						<div className='translate-x-[1px]'>
							<IoSend />
						</div>
					)}
				</button>
			</form>
		</div>
	)
}

export default ChatGPTWidgetForm
