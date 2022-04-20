import numeral from 'numeral';
import React from 'react';
import {BsArrowUpRightSquare} from 'react-icons/bs';
import {useHistory} from 'react-router-dom';
import {t} from 'i18next';

export const customerColumns = props => {
	const history = useHistory();

	const columns = [
		{
			name: <span className="datatable-header">#</span>,
			selector: (row, index) => index + 1,
			sortable: true,
			width: '50px'
		},
		{
			name: <span className="database-header">{t('name')}</span>,
			selector: row => row.name,
			sortable: true
		},
		{
			name: <span className="database-header"> {t('email')} </span>,
			selector: row => row.email,
			sortable: true
		},
		{
			name: <span className="database-header"> {t('phone')} </span>,
			selector: row => row.phone,
			sortable: true
		},
		{
			name: <span className="database-header"> {t('address')} </span>,
			selector: row => row.address,
			sortable: true
		},
		{
			name: <span className="database-header"> {t('credit')} </span>,
			selector: row => row.credit_amount,
			sortable: true
		},
		{
			name: <span className="database-header"> {t('paid-count')} </span>,
			selector: row => {
				console.log(row);
			},
			sortable: true
		},
		{
			name: <span className="database-header"> {t('total-amount')} </span>,
			selector: row => numeral(row.total_amount).format('0,0') + ' MMK',
			sortable: true,
			width: '175px'
		}
		// {
		//   name: <span className='database-header'>Option</span>,
		//   selector: (row) => {
		//     return (
		//       <>
		//         <BsArrowUpRightSquare
		//         size={20}
		//         className="icon-btn-outline"
		//         onClick={() => history.push(`/editcustomer/${row.id}`)}/>
		//       </>
		//     )
		//   }
		// }
	];
	return columns;
};
