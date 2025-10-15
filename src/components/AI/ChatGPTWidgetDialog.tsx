'use client'

import TAutoAILogo from '@/assets/images/T-AutoAILogo.svg'
import UserAvatar from '@/assets/images/default-user-avatar.svg'
import OperatorAvatar from '@/assets/images/operator-avatar.jpg'
import { GPTMessage } from '@/types/GPTMessage.interface'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Dispatch, Fragment, SetStateAction, useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import ReactMarkdown from 'react-markdown'
import GPTLoader from './GPTLoader/GPTLoader'
import {
	useGetSupportChatHistory,
	useSupportChatContext,
} from './hook/useSupportChat'

const ChatGPTWidgetDialog = ({
	messages,
	setMessages,
	operatorEndedChat,
}: {
	messages: GPTMessage[]
	setMessages: Dispatch<SetStateAction<GPTMessage[]>>
	operatorEndedChat: boolean
}) => {
	const { fetchNextPage, hasNextPage, data } = useGetSupportChatHistory()
	const [operatorCalled, setOperatorCalled] = useState(false)
	const { push: path } = useRouter()
	useEffect(() => {
		if (
			data &&
			Array.isArray((data as any).pages) &&
			(data as any).pages[0] &&
			(data as any).pages[0].data &&
			Array.isArray((data as any).pages[0].data.data) &&
			(data as any).pages[0].data.data.length
		) {
			const pages = (data as any).pages
			const formattedMessages = pages.flatMap((page: any) =>
				page.data.data.map((msg: any) => {
					const sender = (msg.sender || '').trim().toLowerCase()
					const from =
						sender === 'user'
							? 'user'
							: sender === 'operator'
							? 'operator'
							: 'gpt'

					return {
						from,
						status: 'success', // Гарантируем наличие статуса
						message: msg.text,
						type: 'message',
					}
				})
			)

			setMessages(prevMessages => {
				const existingSet = new Set(
					prevMessages.map(msg => `${msg.from}-${msg.message}-${msg.type}`)
				)
				const newUniqueMessages = formattedMessages.filter(
					(msg: GPTMessage) =>
						!existingSet.has(`${msg.from}-${msg.message}-${msg.type}`)
				)
				return [...prevMessages, ...newUniqueMessages]
			})
		}
	}, [data])

	const { sendMessage } = useSupportChatContext()

	async function handleNewChat() {
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
		setOperatorCalled(false)
	}

	useEffect(() => {
		const messagesWithoutUser = messages.filter(msg => msg.from !== 'user')
		setOperatorCalled(messagesWithoutUser[0]?.from === 'operator')
	}, [messages])

	const showCallOperatorButton = messages.length > 1 && !operatorCalled

	return (
		<>
			{operatorEndedChat && (
				<div className='sticky top-4 my-2 z-50 mx-5'>
					<button
						onClick={handleNewChat}
						className='bg-blue-700 relative z-20 flex justify-center items-center gap-x-2 w-full text-white rounded-full p-2'
					>
						<span>New chat</span>
					</button>
				</div>
			)}

			<div
				className={`${
					showCallOperatorButton
						? 'max-md:h-[60.5%] h-[80%]'
						: 'max-md:h-[74.5%] h-[80%]'
				} overflow-x-hidden scroll-smooth flex flex-col-reverse overflow-y-auto p-4`}
				id='chat-container-support'
			>
				<InfiniteScroll
					dataLength={messages.length}
					next={fetchNextPage}
					hasMore={hasNextPage || false}
					loader={null}
					scrollableTarget='chat-container-support'
					style={{
						display: 'flex',
						flexDirection: 'column-reverse',
					}}
					inverse
					scrollThreshold='300px'
					className='gap-y-5 flex flex-col-reverse'
				>
					{messages.map((message, index) => (
						<Fragment key={index}>
							{message.from !== 'user' ? (
								<div className='flex justify-start'>
									<div className='max-w-[220px] md:max-w-[270px] relative break-words flex items-start'>
										<Image
											src={
												message.from === 'operator'
													? OperatorAvatar
													: TAutoAILogo
											}
											alt={
												message.from === 'operator'
													? 'operatorAvatar'
													: 'T-AutoAILogo'
											}
											width={message.from === 'operator' ? 26 : 40}
											height={message.from === 'operator' ? 26 : 40}
											className='mr-2 rounded-full'
										/>
										<div>
											<div
												className={`${
													message.type === 'info'
														? 'bg-gray-500 text-black'
														: 'bg-t-blue-light text-white'
												} w-full relative p-2 rounded-md`}
											>
												{!message.status || message.status === 'success' ? (
													<span className='cursor-text'>
														<div className='flex flex-wrap break-words'>
															<ReactMarkdown>{message.message}</ReactMarkdown>
														</div>
													</span>
												) : message.status === 'error' ? (
													<span className='cursor-text text-t-text-error z-20'>
														{message.message}
													</span>
												) : (
													<div className='relative scale-50 py-3 px-5 flex justify-center'>
														<GPTLoader />
													</div>
												)}
											</div>
											{message.type === 'info' &&
												message.info === 'show_button_for_lot' && (
													<button
														onClick={() => {
															path(
																`/lot/${message.lot_id}?auction_name=${
																	message.auction === 'iaai'
																		? 'IAAI'
																		: message.auction === 'copart'
																		? 'COPART'
																		: ''
																}`
															)
														}}
														className='mt-2 w-full bg-t-blue-light text-white font-semibold px-3 py-1 rounded shadow hover:bg-t-blue-light/80'
													>
														Open Lot
													</button>
												)}
										</div>
									</div>
								</div>
							) : (
								<div className='flex justify-end relative'>
									<div className='max-w-[220px] md:max-w-[270px] break-words flex items-start'>
										<div className='bg-t-blue-black text-white p-2 break-words w-[86%] rounded-md'>
											<span className='cursor-text'>
												<ReactMarkdown>{message.message}</ReactMarkdown>
											</span>
										</div>
										<Image
											src={UserAvatar}
											alt='userAvatar'
											width={26}
											height={26}
											draggable={false}
											className='ml-2 rounded-full select-none'
										/>
									</div>
								</div>
							)}
						</Fragment>
					))}
				</InfiniteScroll>
			</div>
		</>
	)
}

export default ChatGPTWidgetDialog
