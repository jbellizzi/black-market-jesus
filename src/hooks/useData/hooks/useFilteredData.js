import { useState, useEffect } from "react"
import { from } from "rxjs"
import { filter, toArray } from "rxjs/operators"

export default ({ transformedData, fields }) => {
	const [filteredData, setFilteredData] = useState(null)

	useEffect(() => {
		if (transformedData !== null && fields !== null) {
			// for each data row
			from(transformedData)
				.pipe(
					// filter anything de-selected
					filter(row => {
						// get all the keys in the row
						const keys = Object.keys(row)
						let available = true

						// for each key..
						for (var i = 0; i < keys.length; i++) {
							// if the row's column is de-selected..
							if (
								fields[keys[i]].selections.length &&
								fields[keys[i]].selections.indexOf(row[keys[i]]) === -1
							) {
								// make not available
								available = false
								break
							}
						}

						return available
					}),
					// convert to array
					toArray()
				)
				.subscribe(setFilteredData)
		}
	}, [transformedData, fields])

	return filteredData
}
