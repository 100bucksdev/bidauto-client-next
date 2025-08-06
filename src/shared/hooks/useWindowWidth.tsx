import { useEffect, useState } from 'react'

export function useWindowWidth({ innerWidth }: { innerWidth?: number }) {
	const [windowWidth, setWindowWidth] = useState<number>(innerWidth || 0)

	useEffect(() => {
		const handleResize = () => {
			setWindowWidth(window.innerWidth)
		}

		window.addEventListener('resize', handleResize)

		return () => {
			window.removeEventListener('resize', handleResize)
		}
	}, [windowWidth])

	return {
		windowWidth,
		setWindowWidth,
	}
}
