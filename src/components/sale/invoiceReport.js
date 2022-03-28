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
import { zawgyi, t } from "../../utilities/translation.utility";

const tableHeader = [t('item-code'), t('item-name'), t('item-model'), t('item-qty'), t('item-price'), t('item-total')];

export const InvoiceReportPage = () => {

    const dispatch = useDispatch();
    const history = useHistory();
    const lang = useSelector(state => state.lang);

    const [shop, setShop] = useState(null);
    const [invoice, setInvoice] = useState(null);
    const [invoiceId, setInvoiceId] = useState('');
    const [display, setDisplay] = useState('');
    const [success, setSuccess] = useState(false);


    const saveInvoice = async () => {
        if (invoice) {
            const requestBody = {
                invoice_no: invoiceId,
                customer_name: invoice.customer ? invoice.customer.name : null,
                customer_phone: invoice.customer ? invoice.customer.phone : null,
                customer_address: invoice.customer ? invoice.customer.address : null,
                customer_email: invoice.customer ? invoice.customer.email : null,
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

        setDisplay('display');

        await saveInvoice();
        await print.invoice();
        await print.reload((data) => {
            setSuccess(true);
            localStorage.removeItem('INVOICE');
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
                        {shop && invoice && (
                            <>
                                <div className="col-md-12 d-md-flex flex-md-row justify-content-between align-items-center mt-3 line mb-3">
                                    <div className="ps-3">
                                        <h4 className={`${zawgyi(lang)}`}> {shop.name} - {shop.description} </h4>
                                        <p className={`${zawgyi(lang)}`}> {shop.address} </p>
                                    </div>

                                    <div className="d-flex flex-column mt-3 pe-3">
                                        <span className={`${zawgyi(lang)}`}> <small> {t('shop-phone')} - {shop.phone} </small> </span>
                                        <span className={`${zawgyi(lang)}`}> <small> {t('shop-email')} - {shop.email} </small> </span>
                                    </div>
                                </div>

                                <div className="col-md-12 mt-3 ps-3">
                                    <div className="d-md-flex flex-row justify-content-between align-items-center mb-3">
                                        <div className="invoice-info">
                                            <h4 className={`${zawgyi(lang)}`}> {t('invoice')} - AT{invoiceId} </h4>
                                            <small className={`${zawgyi(lang)}`}> {t('invoice-date')} - {moment().format('Y-MM-DD')} </small>
                                        </div>

                                        <div className="customer-info">
                                            <div className="mt-3 pe-3">
                                                <h6 className={`${zawgyi(lang)}`}> {t('customer-name')}: {invoice.customer && invoice.customer.name} </h6>
                                                <h6 className={`${zawgyi(lang)}`}> {t('customer-phone')} : {invoice.customer && invoice.customer.phone} </h6>
                                                <h6 className={`${zawgyi(lang)}`}> {t('customer-address')} : {invoice.customer && invoice.customer.address} </h6>
                                            </div>
                                        </div>
                                    </div>


                                    <table className="table mb-3 pb-3">
                                        <thead>
                                            <tr>
                                                {tableHeader.map((thHeader, index) => {
                                                    return (
                                                        <th key={`table_header_id_${index}`} className={`${zawgyi(lang)}`}> <small> {thHeader} </small> </th>
                                                    )
                                                })}
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {invoice.bought_items.length > 0 && invoice.bought_items.map((value, index) => {
                                                return (
                                                    <tr key={`item_id_${index}`}>
                                                        <td className={`${zawgyi(lang)}`}> <small> {value.code} </small> </td>
                                                        <td className={`${zawgyi(lang)}`}> <small> {value.name} </small> </td>
                                                        <td className={`${zawgyi(lang)}`}> <small> {value.model} </small> </td>
                                                        <td className={`${zawgyi(lang)}`}> <small> {value.requestQty} </small> </td>
                                                        <td className={`${zawgyi(lang)}`}> <small> {numeral(value.sell_price).format('0,0')} MMK </small> </td>
                                                        <td className={`${zawgyi(lang)}`}> <small> {numeral(value.totalAmount).format('0,0')} MMK </small> </td>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </table>

                                    <div className="d-md-flex flex-md-row justify-content-between align-items-center mt-3 pt-3">
                                        <div className="">
                                            {invoice && invoice.creditAmount === 0 && (
                                                <img className="paid-img align-self-end" src="build/assets/images/paid.png" />
                                            )}
                                        </div>
                                        <div className="d-md-flex flex-md-center justify-content-end">
                                        </div>
                                        <table>
                                            <thead>
                                                <tr>
                                                    <td className="w-200"> <h6 className={`${zawgyi(lang)}`}> {t('invoice-total')} </h6> </td>
                                                    <td className="w-200"> <h6> {numeral(invoice.totalAmount).format('0,0')} MMK </h6> </td>
                                                </tr>
                                                <tr>
                                                    <td className="w-200"> <h6 className={`${zawgyi(lang)}`}> {t('invoice-discount')} </h6> </td>
                                                    <td className="w-200"> <h6> {numeral(invoice.discount).format('0,0')} MMK </h6> </td>
                                                </tr>
                                                <tr>
                                                    <td className="w-200"> <h6 className={`${zawgyi(lang)}`}> {t('invoice-pay-amount')} </h6> </td>
                                                    <td className="w-200"> <h6> {numeral(invoice.payAmount).format('0,0')} MMK </h6> </td>
                                                </tr>
                                                <tr>
                                                    <td className="w-200"> <h6 className={`${zawgyi(lang)}`}> {t('invoice-credit-amount')} </h6> </td>
                                                    <td className="w-200"> <h6> {numeral(invoice.creditAmount).format('0,0')} MMK </h6> </td>
                                                </tr>
                                                <tr>
                                                    <td className="w-200"> <h6 className={`${zawgyi(lang)}`}> {t('invoice-net-amount')} </h6> </td>
                                                    <td className="w-200"> <h6> {numeral(invoice.netAmount).format('0,0')} MMK </h6> </td>
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
                </>
            )}

            {success && (
                <div className="row">
                    <div className="d-flex flex-column justify-content-center align-items-center hv-100">
                        <h1 className="thank-you"> Thank You </h1>
                        <Button onClick={() => history.push('/sale')}> GO BACK </Button>
                    </div>
                </div>
            )}
        </div>
    )
}