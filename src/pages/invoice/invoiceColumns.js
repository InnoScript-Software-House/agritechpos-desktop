import React from "react";


export const invoiceColumns = (props) => {

    const columns =[
        {
            name: <span> # </span>,
            selector: (row, index) => index +1,
            sortable: true
        },
        {
            name: <span> Invoid ID </span>,
            selector: row => row.invoice_id,
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
        {
            name: <span> Item Eng Name </span>,
            selector: row => row.customer_address,
            sortable: true
        },
        {
            name: <span> Customer Address </span>,
            selector: row => row.customer_address,
            sortable: true
        },
        {
            name: <span> Customer Address </span>,
            selector: row => row.customer_address,
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