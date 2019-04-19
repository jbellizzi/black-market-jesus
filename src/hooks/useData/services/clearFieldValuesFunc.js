export default ({ fields, setFields }) => {
	if (fields !== null) {
		return field => {
			// for each field value, return false selected
			const newValues = fields[field].values.map(row => ({
				value: row.value,
				selected: false,
			}))

			// set the field with cleared selections
			setFields({
				...fields,
				[field]: {
					selections: [],
					values: newValues,
				},
			})
		}
	} else return () => {}
}
