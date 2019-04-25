import { useState, useEffect } from "react"

export default data => {
	/** State */
	const [transformedData, setTransformedData] = useState(null)

	useEffect(() => {
		if (data !== null) {
			/** turn lat and long numeric
			 * turn start and end dates into dates
			 */
			setTransformedData(
				data.map(row => ({
					...row,
					path: `${row.originCity} -> ${row.destinationCity}`,
					originLatitude: +row.originLatitude,
					originLongitude: +row.originLongitude,
					destinationLatitude: +row.destinationLatitude,
					destinationLongitude: +row.destinationLongitude,
					startDate: new Date(`${row.startDateString} GMT-0457`),
					endDate: new Date(`${row.endDateString} GMT-0457`),
				}))
			)
		}
	}, [data])

	return transformedData
}
