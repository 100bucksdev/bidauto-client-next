import { Metadata } from 'next'
import Search from './SearchPage'

export const metadata: Metadata = {
	title: 'Search',
}

export const SearchPage = () => {
	return <Search />
}
