export const priceFormat = ({
	char,
	decimals = 0,
}: {
	char: string
	decimals?: number
}) => {
	const price = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: char.toUpperCase(),
		maximumFractionDigits: decimals,
	})

	return price
}
