import React, { useState } from "react"
import {
	withStyles,
	Grid,
	List,
	ListItem,
	ListItemText,
	Typography,
} from "@material-ui/core"
import { useData } from "../../hooks"
import { Filter, DateFilter } from "../../components"

import { useTransformedData, useDateFilteredData, useNestedData } from "./hooks"
import LetterMap from "./components/letter-map/LetterMap"
import headerMap from "./config/headerMap.json"

/** STYLE */
const styles = theme => ({
	List: {
		height: 800,
		overflow: "auto",
	},
	ListItemText: {
		color: "#fff",
	},
	Typography: {
		color: "#fff",
	},
})

/** COMPONENT */
const Letters = props => {
	const { classes } = props

	/** Notes State */
	const [notes, setNotes] = useState(null)

	/** Get source data */
	const {
		data: sourceData,
		fields,
		selectFieldValue,
		clearFieldValues,
	} = useData({
		source: "./data/letters.csv",
		headerMap,
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

	const filters = [
		{ fieldName: "originCity", placeholder: "Origin City" },
		{ fieldName: "destinationCity", placeholder: "Destination City" },
		{ fieldName: "sender", placeholder: "Sender" },
		{ fieldName: "recipient", placeholder: "Recipient" },
	]

	/** Render */
	return (
		<div>
			<Grid container spacing={24}>
				{/* Filters */}
				<Grid item xs={12}>
					{/* Start Date */}
					<DateFilter
						label="Start Date"
						defaultValue="1600-01-01"
						setDate={setMinDate}
					/>

					{/* End Date */}
					<DateFilter
						label="End Date"
						defaultValue="1699-12-31"
						setDate={setMaxDate}
					/>

					{/* Fields */}
					{fields !== null
						? filters.map((filter, i) => (
								<Filter
									key={i}
									fields={fields}
									fieldName={filter.fieldName}
									placeholder={filter.placeholder}
									select={selectFieldValue}
									clear={clearFieldValues}
								/>
						  ))
						: null}
				</Grid>

				{/* Map */}
				<Grid item xs={9}>
					<LetterMap data={data} setNotes={setNotes} />
				</Grid>

				{/* Info */}
				<Grid item xs={3}>
					{notes !== null ? (
						<div>
							<Typography
								variant="h5"
								color="textPrimary"
								classes={{ colorTextPrimary: classes.Typography }}
							>
								{notes.path} ({notes.letterCount})
							</Typography>
							<List component="nav" className={classes.List}>
								{notes.letters.map((note, i) => (
									<ListItem key={i}>
										<ListItemText
											classes={{
												primary: classes.ListItemText,
												secondary: classes.ListItemText,
											}}
											style={{ whiteSpace: "pre-line" }}
											primary={`${note.dateString}\n${note.sender} -> ${
												note.recipient
											}`}
											secondary={
												note.notes.length ? `\nnotes: ${note.notes}` : ""
											}
										/>
									</ListItem>
								))}
							</List>
						</div>
					) : null}
				</Grid>
			</Grid>
		</div>
	)
}

export default withStyles(styles)(Letters)
