import React from 'react';
import { BsArrowUpRightSquare } from "react-icons/bs";
import { useHistory } from 'react-router-dom';

export const categoryColumns = () => {
    const history = useHistory();

    return [
        {
            name: <span className='datatable-header'>#</span>,
            selector: (row, index) => index + 1,
            sortable: true,
            width: "50px"
        },
        {
            name: <span className="datatable-header"> Category Name </span>,
            selector: row => row.name,
            sortable: true
        },
        {
            name: <span className="datatable-header"> Description </span>,
            selector: row => row.description,
        },
        {
            name: <span className="datatable-header"> Option </span>,
            selector: (row) => {
                return(
                    <BsArrowUpRightSquare 
                        size={20} 
                        className="icon-btn-outline"
                        onClick={() => history.push(`/category/${row.id}`)}
                    />
               )
            },
            sortable: true,
        }
    ]
}