import { Metadata } from 'next'
import SoldVehiclesPage from './SoldVehiclesSearchPage'

export const metadata: Metadata = {
	title: 'Search',
}

export const SoldVehiclesSearch = () => {
	return <SoldVehiclesPage />
}
