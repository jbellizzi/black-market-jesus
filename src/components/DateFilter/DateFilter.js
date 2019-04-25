import React from "react"
import { TextField, withStyles } from "@material-ui/core"

const styles = theme => ({
	root: {
		marginTop: theme.spacing.unit * 3,
		marginLeft: theme.spacing.unit * 3,
		display: "inline-block",
		verticalAlign: "top",
	},
	TextField: {
		width: 200,
	},
	TextFieldInput: {
		color: "#fff",
	},
})

const DateFilter = props => {
	const { classes, label, defaultValue, setDate } = props

	return (
		<div className={classes.root}>
			<form>
				<TextField
					id="date"
					label={label}
					type="date"
					defaultValue={defaultValue}
					className={classes.TextField}
					InputLabelProps={{
						shrink: true,
						className: classes.TextFieldInput,
					}}
					InputProps={{ className: classes.TextFieldInput }}
					onChange={event => {
						setDate(new Date(`${event.target.value} GMT-0500`))
					}}
				/>
			</form>
		</div>
	)
}

export default withStyles(styles)(DateFilter)
