export const $Pages = {
	CLIENT: {
		HOME: '/',
		AUTH: {
			REGISTRATION: '/registration',
			LOGIN: '/login',
			FORGOT_PASSWORD: '/forgot-password',
		},
		ABOUT: '/about',
		AUCTION: {
			INDEX: '/auction',
			BY_ID: (id: string) => `/auction/${id}`,
		},
		SHOP: {
			INDEX: '/shop',
			BY_ID: (id: string) => `/shop/${id}`,
		},
		BLOG: {
			INDEX: '/blog',
			BY_ID: (id: string) => `/blog/post/${id}`,
		},
		CONTACT: '/contact',
		DEPOSIT: {
			INDEX: '/deposit',
			FAILURE: '/deposit/failure',
			SUCCESS: '/deposit/success',
		},
		HELP: {
			DEPOSIT: '/help/deposit',
			SALES_DOCUENTS: '/help/sales-documents',
			TERMS_OF_USE: '/help/terms-of-use',
		},
		LOT: (id: string, auction: string) => `/lot/${id}/${auction}`,
		SEARCH: {
			INDEX: '/search',
			HOME: '/search/home',
			OFFERS: '/search/offers',
			SOLD_VEHICLES: '/search/sold-vehicles',
		},
	},
	ADMIN: {
		INDEX: '/admin',
		BIDS: '/bids',
		OFFERS: '/offers',
		MESSAGES: '/messages',
		USERS: {
			INDEX: '/users',
			CREATE: '/users/create',
		},
		CONTAINERS: {
			INDEX: '/containers',
			CREATE: '/containers/create',
			EDIT: (id: string) => `/containers/edit/${id}`,
		},
		ORDERS: {
			INDEX: '/orders',
			CREATE: '/orders/create',
			EDIT: (id: string) => `/orders/edit/${id}`,
			VIEW: (id: string) => `/orders/view/${id}`,
			CUSTOM_INVOICE: (id: string) => `/orders/custom-invoice/${id}`,
		},
		CARFAX_PACKAGES: {
			INDEX: '/carfax-packages',
			CREATE: '/carfax-packages/create',
		},
		TERMINAL_FEE: '/terminal-fee',
		LOCATIONS: {
			INDEX: '/locations',
			CREATE: '/locations/create',
		},
		SHIP_LINES: {
			INDEX: '/ship-lines',
			CREATE: '/ship-lines/create',
		},
		APP_SETTINGS: '/app-settings',
		SHOP: {
			INDEX: '/shop',
			CREATE: '/shop/create',
			CHANGE: (id: string) => `/shop/change/${id}`,
			CATEGORIES: {
				INDEX: '/shop/categories',
				CREATE: '/shop/categories/create',
			},
		},
		SUMMARY_REPORTS: {
			INDEX: '/summary-reports',
			BY_ID: (id: string) => `/summary-reports/${id}`,
		},
		AUCTION: {
			INDEX: '/auction',
			CREATE: (shopId: string) => `/auction/create/${shopId}`,
			EDIT: (shopId: string) => `/auction/edit/${shopId}`,
		},
		FEES: {
			INDEX: '/fees',
			ADDITIONAL: '/fees/additional',
		},
		STAFF: '/staff',
		SOLD_VEHICLES: '/sold-vehicles',
	},
	USER: {
		PROFILE: '/profile',
		ORDER: (orderId: string) => `/order/${orderId}`,
		SETTINGS: {
			INDEX: '/user/settings',
			PERSONAL_INFO: '/user/settings/personal-info',
			CHANGE_PASSWORD: '/user/settings/change-password',
			ADDITIONALLY: '/user/settings/additionally',
		},
	},
}
