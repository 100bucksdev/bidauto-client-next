import { Metadata } from 'next'
import SoldVehiclesPage from './SoldVehiclesSearchPage'

export const metadata: Metadata = {
	title: 'Search',
}

const SoldVehiclesSearch = () => {
	return <SoldVehiclesPage />
}

export default SoldVehiclesSearch
