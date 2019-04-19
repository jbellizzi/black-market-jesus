import React, { useState } from "react"
import {
	withStyles,
	Grid,
	List,
	ListItem,
	ListItemText,
} from "@material-ui/core"
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

const styles = theme => ({
	ListItemText: {
		color: "#fff",
	},
	List: {
		height: 800,
		overflow: "auto",
	},
})

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

	const { classes } = props

	const [notes, setNotes] = useState([])

	console.log(notes)

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
					<PeopleMap data={data} setNotes={setNotes} />
				</Grid>
				<Grid item xs={2}>
					<List component="nav" className={classes.List}>
						{notes.map((note, i) => (
							<ListItem key={i}>
								<ListItemText
									classes={{
										primary: classes.ListItemText,
										secondary: classes.ListItemText,
									}}
									primary={note.name}
									secondary={note.city}
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
