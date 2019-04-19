import { useState, useEffect } from "react"
import { csv } from "d3-fetch"

export default source => {
	const [rawData, setRawData] = useState(null)

	useEffect(() => {
		csv(source).then(setRawData)
	}, [])

	return rawData
}
