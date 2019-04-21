import { useState, useEffect } from "react"
import { nest } from "d3-collection"

export default data => {
	const [transformedData, setTransformedData] = useState(null)

	useEffect(() => {
		if (data !== null) {
			/** Nest data by person */
			const nestedPeople = nest()
				.key(d => d.person)
				/** convert rolled up data so lat and long are numbers */
				.rollup(lvs =>
					lvs.map(lv => ({
						...lv,
						lat: +lv.lat,
						lon: +lv.lon,
					}))
				)
				.entries(data)
				/** map nested output into format
				 * {
				 * 	@String name,
				 * 	@Array cities: {
				 *		@String name,
				 *		@String date,
				 *		@Number lat,
				 *		@Number lon,
				 *		@String notes
				 * 	},
				 * 	@Array paths: {
				 * 		@String originCity,
				 * 		@Number originLat,
				 * 		@Number originLon,
				 * 		@String destinationCity,
				 * 		@Number destinationLat,
				 * 		@Number destinationLon
				 * 	}
				 * }
				 */
				.map(person => ({
					name: person.key,
					cities: person.value.map(row => ({
						name: row.city,
						dateString: row.date,
						date: new Date(row.date),
						lat: row.lat,
						lon: row.lon,
						notes: row.notes,
					})),
					paths: person.value
						/** Only create new record if it's not the first
						 * city, and the new city is different than the
						 * prior city
						 */
						.filter((row, i, array) => {
							if (i === 0) return null
							else return row.city !== array[i - 1].city
						})
						/** Return null for the first city (as there's no
						 * originCity to calculate for first record) */
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

			console.log(nestedPeople)

			setTransformedData(nestedPeople)
		}
	}, [data])

	return transformedData
}
