import { FC } from 'react'

interface CircleLoaderProps {
	svgClassName?: string
	circleClassName?: string
}

const CircleLoader: FC<CircleLoaderProps> = ({
	svgClassName = 'w-6 h-6',
	circleClassName = 'stroke-current text-white',
}) => {
	return (
		<svg className={`animate-spin ${svgClassName}`} viewBox='25 25 50 50'>
			<circle
				className={`fill-none stroke-2 stroke-linecap-round animate-[dash_1.5s_ease-in-out_infinite] ${circleClassName}`}
				r='20'
				cy='50'
				cx='50'
			/>
		</svg>
	)
}

export default CircleLoader
