import React, { useState, useEffect } from "react"
import Data from "../components/Data/Data"
import { Grid } from "@material-ui/core"
import PeopleMap from "../components/people-map/PeopleMap"
import Filter from "../components/Filter/Filter"

const peopleHeaderMap = {
	PERSON: "person",
	Date: "date",
	"LOCATION 1": "city",
	Latitude: "lat",
	Longitude: "lon",
	NOTES: "notes",
}

const peopleDataMap = row => ({
	...row,
	lat: +row.lat,
	lon: +row.lon,
})

const People = props => {
	return (
		<Data
			source="./data/people_DavidBurnet.csv"
			headerMap={peopleHeaderMap}
			dataMap={peopleDataMap}
		>
			{({ data, fields, selectFieldValue }) => {
				const [personPaths, setPersonPaths] = useState(null)
				useEffect(() => {
					if (data !== null) {
						setPersonPaths(
							data
								.filter((row, i, array) => {
									if (i === 0) return true
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
								.filter(row => row !== null)
						)
					}
				}, [data])

				return (
					<div>
						<Grid container spacing={24}>
							<Grid item xs={12}>
								{fields !== null ? (
									<Filter
										fields={fields}
										fieldName="person"
										select={selectFieldValue}
									/>
								) : null}
							</Grid>
							<Grid item xs={10}>
								<PeopleMap data={data} personPaths={personPaths} />
							</Grid>
							<Grid item xs={2}>
								<div>info</div>
							</Grid>
						</Grid>
					</div>
				)
			}}
		</Data>
	)
}

export default People
