import React from "react"
import DataWrapper from "./components/data-wrapper/DataWrapper"
import Filter from "./components/filter/Filter"
import Map from "./components/map/Map"
import "./App.scss"

const App = () => {
	return (
		<div className="App">
			{/* Get data and fields */}
			<DataWrapper source="./data/letters.csv">
				{/* render props function */}
				{({ data, fields, select }) => {
					console.log(data)
					return (
						<div>
							{/* Top Section */}
							<div className="section">
								{/* Date */}
								<div className="date-slider">Slider Graph</div>

								{/* Filters */}
								{fields !== undefined ? (
									<div className="filters">
										<Filter
											placeholder="All"
											label="Origin City"
											fieldName="Origin City"
											field={fields["Origin City"]}
											select={select}
										/>
									</div>
								) : null}
							</div>

							{/* Bottom Section */}
							<div className="section">
								{/* Map */}
								<Map data={data} />
							</div>
						</div>
					)
				}}
			</DataWrapper>
		</div>
	)
}

export default App
