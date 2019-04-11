export default ({ fields, setFields }) => {
	if (fields !== null) {
		return (field, selectValue) => {
			// for each field value..
			const newValues = fields[field].values.map(row => {
				// if this is the row that was selected..
				if (row.value === selectValue) {
					// swap the selected prop value
					return {
						value: row.value,
						selected: !row.selected,
					}
				}
				// else just return the row
				else {
					return row
				}
			})

			// set the field with new selections
			setFields({
				...fields,
				[field]: {
					selections: newValues
						.filter(row => row.selected)
						.map(row => row.value),
					values: newValues,
				},
			})
		}
	} else return () => {}
}
