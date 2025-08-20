import { getIndicators } from '@/shared/api/Lots/getIndicators/getIndicators'
import { getLot } from '@/shared/api/Lots/getLot/getLot'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import LotHeader from './(widgets)/Header/LotHeader'
import LotMain from './(widgets)/Main/LotMain'
import LotSidebar from './(widgets)/SideBar/LotSidebar'

type LotPageProps = {
	params: { lotNumber: string }
	searchParams?: { auction_name?: 'COPART' | 'IAAI' }
}

// SEO-метаданные
export async function generateMetadata({
	params,
	searchParams,
}: LotPageProps): Promise<Metadata> {
	const data = await getLot({
		params: { vinOrId: params.lotNumber, auction: searchParams?.auction_name },
	})

	const lot = Array.isArray(data) ? data[0] : data

	if (!lot) {
		return {
			title: 'T-auto | Lot not found',
			description: 'About t-autologistics',
		}
	}

	return {
		title: `T-auto | ${lot.Make} ${lot.ModelGroup}`,
		description: 'About t-autologistics',
	}
}

export default async function LotPage({ params, searchParams }: LotPageProps) {
	const data = await getLot({
		params: { vinOrId: params.lotNumber, auction: searchParams?.auction_name },
	})

	if (!data) {
		notFound()
	}

	const lot = Array.isArray(data) ? data[0] : data
	const info = await getIndicators({
		params: {
			id: Number(lot?.U_ID),
			auction: searchParams?.auction_name as 'COPART' | 'IAAI',
		},
	})

	return (
		<div className='flex bg-white py-10'>
			<div className='mx-auto max-w-[1400px] w-full'>
				<div className='mx-10 max-md:mx-4'>
					<div className='mb-6 max-lg:mb-4'>
						<LotHeader lot={lot} info={info.data} request={info} />
					</div>
					<div className='flex max-lg:flex-col max-lg:gap-y-4 gap-x-6'>
						<div className='w-[65%] max-lg:w-full'>
							<LotMain lot={lot} />
						</div>
						<div className='w-[35%] max-lg:w-full'>
							<LotSidebar lot={lot} info={info} />
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
