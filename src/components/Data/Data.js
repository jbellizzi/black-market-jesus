import React from "react"
import {
	extractRawData,
	transformRawData,
	getFields,
	filterData,
} from "./effects"
import { selectFieldValueFunc } from "./services"

export default ({ source, headerMap, dataMap, children }) => {
	const rawData = extractRawData(source)

	const transformedData = transformRawData({ rawData, headerMap, dataMap })

	const { fields, setFields } = getFields({ transformedData })

	const selectFieldValue = selectFieldValueFunc({ fields, setFields })

	const filteredData = filterData({ transformedData, fields })

	return <div>{children({ data: filteredData, fields, selectFieldValue })}</div>
}
