import React, { useEffect } from "react"
import { scaleTime } from "d3-scale"
import { Subject } from "rxjs"
import { distinctUntilChanged, throttleTime } from "rxjs/operators"
import $ from "jquery"
import slider from "jquery-ui/ui/widgets/slider"

import "./DateSlider.scss"

const DateSlider = props => {
	const { min, max, setSelectedMinDate, setSelectedMaxDate } = props

	/**
	 * Set dates
	 */
	useEffect(() => {
		if (min !== undefined && max !== undefined) {
			setSelectedMinDate(min)
			setSelectedMaxDate(max)

			const timeScale = scaleTime()
				.domain([new Date(1660, 0, 1), new Date(1699, 11)])
				.range([min, max])

			const sliderUpdate$ = new Subject()

			sliderUpdate$
				.pipe(
					throttleTime(50),
					distinctUntilChanged()
				)
				.subscribe(({ handleIndex, value }) => {
					if (handleIndex === 0) setSelectedMinDate(value)
					else setSelectedMaxDate(value)
				})

			$("#slider-range").slider({
				range: true,
				min,
				max,
				values: [min, max],
				slide: (event, ui) => {
					sliderUpdate$.next({ handleIndex: ui.handleIndex, value: ui.value })
				}
			})
		}
	}, [min, max])

	return (
		<div className="slider-container">
			<div id="slider-range" />
			<div className="slider-axis">
				<span className="slider-axis-value">1660</span>
				<span className="slider-axis-value last-value">1699</span>
			</div>
		</div>
	)
}

export default DateSlider
