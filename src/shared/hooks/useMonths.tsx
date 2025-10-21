'use client'

import { useTranslations } from 'next-intl'

export const useMonths = () => {
	const t = useTranslations()

	const months = [
		t('monthes.jan'),
		t('monthes.feb'),
		t('monthes.mar'),
		t('monthes.apr'),
		t('monthes.may'),
		t('monthes.jun'),
		t('monthes.jul'),
		t('monthes.aug'),
		t('monthes.sep'),
		t('monthes.oct'),
		t('monthes.nov'),
		t('monthes.dec'),
	]

	return months
}
