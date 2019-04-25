import { useState, useEffect } from "react"

export default data => {
	/** State */
	const [transformedData, setTransformedData] = useState(null)

	useEffect(() => {
		if (data !== null) {
			/** turn lat and long numeric, and convert
			 * dateString to date
			 */
			setTransformedData(
				data.map(row => ({
					...row,
					lat: +row.lat,
					lon: +row.lon,
					dateString: row.date,
					date: new Date(`${row.date} GMT-0457`),
				}))
			)
		}
	}, [data])

	return transformedData
}
