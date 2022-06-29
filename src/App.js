import React, { useState } from "react"
import { BrowserRouter as Router, Route, withRouter } from "react-router-dom"
import AppRouter from "./routes/AppRouter"
import "./App.css"

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
