import { useUser } from '@/store/user.store'
import { useInfiniteQuery } from '@tanstack/react-query'
import axios from 'axios'
import React, { createContext, useCallback, useContext } from 'react'
import useWebSocket from 'react-use-websocket'

export function useSupportChat() {
	const { isLogin } = useUser()
	// Мемоизируем URL
	const socketUrl = React.useMemo(() => {
		const chatId = localStorage.getItem('support_chat_id') || ''
		return `${
			import.meta.env.VITE_REACT_APP_WEBSOCKET_URL
		}/v1/ws/chat/?h=${chatId}`
	}, [isLogin])

	// Мемоизируем опции WebSocket
	const options = React.useMemo(
		() => ({
			shouldReconnect: () => true,
			reconnectAttempts: 10,
			reconnectInterval: 1000,
			retryOnError: true,
			onOpen: () => {
				console.log('WebSocket opened')
				sendMessageToServer(
					JSON.stringify({
						action: 'connect',
						token: localStorage.getItem('access'),
						chat_code: localStorage.getItem('support_chat_id'),
					})
				)
			},
			onClose: () => {
				console.log('WebSocket closed')
			},
			onError: () => {
				console.log('WebSocket error')
			},
		}),
		[]
	) // Пустой массив зависимостей, так как все значения статичны

	const {
		sendMessage: sendMessageToServer,
		lastMessage: lastMessageFromServer,
	} = useWebSocket(socketUrl, options)

	const sendMessage = useCallback(
		(action: string, body?: any) => {
			sendMessageToServer(
				JSON.stringify({
					action: action,
					...body,
				})
			)
		},
		[sendMessageToServer]
	)

	return { sendMessage, lastMessage: lastMessageFromServer }
}

interface SupportChatContextType {
	sendMessage: (action: string, body?: any) => void
	lastMessage: any
}

const SupportChatContext = createContext<SupportChatContextType | null>(null)

export function SupportChatProvider({
	children,
}: {
	children: React.ReactNode
}) {
	const supportChat = useSupportChat()

	return (
		<SupportChatContext.Provider value={supportChat}>
			{children}
		</SupportChatContext.Provider>
	)
}

export function useSupportChatContext() {
	const context = useContext(SupportChatContext)
	if (!context) {
		throw new Error(
			'useSupportChatContext must be used within a SupportChatProvider'
		)
	}
	return context
}

export function useGetSupportChatHistory() {
	return useInfiniteQuery({
		queryKey: ['support_chat_history'],
		queryFn: ({ pageParam = 1 }) =>
			axios.get(
				`${
					import.meta.env.VITE_REACT_APP_API_URL
				}/api/v1/chatbot/chat/history/${localStorage.getItem(
					'support_chat_id'
				)}/`,
				{
					params: {
						page: pageParam,
					},
				}
			),
		getNextPageParam: lastPage => {
			const { page, pages } = lastPage.data.pagination
			if (!pages && pages === 0) return false
			return page >= pages ? false : page + 1
		},
	})
}
