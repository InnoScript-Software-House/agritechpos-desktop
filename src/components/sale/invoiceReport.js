import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getShop } from "../../services/shop.service";
import { setOpenToastAction } from "../../redux/actions/toast.action";
import moment from "moment";
import numeral from "numeral";
import { createInvoice, getLastInvoice } from "../../services/invoice.service";
import { useHistory } from "react-router-dom";
import { BsArrowLeftCircle } from 'react-icons/bs';
import { t } from "../../utilities/translation.utility";
import { printOptions } from "../../utilities/print.utility";

const tableHeader = ['No', t('materail-code'), t('name'), t('quantity'), t('price'), t('total')];

export const InvoiceReportPage = () => {

    const dispatch = useDispatch();
    const history = useHistory();
    const lang = useSelector(state => state.lang);

    const [shop, setShop] = useState(null);
    const [invoice, setInvoice] = useState(null);
    const [invoiceId, setInvoiceId] = useState('');
    const [display, setDisplay] = useState('');
    const [success, setSuccess] = useState(false);
    const [isPrint, setIsPrint] = useState(false);
    const [reload, setReload] = useState(false);
    const [customer, setCustomer] = useState(null);
    const [amounts, setAmounts] = useState(null);


    const saveInvoice = async () => {
        if (invoice) {
            const requestBody = {
                invoice_no: invoiceId,
                customer_name: customer ? customer.name : null,
                customer_phone: customer ? customer.phone : null,
                customer_address: customer ? customer.address : null,
                customer_email: customer ? customer.email : null,
                total_amount: invoice.totalAmount,
                pay_amount: invoice.payAmount,
                discount: invoice.discount,
                invoice_data: invoice.bought_items,
                credit_amount: invoice.creditAmount,
            }

            const response = await createInvoice(requestBody);

            if (response && response.success === false) {
                dispatch(setOpenToastAction('Invoice', response.message, 'danger'));
                return;
            }
            return;
        }

        return;
    }

    const print = async () => {
        const { print } = window.nativeApi;
        setIsPrint(true);
        setDisplay('display');

        const getPrintOptions = localStorage.getItem("PRINT_SETTING") ? JSON.parse(localStorage.getItem("PRINT_SETTING")) : printOptions;
        
        await saveInvoice();
        await print.invoice(getPrintOptions);
        await print.reload((data) => {
            setSuccess(true);
            setIsPrint(false);
            localStorage.removeItem('INVOICE');
            localStorage.removeItem('CURRENT_INVOICE');
            localStorage.removeItem('CUSTOMER');
        });
    }

    useEffect(async () => {
        const shopinfo = await getShop();

        if (shopinfo && shopinfo.success === false) {
            dispatch(setOpenToastAction('Shop', shopinfo.success, 'danger'));
            return;
        }

        setShop(shopinfo);

        const invoiceResponse = await getLastInvoice();
        if (invoiceResponse && invoiceResponse.success === false) {
            dispatch(setOpenToastAction('Invoice', invoiceResponse.success, 'danger'));
            return;
        }

        const lastInvoice = invoiceResponse ? invoiceResponse.invoice_no : 0;
        let ivId = Number(lastInvoice) + 1;

        let invoice_no = '';

        for (let x = ivId.toString().length; x < 6; x++) {
            invoice_no += '0';
        }

        invoice_no += ivId;

        setInvoiceId(invoice_no);

        const iData = JSON.parse(localStorage.getItem('INVOICE'));
        setInvoice(iData);

        const customerData = JSON.parse(localStorage.getItem('CUSTOMER'));
        setCustomer(customerData);

        const getAmounts = JSON.parse(localStorage.getItem('AMOUNTS'));
        setAmounts(getAmounts);
    }, []);

    return (
        <div className="container-fluid bg-clear">
            {success === false && (
                <>
                    <div className="row">
                        <div className="d-md-flex flex-md-row justify-content-start mt-3">
                            <BsArrowLeftCircle size={30} className={`btn-icon ${display}`} onClick={() => history.push('/sale')} />
                        </div>
                    </div>
                    <div className="row">
                        <h3> Inovice. {localStorage.getItem('PREFIX') ? localStorage.getItem('PREFIX') : 'AT'}{invoiceId}</h3>
                    </div>
                    <table className="table solid-border">
                        {shop && invoice && (
                            <>
                                <thead>
                                    <tr className="solid-border">
                                        <td colSpan={6} align='center'>
                                            <h4>{shop.name}</h4>
                                            <h5>{shop.description}</h5>
                                            <h6>{shop.address}</h6>
                                            <h6>phone : {shop.phone}</h6>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="solid-border" colSpan={3} align='justify'>
                                            To
                                                <h6> {t('name')}: {customer && customer.name} </h6>
                                                <h6> {t('phone')} : {customer && customer.phone} </h6>
                                                <h6> {t('address')} : {customer && customer.address} </h6>
                                        </td>
                                        <td className="solid-border" colSpan={3} align='right'>
                                            Date: <small>{moment().format('DD,MM,YYYY')} </small><br/>
                                            Invoice: <small>#{localStorage.getItem('PREFIX') ? localStorage.getItem('PREFIX') : 'AT'}{invoiceId}</small>
                                        </td>
                                    </tr>
                                    <tr>
                                        {tableHeader.map((thHeader, index) => {
                                            return (
                                                    <th key={`table_header_id_${index}`} className='solid-border'> <small> {thHeader} </small> </th>
                                                    )
                                        })}
                                    </tr>
                                </thead>
                                <tbody>
                                        {invoice.length > 0 && invoice.map((value, index) => {
                                            return (
                                                <tr className="solid-border" key={`item_id_${index}`}>
                                                    <td className='solid-border'><small>{index +1}</small></td>
                                                    <td className='solid-border'> <small> {value.code} </small> </td>
                                                    <td className='solid-border'> <small> {value.name} </small> </td>
                                                    <td className='solid-border'> <small> {value.requestQty} </small> </td>
                                                    <td className='solid-border'> <small> {numeral(value.sell_price).format('0,0')} MMK </small> </td>
                                                    <td className='solid-border'> <small> {numeral(value.totalAmount).format('0,0')} MMK </small> </td>
                                                </tr>
                                            )
                                        })}
                                        {
                                            amounts && (
                                                <>
                                                <tr>
                                                    <td colSpan={4} className='no-border'></td>
                                                    <td className="solid-border"> <h6> {t('total-amount')} </h6> </td>
                                                    <td className="solid-border"> <h6> {numeral(amounts.total_amount).format('0,0')} MMK </h6> </td>
                                                </tr>
                                                <tr>
                                                    <td colSpan={4} className='no-border'></td>
                                                    <td className="solid-border"> <h6> TAX(15%) </h6> </td>
                                                    <td className="solid-border"> <h6> {numeral(amounts.tax).format('0,0')} MMK </h6> </td>
                                                </tr>
                                                <tr>
                                                    <td colSpan={4} className='no-border'></td>
                                                    <td className="solid-border"> <h6> {t('actural-amount')} </h6> </td>
                                                    <td className="solid-border"> <h6> {numeral(amounts.actual_amount).format('0,0')} MMK </h6> </td>
                                                </tr>
                                                <tr>
                                                    <td colSpan={4} className='no-border'></td>
                                                    <td className="solid-border"> <h6> {t('grand-amount')} </h6> </td>
                                                    <td className="solid-border"> <h6> {numeral(amounts.grand_amount).format('0,0')} MMK </h6> </td>
                                                </tr>
                                                <tr>
                                                    <td colSpan={4} className='no-border'></td>
                                                    <td className="solid-border"> <h6> {t('discount')} </h6> </td>
                                                    <td className="solid-border"> <h6> {numeral(amounts.discount).format('0,0')} MMK </h6> </td>
                                                </tr>   
                                                <tr>
                                                    <td colSpan={4} className='no-border'></td>
                                                    <td className="solid-border"> <h6> {t('pay-amount')} </h6> </td>
                                                    <td className="solid-border"> <h6> {numeral(amounts.pay_amount).format('0,0')} MMK </h6> </td>
                                                </tr>
                                                <tr>
                                                    <td colSpan={4} className='no-border'></td>
                                                    <td className="solid-border"> <h6> {t('changes')} </h6> </td>
                                                    <td className="solid-border"> <h6> {numeral(amounts.changes).format('0,0')} MMK </h6> </td>
                                                </tr>
                                                <tr>
                                                    <td colSpan={4} className='no-border'></td>
                                                    <td className="solid-border"> <h6> {t('credit-amount')} </h6> </td>
                                                    <td className="solid-border"> <h6> {numeral(amounts.credit_amount).format('0,0')} MMK </h6> </td>
                                                </tr>
                                                </>

                                            )
                                        }
                                </tbody>        
                            </>             
                        )}
                    </table>{
                        !isPrint && (
                        <div className="d-flex flex-row justify-content-end me-5 pe-5">
                            <Button className={`btn btn-print mt-3 w-25 ${display}`} onClick={() => print()}> {t('print')} </Button>
                        </div> 
                        )
                    }
                </>
            )}

            {success && (
                <div className="row">
                    <div className="d-flex flex-column justify-content-center align-items-center hv-100">
                        <h1 className="thank-you"> Thank You </h1>
                        <Button onClick={() => history.push('/sale')}> {t('go-back')} </Button>
                    </div>
                </div>
            )}
        </div>
    )
}