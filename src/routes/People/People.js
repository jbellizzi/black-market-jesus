import React, { useState } from "react"
import {
	withStyles,
	Grid,
	List,
	ListItem,
	ListItemText,
} from "@material-ui/core"

import { useData } from "../../hooks"
import { Filter, DateFilter } from "../../components"

import PeopleMap from "./components/people-map/PeopleMap"
import { useTransformedData, useDateFilteredData, useNestedData } from "./hooks"
import peopleHeaderMap from "./config/headerMap.json"

/** STYLE */
const styles = theme => ({
	ListItemText: {
		color: "#fff",
	},
	List: {
		height: 800,
		overflow: "auto",
	},
})

/** COMPONENT */
const People = props => {
	const { classes } = props

	/** Notes State */
	const [notes, setNotes] = useState([])

	/** Get source data */
	const {
		data: sourceData,
		fields,
		selectFieldValue,
		clearFieldValues,
	} = useData({
		source: "./data/people.csv",
		headerMap: peopleHeaderMap,
	})

	/** Transform Data */
	const transformedData = useTransformedData(sourceData)

	/** Date Filter Data */
	const {
		data: dateFilteredData,
		setMinDate,
		setMaxDate,
	} = useDateFilteredData(transformedData)

	/** Nest Data */
	const data = useNestedData(dateFilteredData)

	return (
		<div>
			<Grid container spacing={24}>
				{/* Filters */}
				<Grid item xs={12}>
					{/* Person */}
					{fields !== null ? (
						<Filter
							fields={fields}
							fieldName="person"
							select={selectFieldValue}
							clear={clearFieldValues}
						/>
					) : null}

					{/* Start Date */}
					<DateFilter
						label="Start Date"
						defaultValue="1660-01-01"
						setDate={setMinDate}
					/>

					{/* End Date */}
					<DateFilter
						label="End Date"
						defaultValue="1699-12-31"
						setDate={setMaxDate}
					/>
				</Grid>

				{/* Map */}
				<Grid item xs={9}>
					<PeopleMap data={data} setNotes={setNotes} />
				</Grid>

				{/* Notes */}
				<Grid item xs={3}>
					<List component="nav" className={classes.List}>
						{notes.map((note, i) => (
							<ListItem key={i}>
								<ListItemText
									classes={{
										primary: classes.ListItemText,
										secondary: classes.ListItemText,
									}}
									style={{ whiteSpace: "pre-line" }}
									primary={`${note.name} (${note.date})`}
									secondary={`${note.city} ${
										note.notes.length ? `\nnotes: ${note.notes}` : ""
									}`}
								/>
							</ListItem>
						))}
					</List>
				</Grid>
			</Grid>
		</div>
	)
}

export default withStyles(styles)(People)
