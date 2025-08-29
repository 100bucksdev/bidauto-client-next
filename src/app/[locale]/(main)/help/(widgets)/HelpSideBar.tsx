'use client'

import { useTranslations } from 'next-intl'
import { usePathname, useRouter } from 'next/navigation'
import { BiPurchaseTag } from 'react-icons/bi'
import { CiMoneyCheck1 } from 'react-icons/ci'
import { IoShieldHalfOutline } from 'react-icons/io5'

export default function HelpSideBar() {
	const pathname = usePathname()
	const path = useRouter()
	const t = useTranslations()

	return (
		<div className='w-full max-lg:w-full'>
			<div className='py-2'>
				<div
					className={`px-3 duration-100 rounded-2xl mb-3 cursor-pointer ${
						pathname.includes('/help/deposit')
							? 'bg-t-blue-light cursor-pointer'
							: 'bg-white  hover:bg-gray-100'
					}`}
				>
					<button
						className={`w-full px-2 py-2 rounded-2xl duration-100 flex items-center gap-x-2 ${
							pathname.includes('/help/deposit') ? 'text-white' : ''
						}`}
						onClick={() => path.push('/help/deposit')}
					>
						<span>
							<CiMoneyCheck1 />
						</span>
						<span>{t('help.deposit.header')}</span>
					</button>
				</div>
				<div
					className={`px-3 duration-100 rounded-2xl mb-3 cursor-pointer ${
						pathname.includes('/help/sales-documents')
							? 'bg-t-blue-light'
							: 'bg-white  hover:bg-gray-100'
					}`}
				>
					<button
						className={`w-full px-2 py-2 rounded-2xl duration-100 flex items-center gap-x-2 ${
							pathname.includes('/help/sales-documents') ? 'text-white' : ''
						}`}
						onClick={() => path.push('/help/sales-documents')}
					>
						<span>
							<BiPurchaseTag />
						</span>
						<span>{t('help.salesDocuments.header')}</span>
					</button>
				</div>
				<div
					className={`px-3 duration-100 rounded-2xl mb-3 cursor-pointer ${
						pathname.includes('/help/terms-of-use')
							? 'bg-t-blue-light'
							: 'bg-white  hover:bg-gray-100'
					}`}
				>
					<button
						className={`w-full px-2 py-2 rounded-2xl duration-100 flex items-center gap-x-2 ${
							pathname.includes('/help/terms-of-use') ? 'text-white' : ''
						}`}
						onClick={() => path.push('/help/terms-of-use')}
					>
						<span>
							<IoShieldHalfOutline />
						</span>
						<span>Terms of Use</span>
					</button>
				</div>
			</div>
		</div>
	)
}
