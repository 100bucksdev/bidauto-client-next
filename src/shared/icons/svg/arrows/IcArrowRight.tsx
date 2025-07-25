import { IconsProps } from '../..'

export const IcArrowRight = ({
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
				d='M9.57007 18.0701L3.50007 12.0001L9.57007 5.93007'
				stroke={stroke}
				stroke-width={strokeWidth}
				stroke-miterlimit='10'
				stroke-linecap='round'
				stroke-linejoin='round'
			/>
			<path
				d='M20.5 12L3.67 12'
				stroke={stroke}
				stroke-width={strokeWidth}
				stroke-miterlimit='10'
				stroke-linecap='round'
				stroke-linejoin='round'
			/>
		</svg>
	)
}
