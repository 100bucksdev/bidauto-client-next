import { TIcon } from '@100bucksdev/icons'

interface IHeaderData {
	title: string
	path: string
	iconKey: TIcon
	subElement?: {
		title: string
		path: string
		iconKey: TIcon
	}[]
}

export const HeaderData: IHeaderData[] = [
	{
		title: 'header.options.search',
		iconKey: 'search',
		path: '',
		subElement: [
			{
				title: 'header.options.search',
				path: '/search',
				iconKey: 'search',
			},
			{
				title: 'header.options.buyNow',
				path: '/search/offers',
				iconKey: 'car1',
			},
			{
				title: 'header.options.sold',
				path: '/search/sold-vehicles',
				iconKey: 'car2',
			},
		],
	},
	{
		title: 'header.options.shop',
		iconKey: 'cart',
		path: '',
		subElement: [
			{
				title: 'header.options.reservation',
				path: '/shop',
				iconKey: 'cart',
			},
			{
				title: 'header.options.auction',
				path: '/auction',
				iconKey: 'car1',
			},
		],
	},
	{
		title: 'header.options.contact',
		path: '/contact',
		iconKey: 'location',
	},
	{
		title: 'header.options.blog',
		path: '/blog',
		iconKey: 'message',
	},
	{
		title: 'header.options.aboutUs',
		path: '/about',
		iconKey: 'book',
	},
	{
		title: 'header.options.help',
		path: '/help/deposit',
		iconKey: 'questionCircle',
	},
]
