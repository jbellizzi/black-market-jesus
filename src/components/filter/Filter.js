import React from "react"
import {
	withStyles,
	FormControl,
	Select,
	Input,
	MenuItem,
} from "@material-ui/core"

const styles = {
	formControl: {
		margin: 12,
	},
	select: {
		color: "#fff",
	},
}

const Filter = props => {
	const { classes, fields, fieldName, select } = props

	return (
		<FormControl className={classes.formControl}>
			<Select
				className={classes.select}
				// multiple
				displayEmpty
				value={fields[fieldName].selections}
				onChange={event => {
					select(fieldName, event.target.value)
				}}
				input={<Input id="select-multiple-placeholder" />}
				renderValue={selected => {
					if (selected.length === 0) {
						return <em>Person</em>
					}

					return selected.join(", ")
				}}
				// MenuProps={MenuProps}
			>
				<MenuItem disabled value="">
					<em>Select Person</em>
				</MenuItem>
				{fields[fieldName].values.map(value => (
					<MenuItem key={value.value} value={value.value}>
						{value.value}
					</MenuItem>
				))}
			</Select>
		</FormControl>
	)
}

export default withStyles(styles)(Filter)
