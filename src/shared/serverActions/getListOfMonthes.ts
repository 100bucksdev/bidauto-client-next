import { getTranslations } from 'next-intl/server'

export const getListOfMonthes = async () => {
	const t = await getTranslations()

	return [
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
}
