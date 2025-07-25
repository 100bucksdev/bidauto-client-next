import { IconsProps } from '../..'

export const IcChevronLeft = ({
	width = '24',
	height = '24',
	fill = 'none',
	stroke = 'currentColor',
	strokeWidth = '1.5',
}: IconsProps) => {
	return (
		<svg
			width={width}
			height={height}
			viewBox='0 0 24 24'
			fill={fill}
			xmlns='http://www.w3.org/2000/svg'
		>
			<path
				d='M14.5 7L9.5 12L14.5 17'
				stroke={stroke}
				stroke-width={strokeWidth}
				stroke-linecap='round'
				stroke-linejoin='round'
			/>
		</svg>
	)
}
