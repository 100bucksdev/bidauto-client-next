import { Metadata } from 'next'
import ByNowOffers from './ByNowOffers'

export const metadata: Metadata = {
	title: 'Buy Now Offers',
}

export const OffersPage = () => {
	return <ByNowOffers />
}
