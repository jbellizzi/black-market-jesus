import React, { useState, useEffect, useRef } from "react"
import mapboxgl from "mapbox-gl"

import "./PeopleMap.scss"

mapboxgl.accessToken =
	"pk.eyJ1IjoiamJlbGxpenppIiwiYSI6ImNqb3Z6eHZreTFzZ3IzcHBia214M250cncifQ.562aUOGz7HteIUdtCdzDtA"

const Map = props => {
	const { data } = props

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
			/** Source */
			map.addSource("point", {
				type: "geojson",
				data: {
					type: "FeatureCollection",
					features: [],
				},
			})

			map.addLayer({
				id: "point",
				source: "point",
				type: "circle",
				paint: {
					"circle-radius": 4,
					"circle-color": "#D6F0FF",
				},
			})
		}
	}, [mapLoaded])

	/** Points */
	useEffect(() => {
		console.log(data)
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

	return <div id="map" ref={mapEl} />
}

export default Map
