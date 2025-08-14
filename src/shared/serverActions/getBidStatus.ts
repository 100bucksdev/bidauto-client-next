import { useTranslations } from 'next-intl'

export function getBidStatuses() {
	const t = useTranslations()

	return {
		lost: t('profile.statuses.lost'),
		win: t('profile.statuses.won'),
		placed: t('profile.statuses.placed'),
	}
}
