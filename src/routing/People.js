import React from "react"
import Data from "../components/Data/Data"
import {
	Grid,
	FormControl,
	Select,
	Input,
	MenuItem,
	withStyles,
} from "@material-ui/core"
import PeopleMap from "../components/people-map/PeopleMap"
import Filter from "../components/filter/Filter"

const peopleHeaderMap = {
	PERSON: "person",
	Date: "date",
	"LOCATION 1": "city",
	Latitude: "lat",
	Longitude: "lon",
}

const peopleDataMap = row => ({
	...row,
	lat: +row.lat,
	lon: +row.lon,
})

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250,
		},
	},
}

const styles = {
	select: {
		color: "#fff",
	},
}

const People = props => {
	const { classes } = props
	return (
		<Data
			source="./data/people.csv"
			headerMap={peopleHeaderMap}
			dataMap={peopleDataMap}
		>
			{({ data, fields, selectFieldValue }) => {
				return (
					<div>
						<Grid container spacing={24}>
							<Grid item xs={12}>
								{fields !== null ? (
									<FormControl>
										<Select
											className={classes.select}
											multiple
											displayEmpty
											value={fields.person.selections}
											onChange={event => {
												selectFieldValue("person", event.target.value[0])
											}}
											input={<Input id="select-multiple-placeholder" />}
											renderValue={selected => {
												if (selected.length === 0) {
													return <em>Person</em>
												}

												return selected.join(", ")
											}}
											MenuProps={MenuProps}
										>
											<MenuItem disabled value="">
												<em>Select Person</em>
											</MenuItem>
											{fields.person.values.map(value => (
												<MenuItem key={value.value} value={value.value}>
													{value.value}
												</MenuItem>
											))}
										</Select>
									</FormControl>
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
			}}
		</Data>
	)
}

export default withStyles(styles)(People)
