import React, { useState } from "react"
import { BrowserRouter as Router, Route, withRouter } from "react-router-dom"
import AppRouter from "./routing/AppRouter"
// import Letters from "./routing/Letters"
import People from "./routing/People"
import "./App.scss"

const App = () => {
	const [selectedMinDate, setSelectedMinDate] = useState(undefined)
	const [selectedMaxDate, setSelectedMaxDate] = useState(undefined)

	const [page, setPage] = useState(0)

	return (
		<div className="App">
			<Router>
				<AppRouter />
			</Router>
		</div>
	)
}

export default App
