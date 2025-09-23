import { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { ILotInfo, TLot } from '@/types/Lot.interface'
import LotHeader from './(widgets)/Header/LotHeader'
import LotMain from './(widgets)/Main/LotMain'
import LotSidebar from './(widgets)/SideBar/LotSidebar'

type LotPageProps = {
	params: Promise<{ locale: string; lotId: string }>
	searchParams?: Promise<{ auction_name?: 'COPART' | 'IAAI' }>
}

function resolveValue(v?: string | string[]): string | undefined {
	if (!v) return undefined
	return Array.isArray(v) ? v[0] : v
}

const API_URL =
	process.env.API_URL_SERVER || 'http://host.docker.internal:8000/api/v1'

// ================= SEO =================
export async function generateMetadata({
	params,
	searchParams,
}: LotPageProps): Promise<Metadata> {
	const { lotId } = await params
	const { auction_name } = (searchParams ? await searchParams : {}) ?? {}

	let lot: TLot | null = null

	try {
		const res = await fetch(
			`${API_URL}/auction-vehicles/get-vin-or-lot/?vin_or_lot=${lotId}&auction=${
				auction_name ?? 'COPART'
			}`,
			{
				headers: {
					'Content-Type': 'application/json',
				},
				credentials: 'include',
			}
		)
		const data: TLot | TLot[] = await res.json()
		lot = Array.isArray(data) ? data[0] : data
	} catch (err) {
		console.error('Ошибка загрузки машин:', err)
	}

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

// ================= PAGE =================
export default async function LotPage({ params, searchParams }: LotPageProps) {
	const { lotId } = await params
	const { auction_name } = (searchParams ? await searchParams : {}) ?? {}

	if (!lotId) notFound()

	let lot: TLot | null = null

	try {
		const res = await fetch(
			`${API_URL}/auction-vehicles/get-vin-or-lot/?vin_or_lot=${lotId}&auction=${
				auction_name ?? 'COPART'
			}`,
			{
				headers: {
					'Content-Type': 'application/json',
				},
				credentials: 'include',
			}
		)
		const data: TLot | TLot[] = await res.json()
		lot = Array.isArray(data) ? data[0] : data
	} catch (err) {
		console.error('Ошибка загрузки машин:', err)
	}

	if (!lot) notFound()

	console.log('id', lotId)
	console.log('auction', auction_name)
	console.log('LOT', lot)
	console.log(
		'API_URL',
		`${API_URL}/auction-vehicles/get-vin-or-lot/?vin_or_lot=${lotId}&auction=${
			auction_name ?? 'COPART'
		}`
	)

	let info: ILotInfo = {} as ILotInfo

	if (lot?.U_ID) {
		try {
			const res = await fetch(
				`${API_URL}/auction-vehicles/indicators/${
					auction_name ?? 'COPART'
				}/${Number(lot.U_ID)}`,
				{
					headers: {
						'Content-Type': 'application/json',
					},
					credentials: 'include',
				}
			)
			const data: ILotInfo = await res.json()
			info = Array.isArray(data) ? data[0] : data
		} catch (err) {
			console.error('Ошибка загрузки информации по лоту:', err)
		}
	}

	return (
		<div className='flex bg-white py-10'>
			<div className='mx-auto max-w-[1400px] w-full'>
				<div className='mx-10 max-md:mx-4'>
					<div className='mb-6 max-lg:mb-4'>
						<LotHeader lot={lot} info={info} request={info} />
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
