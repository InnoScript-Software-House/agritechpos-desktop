import React from 'react';
import { Badge } from 'react-bootstrap';
import { BsArrowUpRightSquare, BsTrash } from "react-icons/bs";
import { useDispatch } from 'react-redux';
import { setOpenDelModal } from '../../redux/actions/openDelModal.action';

export const accountColumns = (edit) => {

    const dispatch = useDispatch();

    return [
        {
            name: <span className='datatable-header'>#</span>,
            selector: (row, index) => index + 1,
            sortable: true,
            width: "50px"
        },
        {
            name: <span className="datatable-header"> Account Name </span>,
            selector: row => row.name,
            sortable: true
        },
        {
            name: <span className="datatable-header"> Phone </span>,
            selector: row => row.phone,
        },
        {
            name: <span className="datatable-header"> Email </span>,
            selector: row => row.email,
        },

        {
            name: <span className="datatable-header"> Status </span>,
            selector: row => {
                return(
                    <Badge bg={row.active ? 'success' : 'danger'}> {row.active ? 'Active' : 'Block'} </Badge>
                )
            },
        },
        {
            name: <span className="datatable-header"> Option </span>,
            selector: row => {
                return(
                    <div className='d-flex flex-row'>
                        <BsArrowUpRightSquare size={20} className="btn-icon" onClick={() => edit(row)} />
                        <BsTrash size={20} className="btn-icon ms-3" onClick={() => dispatch(setOpenDelModal({
                                open: true,
                                title: 'Delete Record',
                                message: 'Are you sure to delete record',
                                id: row.id,
                                type: 'auth'
                            }))}
                        />
                    </div>
                )
            }
        }
    ]
}