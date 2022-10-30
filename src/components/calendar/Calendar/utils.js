import { addMonths, getDaysInMonth } from "date-fns"

const DAYS_IN_WEEK = 7

export function getMonthData(year, month) {
	const result = []
	let day = 1

	const date = new Date(year, month, day, "12", "00", "00")
	const daysInMonth = getDaysInMonth(date)
	const monthStartsOn = date.getDay()

	for (let i = 0; i < (daysInMonth + monthStartsOn) / DAYS_IN_WEEK; i++) {
		result[i] = []

		for (let j = 0; j < DAYS_IN_WEEK; j++) {
			if (i === 0 && j < monthStartsOn) {
				result[i] = getWeekDays(new Date(year, month - 1, daysInMonth))
			} else if (day > daysInMonth) {
				result[i] = getWeekDays(new Date(year, month, daysInMonth))
			} else {
				result[i][j] = new Date(year, month, day++, "12", "00", "00")
			}
		}
	}

	return result
}

export function getWeekDays(dateProps = new Date()) {
	return Array.from(new Array(7), (e, i) => {
		const date = new Date(dateProps)
		date.setDate(date.getDate() + (i - date.getDay()))
		return date
	})
}

export function getDateArrays(currentDate, needItems, row = 2) {
	const year = currentDate.getFullYear()
	const month = currentDate.getMonth()
	const day = 1
	const start = new Date(year, month, day)

	const arr = Array.from(new Array(needItems), (e, i) => {
		if (i === 0) {
			return currentDate
		}

		return addMonths(start, i)
	})
	return arr
}
