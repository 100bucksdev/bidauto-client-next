import { ILotInfo, TLot } from '@/types/Lot.interface'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import LotHeader from './(widgets)/Header/LotHeader'
import LotMain from './(widgets)/Main/LotMain'
import LotSidebar from './(widgets)/SideBar/LotSidebar'

// ================= DYNAMIC MODE =================
export const dynamic = 'force-dynamic'

// ================= CONFIG =================
const API_URL =
	process.env.API_URL_SERVER || 'https://api.bidauto.online/api/v1'

const CACHE_CONFIG = {
	headers: { 'Content-Type': 'application/json' },
	cache: 'no-store' as const,
}

// ================= HELPERS =================
async function fetchLot(
	lotId: string,
	auctionName: string = 'COPART'
): Promise<TLot | null> {
	try {
		const res = await fetch(
			`${API_URL}/auction-vehicles/get-vin-or-lot/?vin_or_lot=${lotId}&auction=${auctionName}`,
			CACHE_CONFIG
		)
		if (!res.ok) throw new Error(`API responded with ${res.status}`)

		const data: TLot | TLot[] = await res.json()
		return Array.isArray(data) ? data[0] : data
	} catch (err) {
		console.error('Ошибка загрузки данных лота:', err)
		return null
	}
}

async function fetchLotInfo(
	uId: number,
	auctionName: string = 'COPART'
): Promise<ILotInfo | null> {
	try {
		const res = await fetch(
			`${API_URL}/auction-vehicles/indicators/${auctionName}/${uId}`,
			CACHE_CONFIG
		)
		if (!res.ok) return null

		const data: ILotInfo = await res.json()
		return Array.isArray(data) ? data[0] : data
	} catch (err) {
		console.error('Ошибка загрузки дополнительной информации:', err)
		return null
	}
}

// ================= METADATA =================
export async function generateMetadata({
	params,
}: {
	params: Promise<Record<'locale' | 'lotId' | 'auctionName', string>>
}): Promise<Metadata> {
	const { lotId, auctionName } = await params

	const lot = await fetchLot(lotId, auctionName)

	if (!lot) {
		return {
			title: 'T-auto | Lot not found',
			description: 'Lot not found or unavailable.',
		}
	}

	return {
		title: `T-auto | ${lot.Make ?? ''} ${lot.ModelGroup ?? ''}`.trim(),
		description: `Information about ${lot.Make ?? ''} ${
			lot.ModelGroup ?? ''
		}`.trim(),
	}
}

// ================= PAGE =================
export default async function LotPage({
	params,
}: {
	params: Promise<Record<'locale' | 'lotId' | 'auctionName', string>>
}) {
	const { lotId, auctionName } = await params

	if (!lotId) notFound()

	// Fetch lot data
	const lot = await fetchLot(lotId, auctionName)
	if (!lot) {
		console.warn('Лот не найден:', lotId)
		notFound()
	}

	// Fetch additional info if U_ID exists
	let info: ILotInfo | null = null
	if (lot.U_ID) {
		info = await fetchLotInfo(Number(lot.U_ID), auctionName)
	}

	// Prepare request data
	const requestData = {
		...(info ?? ({} as ILotInfo)),
		title_indicator: info?.title_indicator ?? '',
		insurance_caution: info?.insurance_caution ?? false,
		history: [],
	}

	return (
		<div className='flex bg-white py-10'>
			<div className='mx-auto max-w-[1400px] w-full'>
				<div className='mx-10 max-md:mx-4'>
					<div className='mb-6 max-lg:mb-4'>
						<LotHeader
							lot={lot}
							info={info ?? undefined}
							request={requestData}
						/>
					</div>
					<div className='flex max-lg:flex-col max-lg:gap-y-4 gap-x-6'>
						<div className='w-[65%] max-lg:w-full'>
							<LotMain lot={lot} />
						</div>
						<div className='w-[35%] max-lg:w-full'>
							<LotSidebar lot={lot} info={info ?? {}} />
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
