import React from "react"
import { TextField, withStyles } from "@material-ui/core"

const styles = theme => ({
	root: {
		display: "inline-block",
		marginLeft: theme.spacing.unit * 4,
	},
	TextField: {
		marginLeft: theme.spacing.unit,
		marginRight: theme.spacing.unit,
		width: 200,
	},
	TextFieldInput: {
		color: "#fff",
	},
})

const DateFilter = props => {
	const { classes, label, defaultValue } = props

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
					onChange={event => console.log(event.target.value)}
				/>
			</form>
		</div>
	)
}

export default withStyles(styles)(DateFilter)
