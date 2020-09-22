import React, { useState } from "react"
import { Route, Link, withRouter } from "react-router-dom"
import People from "./People/People"
import Letters from "./Letters/Letters"
import About from "./About/About"
import { withStyles, AppBar, Tabs, Tab } from "@material-ui/core"

const styles = theme => {
	// const tabColor = theme.palette.primary[900]
	const tabColor = "#3c5f7b"

	return {
		Tabs: {
			backgroundColor: tabColor,
			color: theme.palette.getContrastText(tabColor),
		},
	}
}

const AppRouter = props => {
	const {
		location: { pathname },
		classes,
	} = props

	const pathnameMap = {
		"/": 0,
		"/letters": 1,
	}

	const [page, setPage] = useState(pathnameMap[pathname])

	return (
		<div>
			<AppBar position="static">
				<Tabs
					className={classes.Tabs}
					value={page}
					variant="fullWidth"
					indicatorColor="primary"
					onChange={(change, value) => setPage(value)}
				>
					<Tab label="People" component={Link} to="/" />
					<Tab label="Letters" component={Link} to="/letters" />
					<Tab label="About" component={Link} to="/about" />
				</Tabs>
			</AppBar>

			<Route path="/" exact component={People} />
			<Route path="/letters" component={Letters} />
			<Route path="/about" component={About} />
		</div>
	)
}

export default withRouter(withStyles(styles)(AppRouter))
