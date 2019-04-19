import { useState, useEffect } from "react"
import { from } from "rxjs"
import { switchMap, map, distinct, toArray, reduce } from "rxjs/operators"

export default data => {
	const [fields, setFields] = useState(null)

	useEffect(() => {
		if (data !== null) {
			// for each data column..
			from(data.columns)
				.pipe(
					// switchMap to data rows
					switchMap(column =>
						// for each data row..
						from(data).pipe(
							// map all values in a column
							map(row => ({
								value: row[column],
								selected: false,
							})),
							// get distinct value
							distinct(row => row.value),
							// convert to array
							toArray(),
							// create an entry for each field
							map(values => ({
								[column]: {
									selections: [],
									values,
								},
							}))
						)
					),
					// combine into single object
					reduce(
						(acc, field) => ({
							...acc,
							[Object.keys(field)[0]]: field[Object.keys(field)[0]],
						}),
						{}
					)
				)
				.subscribe(setFields)
		}
	}, [data])

	return { fields, setFields }
}
