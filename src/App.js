import React, { useState, useEffect } from "react"
import { csv } from "d3-fetch"
import { nest } from "d3-collection"
import { from } from "rxjs"
import { map, toArray, distinct, tap } from "rxjs/operators"
import Data from "./components/data/Data"
import LettersTable from "./components/letters-table/LettersTable"
import Filter from "./components/filter/Filter"
import "./App.scss"

const App = () => {
	return (
		<div className="App">
			{/* Get data and fields */}
			<Data source="./data/letters.csv">
				{/* render props function */}
				{({ data, fields, select }) => {
					// console.log(fields)
					// console.log(data)

					return (
						<div>
							<div className="section">
								<div className="date-slider">Slider Graph</div>
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
							{/* <button onClick={() => select("Origin City", "Edinburgh")}>
								select
							</button> */}
							{/* <Filter data={data} field="Origin City" setFilter={setFilter} /> */}
							{/* <LettersTable data={data} /> */}
						</div>
					)
				}}
			</Data>
			{/* <div className="container table-container">
				{letterCount !== undefined ? (
					<table>
						<tbody>
							{letterCount.map((row, i) => (
								<tr key={i}>
									<td>{row.key}</td>
									<td>{row.value}</td>
								</tr>
							))}
						</tbody>
					</table>
				) : null}
			</div> */}
			{/* {data !== undefined ? (
				<div className="container">
					<Filter
						dataSource={data}
						fieldName="Origin City"
						setState={setOriginCityFilter}
					/>
					<Filter
						dataSource={data}
						fieldName="Sender"
						setState={setSenderFilter}
					/>
				</div>
			) : null} */}
		</div>
	)
}

export default App
