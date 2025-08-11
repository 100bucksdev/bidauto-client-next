import { getTranslations } from 'next-intl/server'

export const getListOfWeekDays = async () => {
	const t = await getTranslations()

	return [
		t('weekDays.sun'),
		t('weekDays.mon'),
		t('weekDays.tue'),
		t('weekDays.wed'),
		t('weekDays.thu'),
		t('weekDays.fri'),
		t('weekDays.sat'),
	]
}
