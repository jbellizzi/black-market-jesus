import {
	useRawData,
	useTransformedData,
	useFields,
	useFilteredData,
} from "./hooks"
import { selectFieldValueFunc, clearFieldValuesFunc } from "./services"

export default ({ source, headerMap }) => {
	const rawData = useRawData(source)
	const transformedData = useTransformedData({ rawData, headerMap })
	const { fields, setFields } = useFields(transformedData)
	const selectFieldValue = selectFieldValueFunc({ fields, setFields })
	const clearFieldValues = clearFieldValuesFunc({ fields, setFields })
	const filteredData = useFilteredData({ transformedData, fields })

	return { data: filteredData, fields, selectFieldValue, clearFieldValues }
}
