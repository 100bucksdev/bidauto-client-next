import { CSSObjectWithLabel } from 'react-select'

const getColor = (name: string) =>
	getComputedStyle(document.documentElement).getPropertyValue(name).trim()

export const homeSearchBarSelectStyles = {
	control: (styles: CSSObjectWithLabel) => ({
		...styles,
		background: 'transparent',
		color: getColor('--t-text-black'),
		border: 'none',
		borderRadius: '12px',
		boxShadow: 'none',
		height: '100%',
		padding: '0 0',
		fontSize: '14px',
		cursor: 'pointer',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		'&:hover': {
			borderColor: getColor('--t-hover-gray'),
		},
		'&:focus-within': {
			borderColor: getColor('--t-hover-gray'),
		},
	}),
	singleValue: (styles: CSSObjectWithLabel) => ({
		...styles,
		color: getColor('--t-text-black'),
		fontWeight: 500,
		display: 'flex',
		alignItems: 'center',
		gap: '8px',
	}),
	input: () => ({
		display: 'none',
	}),
	indicatorSeparator: () => ({
		display: 'none',
	}),
	dropdownIndicator: (styles: CSSObjectWithLabel) => ({
		...styles,
		color: getColor('--t-icon-gray'),
		'&:hover': {
			color: getColor('--t-hover-gray'),
		},
	}),
	menu: (styles: CSSObjectWithLabel) => ({
		...styles,
		background: getColor('--t-home-search-select-bg'),
		border: 'none',
		borderRadius: '8px',
		marginTop: '5px',
		boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
		zIndex: 10,
	}),
	option: (
		styles: CSSObjectWithLabel,
		{ isFocused, isSelected }: { isFocused: boolean; isSelected: boolean }
	) => ({
		...styles,
		background: isSelected
			? getColor('--t-selected-bg')
			: isFocused
			? getColor('--t-hover-gray')
			: getColor('--t-home-search-select-bg'),
		color: isSelected
			? getColor('--t-text-primary')
			: getColor('--t-text-black'),
		cursor: 'pointer',
		padding: '8px 12px',
		borderRadius: '4px',
		'&:active': {
			background: getColor('--t-active-gray'),
		},
	}),
}
