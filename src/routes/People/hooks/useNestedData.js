import { useState, useEffect } from "react"
import { nest } from "d3-collection"

export default data => {
	/** State */
	const [nestedData, setNestedData] = useState(null)

	useEffect(() => {
		if (data !== null) {
			/** Nest data by person */
			setNestedData(
				nest()
					.key(d => d.person)
					.entries(data)
					/** Map nested people into format
					 * {
					 *  @String name,
					 *  @Array cities,
					 *  @Array paths
					 * }
					 */
					.map(person => ({
						name: person.key,
						cities: person.values.map(row => ({
							name: row.city,
							dateString: row.dateString,
							date: row.date,
							lat: row.lat,
							lon: row.lon,
							notes: row.notes,
						})),
						paths: person.values
							/** Only create new path record if it's not the first
							 *  city, and the new city is different than the
							 *  prior city
							 */
							.filter((row, i, array) => {
								if (i === 0) return null
								else return row.city !== array[i - 1].city
							})
							/** Return null for first city (as there's no
							 *  originCity to calculate for the first record) */
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
							/** Remove the null record */
							.filter(row => row !== null),
					}))
			)
		}
	}, [data])

	return nestedData
}
