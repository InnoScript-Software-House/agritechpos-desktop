import React from 'react'
import { BsArrowUpRightSquare } from 'react-icons/bs';
import { useHistory } from 'react-router-dom';

export const customerColumns = (props) => {

  const history = useHistory()
  
  const columns = [
    {
      name: <span className='datatable-header'>#</span>,
      selector: (row, index) => index + 1,
      sortable: true,
      width: '50px'
    },
    {
      name: <span className='database-header'>Name</span>,
      selector: row => row.customer_name,
      sortable: true,
    },
    {
      name: <span className='database-header'>Email</span>,
      selector: row => row.customer_email,
      sortable: true,
    },
    {
      name: <span className='database-header'>Phone Number</span>,
      selector: row => row.customer_phone,
      sortable: true,
    },
    {
      name: <span className='database-header'>Credit</span>,
      selector: row => row.credit_amount,
      sortable: true,
    },
    {
      name: <span className='database-header'>Paid Count</span>,
      selector: row => {
        let getcredit = row.credit;
        let repayment = JSON.parse(getcredit.repayment);
        return repayment.length;
      },
      sortable: true,
    },
    {
      name: <span className='database-header'>Total Amount</span>,
      selector: row => row.total_amount,
      sortable: true,
      width: '175px'
    },
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
}
