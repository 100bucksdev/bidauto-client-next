import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'

export function useLocationChanged(func: () => void) {
	const location = usePathname()
	const prevLocation = useRef(location)

	useEffect(() => {
		if (prevLocation.current !== location) {
			func()
		}
		prevLocation.current = location
	}, [func, location])
}
