import { Metadata } from 'next'
import ByNowOffers from './ByNowOffers'

export const metadata: Metadata = {
	title: 'Buy Now Offers',
}

const OffersPage = () => {
	return <ByNowOffers />
}

export default OffersPage
