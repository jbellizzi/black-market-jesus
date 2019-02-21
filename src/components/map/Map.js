import React, { useState, useEffect } from "react"

import { extent } from "d3-array"
import { scaleLog } from "d3-scale"
import { nest } from "d3-collection"

import mapboxgl from "mapbox-gl"
import { bezierSpline } from "@turf/turf"

import "./Map.scss"

mapboxgl.accessToken =
	"pk.eyJ1IjoiamJlbGxpenppIiwiYSI6ImNqb3Z6eHZreTFzZ3IzcHBia214M250cncifQ.562aUOGz7HteIUdtCdzDtA"

const Map = props => {
	const { data } = props

	/**
	 * Initialize
	 */
	const [map, setMap] = useState(undefined)
	const [mapLoaded, setMapLoaded] = useState(false)
	useEffect(() => {
		const map = new mapboxgl.Map({
			container: "map",
			style: "mapbox://styles/jbellizzi/cjow0pxqu41im2rqya3q7zazt",
			center: [12, 48],
			zoom: 4.1
		})

		setMap(map)

		map.on("load", () => setMapLoaded(true))
	}, [])

	/**
	 * Initialize Layers
	 */
	useEffect(() => {
		if (mapLoaded) {
			/** Source */
			map.addSource("line", {
				type: "geojson",
				lineMetrics: true,
				data: {
					type: "FeatureCollection",
					features: []
				}
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
						"#0097a7"
					]
				},
				layout: {
					"line-join": "round",
					"line-cap": "round"
				}
			})

			/** Popup */
			map.on("mouseenter", "line", e => {})
		}
	}, [mapLoaded])

	/**
	 * Paths
	 */
	const [letterPathData, setLetterPathData] = useState(undefined)
	useEffect(() => {
		if (data !== undefined) {
			setLetterPathData(
				nest()
					.key(d => d.Path)
					.rollup(leaves => ({
						...leaves[0],
						letters: leaves.length
					}))
					.entries(
						data.map(row => ({
							Path: `${row["Origin City"]}|${row["Destination City"]}`,
							"Origin City": row["Origin City"],
							"Destination City": row["Destination City"],
							"Origin Latitude": +row["Origin Latitude"],
							"Origin Longitude": +row["Origin Longitude"],
							"Destination Latitude": +row["Destination Latitude"],
							"Destination Longitude": +row["Destination Longitude"]
						}))
					)
					.map(d => ({
						key: d.key,
						...d.value
					}))
			)
		}
	}, [data])

	/**
	 * Render Lines
	 */
	useEffect(() => {
		if (mapLoaded && letterPathData !== undefined) {
			const letterPathScale = scaleLog()
				.domain(extent(letterPathData, row => row.letters))
				.range([1, 15])

			const lines = letterPathData
				.filter(
					row =>
						!isNaN(row["Origin Latitude"]) &&
						!isNaN(row["Origin Longitude"]) &&
						!isNaN(row["Destination Latitude"]) &&
						!isNaN(row["Destination Longitude"])
				)
				.map(row =>
					bezierSpline({
						type: "Feature",
						properties: {
							lineWidth: letterPathScale(row.letters),
							path: row["Path"],
							letters: row.letters
						},
						geometry: {
							type: "LineString",
							coordinates: [
								[row["Origin Longitude"], row["Origin Latitude"]],
								[
									row["Origin Longitude"] +
										(row["Destination Longitude"] - row["Origin Longitude"]) *
											(2 / 3),
									row["Destination Latitude"] +
										(row["Origin Latitude"] - row["Destination Latitude"]) *
											(2 / 3)
								],
								[row["Destination Longitude"], row["Destination Latitude"]]
							]
						}
					})
				)

			const collection = {
				type: "FeatureCollection",
				features: lines
			}

			map.getSource("line").setData(collection)
		}
	}, [mapLoaded, letterPathData])

	return <div id="map" />
}

export default Map
