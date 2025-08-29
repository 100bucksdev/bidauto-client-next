import { NO_INDEX_PAGE } from '@/shared/constants/seo.constants'
import { Metadata } from 'next'
import Registration from './Registration'

export const metadata: Metadata = {
	title: 'Registration',
	...NO_INDEX_PAGE,
}

export default function RegistrationPage() {
	return <Registration />
}
