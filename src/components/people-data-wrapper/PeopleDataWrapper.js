import React, { useState, useEffect } from "react"
import { csv } from "d3-fetch"
import { from } from "rxjs"
import {
	switchMap,
	map,
	toArray,
	reduce,
	distinct,
	filter,
} from "rxjs/operators"

export default props => {
	// Get Source
	const { source } = props

	/** Pull in raw data */
	const [rawData, setRawData] = useState(null)

	/** MOUNT */
	useEffect(() => {
		// Set csv data to rawData
		csv(source).then(data => {
			let transformedData = data.map(row => ({
				person: row["person"],
				date: row["date"],
				city: row["city"],
				lat: +row["lat"],
				lon: +row["lon"],
			}))

			transformedData["columns"] = data["columns"]
			setRawData(transformedData)
		})
	}, [])

	/** Fields */
	const [fields, setFields] = useState(null)
	// Run when rawData updates
	useEffect(() => {
		if (rawData !== null) {
			// for each rawData column..
			from(rawData.columns)
				.pipe(
					// switchMap to rawData
					switchMap(column =>
						// for each rawData row..
						from(rawData).pipe(
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
						(acc, val) => ({
							...acc,
							[Object.keys(val)[0]]: val[Object.keys(val)[0]],
						}),
						{}
					)
				)
				.subscribe(setFields)
		}
	}, [rawData])

	/** Select function */
	const select = (field, selectValue) => {
		// for each field value..
		const newValues = fields[field].values.map(row => {
			// if this is the row that was selected..
			if (row.value === selectValue) {
				// swap the selected value
				return {
					value: row.value,
					selected: !row.selected,
				}
			}
			// else, just return the row
			else {
				return row
			}
		})

		// set field with new selections
		setFields({
			...fields,
			[field]: {
				selections: newValues.filter(row => row.selected).map(row => row.value),
				values: newValues,
			},
		})
	}

	/** Transform data */
	const [data, setData] = useState(null)
	useEffect(() => {
		if (rawData !== null && fields !== null) {
			// for each data row
			from(rawData)
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
								// swap available to false
								available = false
								break
							}
						}

						return available
					}),
					// convert to array
					toArray()
				)
				.subscribe(setData)
		}
	}, [rawData, fields])

	return <div>{props.children({ data, fields, select })}</div>
}
