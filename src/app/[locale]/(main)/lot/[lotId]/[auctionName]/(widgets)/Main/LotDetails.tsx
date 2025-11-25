import { kmInMile, odometer } from '@/shared/utils/odometer'
import { TLot } from '@/types/Lot.interface'
import { getTranslations } from 'next-intl/server'

const LotDetails = async ({ lot }: { lot: TLot }) => {
	const t = await getTranslations()

	return (
		<>
			<div className='font-bold mx-8 my-10  text-3xl'>
				{t('lot.details.details')}
			</div>
			<div className='max-md:text-sm mx-8'>
				<div className='flex justify-between'>
					<div>{t('lot.details.primaryDamage')}</div>
					<div className='font-medium'>
						{lot.damage_pr?.toUpperCase() ? lot.damage_pr : ''}
					</div>
				</div>
				<hr className='border border-slate-200 my-6' />
				<div className='flex justify-between'>
					<div>{t('lot.details.secondaryDamage')}</div>
					<div className='font-medium'>{lot.damage_sec || ''}</div>
				</div>
				<hr className='border border-slate-200 my-6' />
				<div className='flex justify-between'>
					<div>{t('lot.details.odometer')}</div>
					{!Number.isNaN(Number(lot.odometer)) && (
						<div className='font-medium'>
							<span className='mr-1'>
								{odometer.format(Number(lot.odometer))}
							</span>
							<span>{`(${odometer.format(
								Math.round(Number(lot.odometer) * kmInMile)
							)} km)`}</span>
						</div>
					)}
				</div>
				<hr className='border border-slate-200 my-6' />
				<div className='flex justify-between'>
					<div>{t('lot.details.odometerBrand')}</div>
					<div className='font-medium'>{lot.odobrand}</div>
				</div>
				<hr className='border border-slate-200 my-6' />
				<div className='flex justify-between'>
					<div>{t('lot.details.lotId')}</div>
					<div className='font-medium'>{lot.lot_id}</div>
				</div>
				<hr className='border border-slate-200 my-6' />
				<div className='flex justify-between'>
					<div>VIN</div>
					<div className='font-medium'>{lot.vin}</div>
				</div>
				<hr className='border border-slate-200 my-6' />
				<div className='flex justify-between'>
					<div>{t('lot.details.make')}</div>
					<div className='font-medium'>{lot.make}</div>
				</div>
				<hr className='border border-slate-200 my-6' />
				<div className='flex justify-between'>
					<div>{t('lot.details.model')}</div>
					<div className='font-medium'>{lot.model}</div>
				</div>
				<hr className='border border-slate-200 my-6' />
				<div className='flex justify-between'>
					<div>{t('lot.details.engine')}</div>
					<div className='font-medium'>{lot.engine}</div>
				</div>
				<hr className='border border-slate-200 my-6' />
				<div className='flex justify-between'>
					<div>{t('lot.details.fuel')}</div>
					<div className='font-medium'>{lot.fuel}</div>
				</div>
				<hr className='border border-slate-200 my-6' />
				<div className='flex justify-between'>
					<div>{t('lot.details.transmission')}</div>
					<div className='font-medium'>{lot.transmission}</div>
				</div>
				<hr className='border border-slate-200 my-6' />
				<div className='flex justify-between'>
					<div>{t('lot.details.keys')}</div>
					<div className='font-medium'>
						{lot.keys ? t('common.yes') : t('common.no')}
					</div>
				</div>
				<hr className='border border-slate-200 my-6' />
				<div className='flex justify-between'>
					<div>{t('lot.details.lotCondition')}</div>
					<div className='font-medium'>{lot.state}</div>
				</div>
				<hr className='border border-slate-200 my-6' />
				<div className='flex justify-between'>
					<div>{t('lot.details.color')}</div>
					<div className='font-medium'>{lot.color}</div>
				</div>
				<hr className='border border-slate-200 my-6' />
				<div className='flex justify-between'>
					<div>{t('lot.details.location')}</div>
					<div className='font-medium'>{lot.location}</div>
				</div>
				{/* {lot.Auction === 'IAAI' && (
					<>
						<hr className='border border-slate-200 my-6' />
						<div className='flex justify-between'>
							<div>{t('lot.details.manufacturedIn')}</div>
							<div className='font-medium'>{lot.ManufacturedIn}</div>
						</div>
					</>
				)} */}
			</div>
		</>
	)
}

export default LotDetails
