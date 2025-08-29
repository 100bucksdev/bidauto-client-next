import { Metadata } from 'next'
import Search from './SearchPage'

export const metadata: Metadata = {
	title: 'Search',
}

export default function SearchPage() {
	// это серверный компонент, просто возвращает клиентский
	return <Search />
}
