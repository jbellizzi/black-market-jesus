import React, { useState } from "react"
import DataWrapper from "./components/data-wrapper/DataWrapper"
import DateSlider from "./components/date-slider/DateSlider.js"
import Filter from "./components/filter/Filter"
import Map from "./components/map/Map"
import "./App.scss"

const App = () => {
	const [selectedMinDate, setSelectedMinDate] = useState(undefined)
	const [selectedMaxDate, setSelectedMaxDate] = useState(undefined)

	return (
		<div className="App">
			{/* Get data and fields */}
			<DataWrapper source="./data/letters.csv">
				{/* render props function */}
				{({ data, minDate, maxDate, fields, select }) => {
					console.log(data)
					return (
						<div>
							{/* Top Section */}
							<div className="section">
								{/* Date */}
								<div className="date-slider">
									<DateSlider
										min={minDate}
										max={maxDate}
										setSelectedMinDate={setSelectedMinDate}
										setSelectedMaxDate={setSelectedMaxDate}
									/>
								</div>

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
										<Filter
											placeholder="All"
											label="Destination City"
											fieldName="Destination City"
											field={fields["Destination City"]}
											select={select}
										/>
										<Filter
											placeholder="All"
											label="Sender"
											fieldName="Sender"
											field={fields["Sender"]}
											select={select}
										/>
										<Filter
											placeholder="All"
											label="Recipient"
											fieldName="Recipient"
											field={fields["Recipient"]}
											select={select}
										/>
									</div>
								) : null}
							</div>

							{/* Bottom Section */}
							<div className="section">
								{/* Map */}
								<Map
									data={data}
									minDate={selectedMinDate}
									maxDate={selectedMaxDate}
								/>
							</div>
						</div>
					)
				}}
			</DataWrapper>
		</div>
	)
}

export default App
