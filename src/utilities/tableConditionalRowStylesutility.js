export const ItemConditionalRowStyles = [
	{
		when: row => row.qty === 0,
		style: row => ({
			backgroundColor: row.qty === 0 ? 'red' : '',
			color: row.qty === 0 ? 'white' : 'black'
		})
	},
	{
		when: row => row.percentage === 0 || row.percentage < 0,
		style: row => ({
			backgroundColor: row.percentage === 0 || row.percentage < 0 ? 'red' : '',
			color: row.percentage === 0 || row.percentage < 0 ? 'white' : 'black'
		})
	}
];

export const CategoryConditionalRowStyles = [
	{
		when: row => row.name === null,
		style: row => ({
			backgroundColor: row.name === null ? 'red' : '',
			color: row.name === null ? 'white' : 'black'
		})
	},
	{
		when: row => row.description === null,
		style: row => ({
			backgroundColor: row.description === null ? 'red' : '',
			color: row.description === null ? 'white' : 'black', 
		})
	}
]