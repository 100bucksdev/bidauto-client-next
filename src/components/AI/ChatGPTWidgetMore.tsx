;('')

import { MMenuPopUpFromBottom } from '@/assets/animation/PopUp.animation'
import { useClickAway } from '@/shared/hooks/useClickAway'
import { GPTMessage } from '@/types/GPTMessage.interface'
import { AnimatePresence, motion } from 'framer-motion'
import { Dispatch, RefObject, SetStateAction, useRef, useState } from 'react'
import { IoIosMore } from 'react-icons/io'
import { IoChatbubbleEllipsesOutline } from 'react-icons/io5'
import {
	MdOutlineNotificationsNone,
	MdOutlineNotificationsOff,
} from 'react-icons/md'
import { useSupportChatContext } from './hook/useSupportChat'

interface ChatGPTWidgetMoreProps {
	widgetRef: RefObject<HTMLDivElement>
	setIsNotificationAllowed: Dispatch<SetStateAction<boolean>>
	isNotificationAllowed: boolean
	setMessages: Dispatch<SetStateAction<GPTMessage[]>>
}

const ChatGPTWidgetMore = ({
	widgetRef,
	setIsNotificationAllowed,
	isNotificationAllowed,
	setMessages,
}: ChatGPTWidgetMoreProps) => {
	const { sendMessage } = useSupportChatContext()
	const [isOpen, setIsOpen] = useState(false)

	const menuRef = useRef<HTMLDivElement>(null)
	const buttonRef = useRef<HTMLButtonElement>(null)

	// Закрытие по клику вне
	useClickAway({
		func: () => setIsOpen(false),
		refs: [buttonRef, menuRef],
		container: widgetRef,
	})

	// Новый чат
	const handleNewChat = async () => {
		setMessages([
			{
				from: 'gpt',
				status: 'success',
				message: 'Hello, how can I help you?',
				type: 'message',
			},
		])

		localStorage.removeItem('support_chat_id')
		sendMessage('end_chat')
		setIsOpen(false)
	}

	// Уведомления
	const handleNotificationToggle = () => {
		setIsNotificationAllowed(prev => !prev)
		setIsOpen(false)
	}

	// Тогглер меню
	const toggleMenu = () => setIsOpen(prev => !prev)

	return (
		<div className='relative z-[10000]'>
			<button
				ref={buttonRef}
				onClick={toggleMenu}
				onTouchEnd={toggleMenu}
				className='p-2 text-xl rounded-full text-t-text-primary hover:bg-gray-200 hover:bg-opacity-40 active:bg-opacity-60 transition-colors'
				aria-label='More options'
			>
				<IoIosMore />
			</button>

			<AnimatePresence>
				{isOpen && (
					<motion.div
						ref={menuRef}
						initial='from'
						animate='to'
						exit='from'
						variants={MMenuPopUpFromBottom}
						transition={{ duration: 0.1, type: 'spring', stiffness: 200 }}
						className='absolute top-14 right-0 w-48 bg-t-blue-light border border-gray-300 rounded-md shadow-lg overflow-hidden'
					>
						<button
							onClick={handleNewChat}
							onTouchEnd={handleNewChat}
							className='flex w-full items-center justify-between p-2 text-t-text-primary hover:bg-t-blue-black transition-colors'
						>
							<span>New chat</span>
							<IoChatbubbleEllipsesOutline className='text-lg' />
						</button>

						<hr className='border-t border-gray-400' />

						<button
							onClick={handleNotificationToggle}
							onTouchEnd={handleNotificationToggle}
							className='flex w-full items-center justify-between p-2 text-t-text-primary hover:bg-t-blue-black transition-colors'
						>
							<span>Notifications</span>
							{isNotificationAllowed ? (
								<MdOutlineNotificationsNone className='text-lg' />
							) : (
								<MdOutlineNotificationsOff className='text-lg' />
							)}
						</button>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	)
}

export default ChatGPTWidgetMore
