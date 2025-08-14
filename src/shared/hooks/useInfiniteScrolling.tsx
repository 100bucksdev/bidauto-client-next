import React from 'react'
import debounce from '../utils/debounce'

export const useInfiniteScrolling = (
	refOrWindow: any,
	callback: () => void,
	offset: number = 1000,
	type: 'default' | 'reverse' | undefined = 'default'
) => {
	const callbackHandler = React.useCallback(
		debounce(() => {
			callback()
		}, 500),
		[callback]
	)

	React.useEffect(() => {
		const target = refOrWindow.current || window

		const handleScroll = () => {
			let isScrolledPastOffset

			if (target === window) {
				isScrolledPastOffset =
					document.documentElement.scrollHeight -
						window.innerHeight -
						window.scrollY <
					offset
			} else {
				if (type === 'default') {
					isScrolledPastOffset =
						target.scrollHeight - target.scrollTop - target.clientHeight <
						offset
				} else {
					isScrolledPastOffset = target.scrollTop < offset
				}
			}

			if (isScrolledPastOffset) {
				callbackHandler()
			}
		}

		target.addEventListener('scroll', handleScroll)

		return () => {
			target.removeEventListener('scroll', handleScroll)
		}
	}, [refOrWindow, callbackHandler, offset, type])
}
