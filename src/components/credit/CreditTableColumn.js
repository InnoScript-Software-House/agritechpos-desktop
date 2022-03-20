import numeral from "numeral";
import moment from "moment";
import React from "react";


export const CreditTableColumns = () => {

    const columns = [
        {
            name: <span>#</span>,
            selector: (row, index) => index + 1,
            width: '50px'
        },
        {
            name: <span> Invoice No </span>,
            selector: row => row.invoice_no,
            sortable: true
        },

        {
            name: <span> Invoice Date </span>,
            selector: row => moment(row.invoice.created_at).format('DD-MM-Y'),
            sortable: true
        },

        {
            name: <span> Total Amount </span>,
            selector: row => `${numeral(row.invoice.total_amount).format('0,0')} MMK`,
            sortable: true
        },

        {
            name: <span> Discount </span>,
            selector: row => `${numeral(row.invoice.discount).format('0,0')} MMK`,
            sortable: true
        },

        {
            name: <span> Credit Amount </span>,
            selector: row => `${numeral(row.invoice.credit_amount).format('0,0')} MMK`,
            sortable: true
        },

        {
            name: <span> Pay Amount </span>,
            selector: row => {
                const repayments = JSON.parse(row.repayment);
                const repaymentAmounts = repayments.map(value => value.pay_amount);
                const totalRepayment = repaymentAmounts.reduce((a,b) => a+b, 0);
                return (
                    <span> {`${numeral(totalRepayment).format('0,0')} MMK`} </span>
                )

            },
            sortable: true
        },

        {
            name: <span> Remaining Balance </span>,
            selector: row => {
                const repayments = JSON.parse(row.repayment);
                const repaymentAmounts = repayments.map(value => value.pay_amount);
                const totalRepayment = repaymentAmounts.reduce((a,b) => a+b, 0);
                const balance = totalRepayment + Number(row.invoice.discount);
                return(
                    <span> {`${numeral(row.invoice.total_amount- balance).format('0,0')} MMK`} </span>
                )
            },
            sortable: true
        },

        {
            name: <span> Repayment Times </span>,
            selector: row => `${JSON.parse(row.repayment).length} times`,
            sortable: true
        },

        {
            name: <span> Last Repayment Date </span>,
            selector: row => {
                const repayments = JSON.parse(row.repayment);
                const lastRepayment = repayments[repayments.length -1];
                
                return(
                    <span> {moment(lastRepayment.pay_date).format('DD-MM-Y')} </span>
                )
            },
            sortable: true
        },

    ];
    return columns;
}