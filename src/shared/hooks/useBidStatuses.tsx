'use client'

import { useTranslations } from 'next-intl'

export const useBidStatuses = () => {
	const t = useTranslations()

	return {
		lost: t('profile.statuses.lost'),
		win: t('profile.statuses.won'),
		placed: t('profile.statuses.placed'),
	}
}
