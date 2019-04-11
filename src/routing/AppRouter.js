import React, { useState } from "react"
import { Route, Link, withRouter } from "react-router-dom"
// import Letters from "./Letters"
import People from "./People"
import { AppBar, Tabs, Tab } from "@material-ui/core"

function Letters() {
	return <h2>Letters</h2>
}

// function People() {
// 	return <h2>People</h2>
// }

const AppRouter = props => {
	const {
		location: { pathname },
	} = props

	const pathnameMap = {
		"/": 0,
		"/people": 1,
	}

	const [page, setPage] = useState(pathnameMap[pathname])

	return (
		<div>
			<AppBar position="static">
				<Tabs
					value={page}
					variant="fullWidth"
					onChange={(change, value) => setPage(value)}
				>
					<Tab label="Letters" component={Link} to="/" />
					<Tab label="People" component={Link} to="/people" />
				</Tabs>
			</AppBar>

			{/* <Route path="/" exact component={Letters} /> */}
			<Route path="/people" component={People} />
		</div>
	)
}

export default withRouter(AppRouter)
