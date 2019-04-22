import { useState, useEffect } from "react"

export default data => {
	/** State */
	const [minDate, setMinDate] = useState(null)
	const [maxDate, setMaxDate] = useState(null)

	/** Initialize dates */
	useEffect(() => {
		if (data !== null) {
			/** get array of dates */
			const dates = data.map(row => row.date)

			setMinDate(Math.min.apply(null, dates))
			setMaxDate(Math.max.apply(null, dates))
		}
	}, [data])

	/** Filter Data */
	const [filteredData, setFilteredData] = useState(null)
	useEffect(() => {
		if (minDate !== null && maxDate !== null) {
			setFilteredData(
				/** Filter out if date is less than min date or
				 * greater than max date
				 */
				data.filter(row => {
					return row.date >= minDate && row.date <= maxDate
				})
			)
		}
	}, [minDate, maxDate])

	return { data: filteredData, setMinDate, setMaxDate }
}
