'use client'

import { useTranslations } from 'next-intl'

export const useWeekDays = () => {
	const t = useTranslations()

	const weekDays = [
		t('weekDays.sun'),
		t('weekDays.mon'),
		t('weekDays.tue'),
		t('weekDays.wed'),
		t('weekDays.thu'),
		t('weekDays.fri'),
		t('weekDays.sat'),
	]

	return weekDays
}
