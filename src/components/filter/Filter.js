import React, { useState, useEffect } from "react"
import classNames from "classnames"
import { fromEvent } from "rxjs"
import { filter, tap } from "rxjs/operators"
import "./Filter.scss"

const Filter = props => {
	const { label, fieldName, field, select } = props

	/**
	 * Dropdown State
	 */
	const [showSelectionBox, setShowSelectionBox] = useState(false)
	const [filterNode, setFilterNode] = useState(undefined)
	useEffect(() => {
		if (filterNode !== undefined) {
			fromEvent(document, "click")
				.pipe(
					filter(evt => !filterNode.contains(evt.target)),
					tap(() => {
						setShowSelectionBox(false)
						filterNode.querySelector(".input-container input").value = ""
						setSearchInput("")
					})
				)
				.subscribe()
		}
	}, [filterNode])

	/**
	 * Search
	 */
	const [visibleFieldValues, setVisibleFieldValues] = useState(field.values)
	const [searchInput, setSearchInput] = useState("")
	useEffect(() => {
		setVisibleFieldValues(
			field.values.filter(fieldRow => {
				return (
					searchInput.length === 0 ||
					fieldRow.value.toUpperCase().indexOf(searchInput.toUpperCase()) > -1
				)
			})
		)
	}, [searchInput, field.values])

	/**
	 * Select Field Value
	 */
	const selectFieldValue = value => {
		select(fieldName, value)
	}

	/**
	 * JSX
	 */
	return (
		<div ref={setFilterNode} className="filter">
			<span className="label">{label}</span>
			<div
				className="input-container"
				onClick={() => setShowSelectionBox(true)}
			>
				<input
					type="text"
					placeholder="Search"
					onInput={evt => setSearchInput(evt.target.value)}
				/>
				<span className="clear hidden">x</span>
			</div>

			{showSelectionBox ? (
				<ul className="unordered-list">
					{visibleFieldValues.map(fieldRow => (
						<li
							key={fieldRow.value}
							className={classNames({
								selected: fieldRow.selected,
								excluded: !fieldRow.selected && field.selections.length > 0
							})}
							onClick={() => selectFieldValue(fieldRow.value)}
						>
							{fieldRow.value}
						</li>
					))}
				</ul>
			) : null}
		</div>
	)
}

export default Filter
