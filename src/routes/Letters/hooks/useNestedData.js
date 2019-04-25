import { useState, useEffect } from "react"
import { nest } from "d3-collection"

export default data => {
	/** State */
	const [nestedData, setNestedData] = useState(null)

	useEffect(() => {
		if (data !== null) {
			/** Nest data by path */
			setNestedData(
				nest()
					.key(d => d.path)
					.rollup(lvs => ({
						letterCount: lvs.length,
						originLatitude: lvs[0].originLatitude,
						originLongitude: lvs[0].originLongitude,
						destinationLatitude: lvs[0].destinationLatitude,
						destinationLongitude: lvs[0].destinationLongitude,
						letters: lvs,
					}))
					.entries(data)
					.map(row => ({
						path: row.key,
						originLatitude: row.value.originLatitude,
						originLongitude: row.value.originLongitude,
						destinationLatitude: row.value.destinationLatitude,
						destinationLongitude: row.value.destinationLongitude,
						letterCount: row.value.letterCount,
						letters: row.value.letters,
					}))
			)
		}
	}, [data])

	return nestedData
}
