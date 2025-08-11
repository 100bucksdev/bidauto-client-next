const AuctionName = ({
	auction_name,
	lot_id,
	withRedirect = false,
}: {
	auction_name: string
	lot_id?: string
	withRedirect?: boolean
}) => {
	const isCopart = auction_name?.toUpperCase().includes('COPART')
	const isIaai = auction_name?.toUpperCase().includes('IAAI')

	if (!isCopart && !isIaai) {
		return <></>
	}

	return !withRedirect ? (
		<div
			className={`px-2 pt-[6px] pb-1 max-md:text-sm text-base text-t-text-primary rounded-full ${
				isCopart ? 'bg-blue-500' : isIaai ? 'bg-red-500' : 'bg-black'
			}`}
		>
			<span className=''>{auction_name.toUpperCase()}</span>
		</div>
	) : (
		<a
			href={`${
				isCopart
					? `${process.env.NEXT_REACT_APP_COPART_DOMEN}/lot/${lot_id}`
					: isIaai
					? `${process.env.NEXT_REACT_APP_IAAI_DOMEN}/Search?Keyword=${lot_id}`
					: ''
			}`}
			target='_blank'
			className={`max-l:mt-2 cursor-pointer btn ${
				isCopart ? 'btn-primary' : isIaai ? 'btn-error' : ''
			}`}
		>
			<div
				className={`px-2 pt-[6px] pb-1 max-md:text-sm text-base text-t-text-primary rounded-lg`}
			>
				<span className=''>{auction_name.toUpperCase()}</span>
			</div>
		</a>
	)
}

export default AuctionName
