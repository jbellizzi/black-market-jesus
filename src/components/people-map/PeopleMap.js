import React, { useState, useEffect, useRef } from "react"
import mapboxgl from "mapbox-gl"
import { bezierSpline } from "@turf/turf"

import "./PeopleMap.scss"

mapboxgl.accessToken =
	"pk.eyJ1IjoiamJlbGxpenppIiwiYSI6ImNqb3Z6eHZreTFzZ3IzcHBia214M250cncifQ.562aUOGz7HteIUdtCdzDtA"

const Map = props => {
	const { data, personPaths } = props

	console.log(personPaths)

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
		}
	}, [mapLoaded])

	/** Points */
	useEffect(() => {
		if (data !== null && mapLoaded) {
			const features = data.map(row => ({
				type: "Feature",
				geometry: {
					type: "Point",
					coordinates: [row.lon, row.lat],
				},
				properties: {
					name: row.person,
					city: row.city,
				},
			}))

			const collection = {
				type: "FeatureCollection",
				features,
			}

			map.getSource("point").setData(collection)
		}
	}, [mapLoaded, data])

	/** Paths */
	useEffect(() => {
		if (mapLoaded && personPaths !== null) {
			const lines = personPaths.map(row =>
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
								row["originLon"] +
									(row["destinationLon"] - row["originLon"]) * (2 / 3),
								row["destinationLat"] +
									(row["originLat"] - row["destinationLat"]) * (2 / 3),
							],
							[row["destinationLon"], row["destinationLat"]],
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
	}, [mapLoaded, personPaths])

	return <div id="map" ref={mapEl} />
}

export default Map
