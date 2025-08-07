import { Metadata } from 'next'
import DepositClientPage from './DepositClientPage'

export const metadata: Metadata = {
	title: 'Deposit',
	description: 'Deposit page for T-auto',
}

export function DepositPage() {
	return <DepositClientPage />
}
