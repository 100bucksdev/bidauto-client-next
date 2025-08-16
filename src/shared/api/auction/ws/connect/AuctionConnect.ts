import { TAuctionSocet } from '@/types/Auction.interface'
import React, { useCallback, useState } from 'react'

export function useAuctionConnect(id: number) {
	const isLogin = localStorage.getItem('access_token')

	// Стабилизируем URL
	const socketUrl = React.useMemo(() => {
		if (!id) return null
		const tokenHash = isLogin ? localStorage.getItem('access_token') || '' : ''
		return `${process.env.VITE_REACT_APP_WEBSOCKET_URL}/v1/ws/auction/${id}/?token=${tokenHash}`
	}, [isLogin, id])

	const [socket, setSocket] = useState<WebSocket | null>(null) // WebSocket вместо Socket
	const [messages, setMessages] = useState<TAuctionSocet[]>([]) // Массив для хранения сообщений
	const [isConnected, setIsConnected] = useState(false)

	// Функция для подключения к WebSocket
	const connectSocket = useCallback(() => {
		if (socketUrl && !socket) {
			const newSocket = new WebSocket(socketUrl)

			// Слушаем событие открытия соединения
			newSocket.onopen = () => {
				setIsConnected(true)
				console.log('WebSocket connected')
			}

			// Слушаем событие закрытия соединения
			newSocket.onclose = event => {
				setIsConnected(false)
				console.log('WebSocket disconnected', event)
			}

			// Слушаем события ошибок
			newSocket.onerror = error => {
				console.error('WebSocket error:', error)
			}

			// Слушаем получение сообщений
			newSocket.onmessage = event => {
				const message = JSON.parse(event.data) // Парсим JSON, если сообщение в таком формате
				setMessages(prevMessages => [...prevMessages, message])
			}

			setSocket(newSocket) // Сохраняем сокет в состоянии
		}
	}, [socketUrl, socket])

	// Возвращаем данные для использования
	return {
		connectSocket,
		messages,
		isConnected,
	}
}
