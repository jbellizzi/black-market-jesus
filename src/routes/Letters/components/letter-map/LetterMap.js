import React, { useState, useEffect, useRef } from "react"

import { extent } from "d3-array"
import { scaleLog } from "d3-scale"

import mapboxgl from "mapbox-gl"
import { bezierSpline } from "@turf/turf"

import "./LetterMap.scss"

mapboxgl.accessToken =
	"pk.eyJ1IjoiamJlbGxpenppIiwiYSI6ImNqb3Z6eHZreTFzZ3IzcHBia214M250cncifQ.562aUOGz7HteIUdtCdzDtA"

const Map = props => {
	const { data, setNotes } = props

	/** INITIALIZE */
	const mapEl = useRef(null)
	const [map, setMap] = useState(null)
	const [mapLoaded, setMapLoaded] = useState(false)

	useEffect(() => {
		if (mapEl !== null) {
			setTimeout(() => {
				const map = new mapboxgl.Map({
					container: "map",
					style: "mapbox://styles/jbellizzi/cjow0pxqu41im2rqya3q7zazt",
					center: [12, 48],
					zoom: 4.1,
				})

				setMap(map)

				map.on("load", () => setMapLoaded(true))
			})
		}
	}, [mapEl])

	/** INITIALIZE LAYERS */
	useEffect(() => {
		if (mapLoaded) {
			/** Source */
			map.addSource("line", {
				type: "geojson",
				lineMetrics: true,
				data: {
					type: "FeatureCollection",
					features: [],
				},
			})

			/** Layer */
			map.addLayer({
				id: "line",
				type: "line",
				source: "line",
				paint: {
					"line-width": ["get", "lineWidth"],
					"line-gradient": [
						"interpolate",
						["linear"],
						["line-progress"],
						0,
						"#e0f7fa",
						0.5,
						"#e0f7fa",
						1,
						"#0097a7",
					],
				},
				layout: {
					"line-join": "round",
					"line-cap": "round",
				},
			})

			/** Mouseenter */
			map.on("mouseenter", "line", e => {
				const props = e.features[0].properties

				const notes = {
					path: props.path,
					letterCount: props.letterCount,
					letters: JSON.parse(props.letters),
				}

				setNotes(notes)
			})
		}
	}, [mapLoaded])

	/** RENDER */
	useEffect(() => {
		if (mapLoaded && data !== null) {
			const letterCountScale = scaleLog()
				.domain(extent(data, row => row.letterCount))
				.range([1, 15])

			const lines = data
				.filter(
					row =>
						!isNaN(row.originLatitude) &&
						!isNaN(row.originLongitude) &&
						!isNaN(row.destinationLatitude) &&
						!isNaN(row.destinationLongitude)
				)
				.map(row =>
					bezierSpline({
						type: "Feature",
						properties: {
							lineWidth: letterCountScale(row.letterCount),
							path: row.path,
							letterCount: row.letterCount,
							letters: row.letters.map(letter => ({
								dateString: letter.dateString,
								sender: letter.sender,
								recipient: letter.recipient,
								notes: letter.notes,
							})),
						},
						geometry: {
							type: "LineString",
							coordinates: [
								[row.originLongitude, row.originLatitude],
								[
									row.originLongitude +
										(row.destinationLongitude - row.originLongitude) * (2 / 3),
									row.destinationLatitude +
										(row.originLatitude - row.destinationLatitude) * (2 / 3),
								],
								[row.destinationLongitude, row.destinationLatitude],
							],
						},
					})
				)

			const collection = {
				type: "FeatureCollection",
				features: lines,
			}

			map.getSource("line").setData(collection)
		}
	}, [mapLoaded, data])

	return <div id="map" ref={mapEl} />
}

export default Map
