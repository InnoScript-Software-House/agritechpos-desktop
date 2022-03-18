import React from "react";
import moment from 'moment';

export const invoiceColumns = (props) => {

    const columns =[
        {
            name: <span> # </span>,
            selector: (row, index) => index +1,
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
            selector: row => moment(row.created_at).format('DD,MM,YYYY'),
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
    ]

    return columns;
}