import React, { useState, useEffect } from "react"
import { csv } from "d3-fetch"
import { min, max } from "d3-array"
import { from } from "rxjs"
import {
	map,
	toArray,
	switchMap,
	distinct,
	reduce,
	filter,
	tap
} from "rxjs/operators"

const DataWrapper = props => {
	// Get source from props
	const { source } = props

	/** Pull in raw data from csv */
	const [rawData, setRawData] = useState(undefined)
	// Run Once
	useEffect(() => {
		// Set csv data to rawData variable
		csv(source).then(data => {
			let transformedData = data.map(row => ({
				...row,
				["Start Date"]: +row["Start Date"],
				["End Date"]: +row["End Date"],
				["Origin Latitude"]: +row["Origin Latitude"],
				["Origin Longitude"]: +row["Origin Longitude"],
				["Destination Latitude"]: +row["Destination Latitude"],
				["Destination Longitude"]: +row["Destination Longitude"]
			}))

			transformedData["columns"] = data["columns"]
			setRawData(transformedData)
		})
	}, [])

	/** Fields */
	const [fields, setFields] = useState(undefined)
	// Run when rawData updates
	useEffect(() => {
		if (rawData !== undefined) {
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
								selected: false
							})),
							// get distinct value
							distinct(row => row.value),
							// convert to array
							toArray(),
							// create an entry for each field
							map(values => ({
								[column]: {
									selections: [],
									values
								}
							}))
						)
					),
					// combine into single object
					reduce(
						(acc, val) => ({
							...acc,
							[Object.keys(val)[0]]: val[Object.keys(val)[0]]
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
					selected: !row.selected
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
				values: newValues
			}
		})
	}

	/** Transform data */
	const [data, setData] = useState(undefined)
	useEffect(() => {
		if (rawData !== undefined && fields !== undefined) {
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

	/**
	 * Dates
	 */
	const [minDate, setMinDate] = useState(undefined)
	const [maxDate, setMaxDate] = useState(undefined)
	useEffect(() => {
		if (fields !== undefined) {
			setMinDate(min(fields["Start Date"].values, d => d.value))
			setMaxDate(max(fields["End Date"].values, d => d.value))
		}
	}, [fields])

	return <div>{props.children({ data, minDate, maxDate, fields, select })}</div>
}

export default DataWrapper
