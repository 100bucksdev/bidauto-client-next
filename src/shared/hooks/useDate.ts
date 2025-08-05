export const useDate = () => {
	const getDate = (date: Date): string => {
		const dateData = new Date(date)
		if (!(dateData instanceof Date) || isNaN(dateData.getTime())) {
			throw new TypeError('Invalid date object provided')
		}

		const pad = (num: number) => num.toString().padStart(2, '0')

		const year = dateData.getFullYear()
		const month = pad(dateData.getMonth() + 1)
		const day = pad(dateData.getDate())

		return `${year}-${month}-${day}`
	}

	const getDateWithTime = (date: Date): string => {
		const dateData = new Date(date)
		if (!(dateData instanceof Date) || isNaN(dateData.getTime())) {
			throw new TypeError('Invalid date object provided')
		}

		const pad = (num: number) => num.toString().padStart(2, '0')

		const year = dateData.getFullYear()
		const month = pad(dateData.getMonth() + 1)
		const day = pad(dateData.getDate())
		const hours = pad(dateData.getHours())
		const minutes = pad(dateData.getMinutes())

		return `${year}-${month}-${day} ${hours}:${minutes}`
	}

	return {
		getDate,
		getDateWithTime,
	}
}
