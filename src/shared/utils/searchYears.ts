const currentDate = new Date(Date.now())
const startYear = 1900
const endYear = currentDate.getFullYear() + 1

export const yearsArray = Array.from(
	{ length: endYear - startYear },
	(_, index) => {
		const year = startYear + index
		return { value: year.toString(), label: year.toString() }
	}
)
