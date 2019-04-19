import React from "react"
import { Grid } from "@material-ui/core"
import { useData } from "../../hooks"
import PeopleMap from "./components/people-map/PeopleMap"
import Filter from "../../components/Filter/Filter"
import { useTransformedData } from "./hooks"

const peopleHeaderMap = {
	PERSON: "person",
	Date: "date",
	"LOCATION 1": "city",
	Latitude: "lat",
	Longitude: "lon",
	NOTES: "notes",
}

const People = props => {
	const {
		data: sourceData,
		fields,
		selectFieldValue,
		clearFieldValues,
	} = useData({
		source: "./data/people.csv",
		headerMap: peopleHeaderMap,
	})

	const data = useTransformedData(sourceData)

	return (
		<div>
			<Grid container spacing={24}>
				<Grid item xs={12}>
					{fields !== null ? (
						<Filter
							fields={fields}
							fieldName="person"
							select={selectFieldValue}
							clear={clearFieldValues}
						/>
					) : null}
				</Grid>
				<Grid item xs={10}>
					<PeopleMap data={data} />
				</Grid>
				<Grid item xs={2}>
					<div>info</div>
				</Grid>
			</Grid>
		</div>
	)
}

export default People
