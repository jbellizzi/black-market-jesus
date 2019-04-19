import { useState, useEffect } from "react"
import { nest } from "d3-collection"

export default data => {
	const [transformedData, setTransformedData] = useState(null)

	useEffect(() => {
		if (data !== null) {
			const nestedPeople = nest()
				.key(d => d.person)
				.rollup(lvs =>
					lvs.map(lv => ({
						...lv,
						lat: +lv.lat,
						lon: +lv.lon,
					}))
				)
				.entries(data)
				.map(person => ({
					name: person.key,
					cities: person.value,
					paths: person.value
						.filter((row, i, array) => {
							if (i === 0) return null
							else return row.city !== array[i - 1].city
						})
						.map((row, i, array) => {
							if (i === 0) return null
							else
								return {
									originCity: array[i - 1].city,
									originLat: array[i - 1].lat,
									originLon: array[i - 1].lon,
									destinationCity: row.city,
									destinationLat: row.lat,
									destinationLon: row.lon,
								}
						})
						.filter(row => row !== null),
				}))

			setTransformedData(nestedPeople)
		}
	}, [data])

	return transformedData
}
