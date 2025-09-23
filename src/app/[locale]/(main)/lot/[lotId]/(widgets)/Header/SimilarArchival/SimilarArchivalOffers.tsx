import { TLot } from '@/types/Lot.interface'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { GrNext } from 'react-icons/gr'
import SimilarArchivalCard from './SimilarArchivalCard'
import SimilarArchivalCardSkeleton from './SimilarArchivalCardSkeleton'

const SimilarArchivalOffers = ({
	data,
	isLoading,
	isOpen,
	auction,
}: {
	data:
		| {
				lots: TLot[]
				'make-model': Record<'make' | 'model', string>
		  }
		| undefined
	isLoading: boolean
	isOpen: boolean
	auction: 'IAAI' | 'COPART'
}) => {
	const t = useTranslations()

	return (
		<>
			{isOpen ? (
				<>
					{isLoading ? (
						<div className='flex max-md:flex-col gap-x-2 p-2'>
							<div className='grid grid-cols-5 max-md:flex max-md:flex-col gap-2'>
								<SimilarArchivalCardSkeleton />
								<SimilarArchivalCardSkeleton />
								<SimilarArchivalCardSkeleton />
								<SimilarArchivalCardSkeleton />
								<SimilarArchivalCardSkeleton />
							</div>
						</div>
					) : data ? (
						<div className='flex max-md:flex-col gap-x-2 p-2'>
							<div className='grid grid-cols-5 max-md:flex max-md:flex-col max-md:items-center gap-2'>
								{data?.lots?.map(lot => (
									<SimilarArchivalCard key={lot.U_ID} lot={lot} />
								))}
							</div>
							<Link
								href={`/search?model=${data['make-model'].model}&make=${data['make-model'].make}&auction=${auction}`}
								className='w-[40px] max-md:w-full max-md:h-[30px] rounded-md bg-blue-500 grid place-items-center text-white hover:bg-blue-600 duration-150 max-md:mt-2'
							>
								<div className='max-md:rotate-90'>
									<GrNext />
								</div>
							</Link>
						</div>
					) : (
						<div>{t('lot.similarSales.noSales')}</div>
					)}
				</>
			) : (
				''
			)}
		</>
	)
}

export default SimilarArchivalOffers
