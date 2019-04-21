import React, { useState, useEffect } from "react"
import {
	withStyles,
	FormControl,
	Select,
	Input,
	MenuItem,
	TextField,
	Button,
} from "@material-ui/core"

const styles = theme => ({
	root: {
		display: "inline-block",
	},
	formControl: {
		margin: theme.spacing.unit,
	},
	select: {
		color: "#fff",
	},
	textField: {
		marginLeft: theme.spacing.unit,
		marginRight: theme.spacing.unit,
		width: 200,
		outline: "none",
	},
	button: {
		margin: theme.spacing.unit,
		color: "#fff",
	},
})

const Filter = props => {
	const { classes, fields, fieldName, select, clear } = props

	const field = fields[fieldName]

	const [fieldValues, setFieldValues] = useState(field.values)
	const [searchQuery, setSearchQuery] = useState("")
	useEffect(() => {
		if (searchQuery === "") setFieldValues(field.values)
		else
			setFieldValues(
				field.values.filter(row => {
					return row.value.toUpperCase().indexOf(searchQuery.toUpperCase()) > -1
				})
			)
	}, [searchQuery])

	const [selectOpen, setSelectOpen] = useState(false)

	return (
		<div className={classes.root}>
			<FormControl className={classes.formControl}>
				<Select
					className={classes.select}
					multiple
					displayEmpty
					value={field.selections}
					onChange={event => {
						select(fieldName, event.nativeEvent.target.textContent)
					}}
					input={<Input id="select-multiple-placeholder" />}
					renderValue={selected => {
						if (selected.length === 0) {
							return <em>Person</em>
						}

						return selected.join(", ")
					}}
					open={selectOpen}
					onOpen={() => {
						setSelectOpen(true)
					}}
					onClose={() => {
						setSelectOpen(false)
						setSearchQuery("")
					}}
					// MenuProps={MenuProps}
				>
					{/* <MenuItem disabled value=""> */}
					<TextField
						placeholder="Search"
						className={classes.textField}
						onChange={event => {
							setSearchQuery(event.target.value)
						}}
					/>
					{/* </MenuItem> */}
					{fieldValues.map(value => (
						<MenuItem key={value.value} value={value.value}>
							{value.value}
						</MenuItem>
					))}
				</Select>
			</FormControl>
			<Button
				variant="outlined"
				size="small"
				className={classes.button}
				onClick={() => {
					clear(fieldName)
				}}
			>
				Clear
			</Button>
		</div>
	)
}

export default withStyles(styles)(Filter)
