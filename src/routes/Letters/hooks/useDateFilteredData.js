import { useState, useEffect } from "react"

export default data => {
	/** State */
	const [minDate, setMinDate] = useState(null)
	const [maxDate, setMaxDate] = useState(null)

	/** Initialize dates */
	useEffect(() => {
		if (data !== null) {
			/** get array of dates */
			const startDates = data.map(row => row.startDate)
			const endDates = data.map(row => row.endDate)

			setMinDate(Math.min.apply(null, startDates))
			setMaxDate(Math.max.apply(null, endDates))
		}
	}, [data])

	/** Filter Data */
	const [filteredData, setFilteredData] = useState(null)

	useEffect(() => {
		if (minDate !== null && maxDate !== null) {
			setFilteredData(
				/** Filter out if startDate is greater than maxDate
				 * or endDate is less than minDate
				 */
				data.filter(row => !(row.startDate > maxDate || row.endDate < minDate))
			)
		}
	}, [minDate, maxDate])

	return { data: filteredData, setMinDate, setMaxDate }
}
