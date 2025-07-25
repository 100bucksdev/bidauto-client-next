import { IconsProps } from '../..'

export const IcSearch = ({
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
				d='M21 21L15.6039 15.6039M15.6039 15.6039C16.9395 14.2678 17.7655 12.4222 17.7655 10.3837C17.7655 6.30578 14.4602 3 10.3828 3C6.30538 3 3 6.30578 3 10.3837C3 14.4615 6.30538 17.7673 10.3828 17.7673C12.4218 17.7673 14.2679 16.9406 15.6039 15.6039Z'
				stroke={stroke}
				stroke-width={strokeWidth}
				stroke-linecap='round'
			/>
		</svg>
	)
}
