import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { getShop } from "../../services/shop.service";
import { setOpenToastAction } from "../../redux/actions/toast.action";
import moment from "moment";
import numeral from "numeral";
import { createInvoice, getInvoice } from "../../services/invoice.service";
import { useHistory } from "react-router-dom";
import { BsArrowLeftCircle } from 'react-icons/bs';
import { getCustomerList } from "../../services/customer.service";
 
export const InvoiceReportPage = () => {

    const dispatch = useDispatch();
    const history = useHistory();

    const [shop, setShop] = useState(null);
    const [invoice, setInvoice] = useState(null);
    const [invoiceId, setInvoiceId] = useState('');
    const [display, setDisplay] = useState('');
    const [customerId, setCustomerId] = useState(0);

    const saveInvoice = async () => {
        if(invoice) {
            const requestBody = {
                invoice_no: invoiceId,
                customer_name: invoice.customer.name !== '' ? invoice.customer.name : null,
                customer_phone: invoice.customer.phone !== '' ? invoice.customer.phone : null,
                customer_address: invoice.customer.address !== '' ? invoice.customer.address : null,
                customer_email : invoice.customer.email !== '' ? invoice.customer.email: null,
                total_amount: invoice.totalAmount,
                pay_amount: invoice.payAmount,
                discount: invoice.discount,
                invoice_data: invoice.bought_items,
                cash_back: 0,
            }

            const response = await createInvoice(requestBody);

            if(response && response.success === false) {
                dispatch(setOpenToastAction('Invoice', response.message, 'danger'));
                return;
            }

            localStorage.removeItem('INVOICE');
            history.push('/sale');
        }
    }

    const print = () => {
        console.log(invoiceId,invoice.payAmount,customerId,invoice.discount, invoice.bought_items,customerId)
        const { print } = window.nativeApi;

        setDisplay('display');
        print.invoice();
        print.reload((data) => {
            if(data === true) {
                saveInvoice();
                history.push('/sale');
            }
        });
    }

    useEffect(async () => {
        const shopinfo = await getShop();

        if(shopinfo && shopinfo.success === false) {
            dispatch(setOpenToastAction('Shop', shopinfo.success, 'danger'));
            return;
        }

        setShop(shopinfo);

        const iData = JSON.parse(localStorage.getItem('INVOICE'));
        setInvoice(iData);

        const invoiceResponse = await getInvoice();

        if(invoiceResponse && invoiceResponse.success === false) {
            dispatch(setOpenToastAction('Invoice', invoiceResponse.success, 'danger'));
            return;
        }
        console.log(invoiceResponse);

        const lastInvoice = invoiceResponse.length > 0  ? invoiceResponse[invoiceResponse.length - 1] : 0;
        let ivId = 1;

        if(lastInvoice.invoice_no) {
            ivId = Number(lastInvoice.invoice_no) + 1;
        } 
        
        let invoice_no = '';

        for(let x=ivId.toString().length; x<6; x++) {
            invoice_no += '0';
        }

        invoice_no += ivId;

        setInvoiceId(invoice_no);

        const getcustomer = await getCustomerList();
        if(getcustomer && getcustomer.success === false) {
            dispatch(setOpenToastAction('Invoice', getcustomer.message, 'danger'));
            return;
        }
        let custId = getcustomer.length + 1;
        console.log(getcustomer)
        setCustomerId(custId);
        saveInvoice();

    },[]);

    return (
        <div className="container-fluid bg-clear">
            <div className="row">
                <div className="d-md-flex flex-md-row justify-content-start mt-3">
                <BsArrowLeftCircle size={30} className={`btn-icon ${display}`} onClick={() => history.push('/sale')} />
                </div>
            </div>

            <div className="row">
                { shop && invoice && (
                    <>
                        <div className="col-md-12 d-md-flex flex-md-row justify-content-between align-items-center mt-3 line mb-3">
                            <div className="ps-3">
                                <h3> {shop.name} - {shop.description} </h3>
                                <p> {shop.address} </p>
                            </div>

                            <div className="d-md-flex flex-md-column pe-3">
                                <span> Phone - {shop.phone} </span>
                                <span> Email - {shop.email} </span>
                            </div>
                        </div>

                        <div className="col-md-12 mt-3 ps-3">
                            <div className="d-md-flex flex-row justify-content-between align-items-center mb-3">
                                <div className="invoice-info">
                                    <h2> INVOICE - AT{invoiceId} </h2>
                                    <span> Date - {moment().format('Y-MM-DD')} </span>
                                </div>

                                <div className="customer-info">
                                    <div className="pe-3">
                                        <h4> Customer Name : {invoice.customer && invoice.customer.name} </h4>
                                        <h4> Phone Number : {invoice.customer && invoice.customer.phone} </h4>
                                        <h4> Address : {invoice.customer && invoice.customer.address} </h4>
                                    </div>
                                </div>
                            </div>


                            <table className="table mb-3 pb-3">
                                <thead>
                                    <tr>
                                        <th> Material Code </th>
                                        <th> Name </th>
                                        <th> Model </th>
                                        <th> Qty </th>
                                        <th> Price </th>
                                        <th> Total </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {invoice.bought_items.length > 0 && invoice.bought_items.map((value, index) => {
                                        return(
                                            <tr key={`item_id_${index}`}>
                                                <td> {value.code} </td>
                                                <td> {value.name} </td>
                                                <td> {value.model} </td>
                                                <td> {value.requestQty} </td>
                                                <td> {numeral(( ((Number(value.price) * Number(value.percentage)) / 100) + Number(value.price))).format('0,0')} MMK </td>
                                                <td> {numeral(((((Number(value.price) * Number(value.percentage)) / 100) + Number(value.price)) * Number(value.requestQty))).format('0,0')} MMK </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>

                            <div className="d-md-flex flex-md-row justify-content-between align-items-center mt-3 pt-3">
                                {invoice.isaid ? (<div className="">
                                    <img className="paid-img align-self-end" src="build/assets/images/paid.png" />
                                </div>) : (<></>)}
                                <div className="d-md-flex flex-md-center justify-content-end">
                                </div>
                                <table>
                                    <thead>
                                        <tr>
                                            <td className="w-200"> <h4> TOTAL </h4> </td>
                                            <td className="w-200"> <h4> {numeral(invoice.totalAmount).format('0,0')} MMK </h4></td>
                                        </tr>
                                        <tr>
                                            <td className="w-200"> <h4> DISCOUNT </h4> </td>
                                            <td className="w-200"> <h4> {numeral(invoice.discount).format('0,0')} MMK </h4></td>
                                        </tr>
                                        <tr>
                                            <td className="w-200"> <h4> Pay AMOUNT </h4> </td>
                                            <td className="w-200"> <h4> {numeral(invoice.payAmount).format('0,0')} MMK </h4></td>
                                        </tr>
                                        <tr>
                                            <td className="w-200"> <h4> CREDIT AMOUNT </h4> </td>
                                            <td className="w-200"> <h4> {numeral(invoice.creditAmount).format('0,0')} MMK </h4></td>
                                        </tr>
                                        <tr>
                                            <td className="w-200"> <h4> NET AMOUNT </h4> </td>
                                            <td className="w-200"> <h4> {numeral(invoice.netAmount).format('0,0')} MMK </h4></td>
                                        </tr>

                                        <tr>
                                            <td colSpan={2}> 
                                                <Button className={`btn btn-print-full mt-3 ${display}`} onClick={() => print()}> Print </Button>
                                            </td>
                                        </tr>
                                    </thead>
                                </table>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}