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
      selector: row => row.name,
      sortable: true,
      width: '200px'
    },
    {
      name: <span className='database-header'>Email</span>,
      selector: row => row.email,
      sortable: true,
      width: '200px'
    },
    {
      name: <span className='database-header'>Phone Number</span>,
      selector: row => row.phone,
      sortable: true,
      width: '200px'
    },
    {
      name: <span className='database-header'>Option</span>,
      selector: (row) => {
        return (
          <>
            <BsArrowUpRightSquare 
            size={20}
            className="icon-btn-outline"
            onClick={() => history.push(`/editcustomer/${row.id}`)}/>
          </>
        )
      }
    }
  ];
  return columns;
}
