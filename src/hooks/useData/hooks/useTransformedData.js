import { useState, useEffect } from "react"

export default ({ rawData, headerMap }) => {
	const [transformedData, setTransformedData] = useState(null)

	useEffect(() => {
		if (rawData !== null) {
			const data = rawData.map(row => {
				return Object.keys(row).reduce((acc, key) => {
					return headerMap[key]
						? {
								...acc,
								[headerMap[key]]: row[key],
						  }
						: {
								...acc,
								[key]: row[key],
						  }
				}, {})
			})

			data["columns"] = rawData["columns"].map(column =>
				headerMap[column] ? headerMap[column] : column
			)

			setTransformedData(data)
		}
	}, [rawData])

	return transformedData
}
