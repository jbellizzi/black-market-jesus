import React, { useState, useEffect, useRef } from "react"
import mapboxgl from "mapbox-gl"
import { bezierSpline } from "@turf/turf"

import "./PeopleMap.css"

mapboxgl.accessToken = "pk.eyJ1IjoiamJlbGxpenppIiwiYSI6ImNqb3Z6eHZreTFzZ3IzcHBia214M250cncifQ.562aUOGz7HteIUdtCdzDtA"

const Map = props => {
	const { data, setNotes } = props

	/**
	 * Initialize
	 */
	const mapEl = useRef(null)
	const [map, setMap] = useState(undefined)
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
			}, 1000)
		}
	}, [mapEl])

	/**
	 * INITIALIZE LAYERS
	 */
	useEffect(() => {
		if (mapLoaded) {
			/** Point Source */
			map.addSource("point", {
				type: "geojson",
				data: {
					type: "FeatureCollection",
					features: [],
				},
			})

			/** Point Layer */
			map.addLayer({
				id: "point",
				source: "point",
				type: "circle",
				paint: {
					"circle-radius": 4,
					"circle-color": "#D6F0FF",
				},
			})

			/** Path Source */
			map.addSource("line", {
				type: "geojson",
				lineMetrics: true,
				data: {
					type: "FeatureCollection",
					features: [],
				},
			})

			/** Path Layer */
			map.addLayer({
				id: "line",
				type: "line",
				source: "line",
				paint: {
					"line-width": ["get", "lineWidth"],
					"line-gradient": ["interpolate", ["linear"], ["line-progress"], 0, "#e0f7fa", 0.5, "#e0f7fa", 1, "#0097a7"],
				},
				layout: {
					"line-join": "round",
					"line-cap": "round",
				},
			})

			map.on("mouseenter", "point", e => {
				setNotes(e.features.map(feature => feature.properties))
			})
		}
	}, [mapLoaded])

	/** Set Data */
	useEffect(() => {
		if (data !== null && mapLoaded) {
			/** Points */
			const features = data
				.map(person =>
					person.cities.map(city => ({
						type: "Feature",
						geometry: {
							type: "Point",
							coordinates: [city.lon, city.lat],
						},
						properties: {
							name: person.name,
							date: city.dateString,
							city: city.name,
							notes: city.notes,
						},
					}))
				)
				.flat()

			const pointCollection = {
				type: "FeatureCollection",
				features,
			}

			map.getSource("point").setData(pointCollection)

			/** Paths */
			const lines = data
				.filter(person => person.paths.length)
				.map(person =>
					person.paths.map(row =>
						bezierSpline({
							type: "Feature",
							properties: {
								lineWidth: 2,
							},
							geometry: {
								type: "LineString",
								coordinates: [
									[row["originLon"], row["originLat"]],
									[
										row["originLon"] + (row["destinationLon"] - row["originLon"]) * (2 / 3),
										row["destinationLat"] + (row["originLat"] - row["destinationLat"]) * (2 / 3),
									],
									[row["destinationLon"], row["destinationLat"]],
								],
							},
						})
					)
				)
				.flat()

			const lineCollection = {
				type: "FeatureCollection",
				features: lines,
			}

			map.getSource("line").setData(lineCollection)
		}
	}, [mapLoaded, data])

	return <div id="map" ref={mapEl} />
}

export default Map
