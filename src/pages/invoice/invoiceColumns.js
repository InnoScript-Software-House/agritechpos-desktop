import React from 'react';
import moment from 'moment';
import numeral from 'numeral';

export const invoiceColumns = props => {
	const columns = [
		{
			name: <span> # </span>,
			selector: (row, index) => index + 1,
			sortable: true,
			width: '50px'
		},
		{
			name: <span> Invoid ID </span>,
			selector: row => row.invoice_no,
			sortable: true
		},
		{
			name: <span> Date </span>,
			selector: row => moment(row.created_at).format('DD-MM-YYY'),
			sortable: true
		},
		{
			name: <span> Customer Name </span>,
			selector: row => row.customer_name,
			sortable: true
		},
		{
			name: <span> Customer Phone </span>,
			selector: row => row.customer_phone,
			sortable: true
		},
		{
			name: <span> Customer email </span>,
			selector: row => row.customer_email,
			sortable: true
		},
		{
			name: <span> Customer Address </span>,
			selector: row => row.customer_address,
			sortable: true
		},
		// {
		//     name: <span> Credit Amount </span>,
		//     selector: row => `${numeral(row.credit_amount).format('0,0')} MMK`,
		//     sortable: true
		// },
		{
			name: <span> Total Amount </span>,
			selector: row => `${numeral(row.total_amount).format('0,0')} MMK`,
			sortable: true
		},
		// {
		//     name: <span> Pay Amount </span>,
		//     selector: row => `${numeral(row.pay_amount).format('0,0')} MMK`,
		//     sortable: true
		// },
		{
			name: <span> Discount </span>,
			selector: row => `${numeral(row.discount).format('0,0')} MMK`,
			sortable: true
		}
	];

	return columns;
};
