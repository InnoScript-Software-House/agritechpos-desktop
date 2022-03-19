import React from "react";


export const CreditTableColumns = (props) => {

    const columns = [
        {
            name: <span>#</span>,
            selector: (row, index) => index + 1,
            width: '50px'
        },
        {
            name: <span>Credit ID</span>,
            selector: row => row.id,
            sortable: true
        },
        {
            name: <span>Invoice ID</span>,
            selector: row => row.invoice_no,
            sortable: true
        },
        {
            name: <span>Customer Name</span>,
            selector: row => row.customer_name,
            sortable: true
        },
        {
            name: <span>Credit Amount</span>,
            selector: row => row.amount,
            sortable: true
        },
        {
            name: <span>Repayment</span>,
            selector: row => row.repayment,
            sortable: true
        },
        {
            name: <span>Amount Left</span>,
            selector: row => row.amount_left,
            sortable: true
        },
    ];
    return columns;
}