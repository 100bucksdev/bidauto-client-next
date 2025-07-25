import { IconsProps } from '../..'

export const IcSearchSquare = ({
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
				d='M21 21L16.825 16.8319M16.825 16.8319C16.9743 16.6829 17.1118 16.5222 17.2361 16.3511C18 15.2997 18 13.7998 18 10.8V10.2C18 7.20021 18 5.70032 17.2361 4.64886C16.9893 4.30928 16.6907 4.01065 16.3511 3.76393C15.2997 3 13.7998 3 10.8 3H10.2C7.20021 3 5.70032 3 4.64886 3.76393C4.30928 4.01065 4.01065 4.30928 3.76393 4.64886C3 5.70032 3 7.20021 3 10.2V10.8C3 13.7998 3 15.2997 3.76393 16.3511C4.01065 16.6907 4.30928 16.9893 4.64886 17.2361C5.70032 18 7.20021 18 10.2 18H10.8C13.7998 18 15.2997 18 16.3511 17.2361C16.5196 17.1137 16.678 16.9785 16.825 16.8319Z'
				stroke={stroke}
				stroke-width={strokeWidth}
				stroke-linecap='round'
				stroke-linejoin='round'
			/>
		</svg>
	)
}
