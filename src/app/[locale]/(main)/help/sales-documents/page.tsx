import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

export const metadata: Metadata = {
	title: 'Sales Documents',
}

export default async function SalesDocuments() {
	const t = await getTranslations()

	return (
		<>
			<div className='w-full max-lg:w-full bg-white rounded-2xl py-3'>
				<div>
					<h1 className='text-black font-semibold text-lg px-4 mb-2'>
						{t('help.salesDocuments.dots.header')}
					</h1>
					<div className='px-4 flex flex-col gap-y-5 text-gray-500 text-base'>
						<div className='flex items-center gap-x-2'>
							<span className='flex-shrink-0 h-3 w-3 bg-green-500 rounded-full' />
							<span className='flex-shrink-0'>-</span>
							<span className='break-words'>
								{t('help.salesDocuments.dots.green')}
							</span>
						</div>
						<div className='flex items-center gap-x-2'>
							<span className='flex-shrink-0 h-3 w-3 bg-red-600 rounded-full' />
							<span className='flex-shrink-0'>-</span>
							<span className='break-words'>
								{t('help.salesDocuments.dots.red')}
							</span>
						</div>
						<div className='flex items-center gap-x-2'>
							<span className='flex-shrink-0 h-3 w-3 bg-black rounded-full' />
							<span className='flex-shrink-0'>-</span>
							<span className='break-words'>
								{t('help.salesDocuments.dots.black')}
							</span>
						</div>
						<div className='flex items-center gap-x-2'>
							<span className='flex-shrink-0 h-3 w-3 bg-yellow-500 rounded-full' />
							<span className='flex-shrink-0'>-</span>
							<span className='break-words'>
								{t('help.salesDocuments.dots.yellow')}
							</span>
						</div>
						<div className='flex items-center gap-x-2'>
							<span className='flex-shrink-0 h-3 w-3 bg-red-500 rounded-full' />
							<span className='flex-shrink-0 h-3 w-3 bg-red-500 rounded-full' />
							<span className='flex-shrink-0'>-</span>
							<span className='break-words'>
								{t('help.salesDocuments.dots.doubleRed')}*
							</span>
						</div>
						<div className='flex items-center gap-x-2'>
							<span className='flex-shrink-0 h-3 w-3 bg-gray-500 rounded-full' />
							<span className='flex-shrink-0'>-</span>
							<span className='break-words'>
								{t('help.salesDocuments.dots.gray')}
							</span>
						</div>
						<div className='mt-3'>
							<div>
								<div>* {t('help.salesDocuments.firstClue')}</div>
								<div>* {t('help.salesDocuments.secondClue')}</div>
							</div>
							<div className='mt-3'>
								{t('help.salesDocuments.thirdClueFirstPart')}{' '}
								<span className='inline-flex items-center'>
									({t('help.salesDocuments.dots.green')} -
									<span className='flex-shrink-0 h-3 w-3 bg-green-500 rounded-full ml-2' />
									);
								</span>{' '}
								{t('help.salesDocuments.thirdClueSecondPart')}
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export const dynamic = 'force-static'
