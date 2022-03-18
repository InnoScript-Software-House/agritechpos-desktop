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
        if(invoice) {
            const requestBody = {
                invoice_no: invoiceId,
<<<<<<< HEAD
                customer_name: invoice.customer ? invoice.customer.name : null,
                customer_phone: invoice.customer ? invoice.customer.phone : null,
                customer_address: invoice.customer ? invoice.customer.address : null,
                customer_email : invoice.customer ? invoice.customer.email : null,
=======
                customer_name: invoice.customer.name !== '' ? invoice.customer.name : null,
                customer_phone: invoice.customer.phone !== '' ? invoice.customer.phone : null,
                customer_address: invoice.customer.address !== '' ? invoice.customer.address : null,
                customer_email : invoice.customer.email !== '' ? invoice.customer.email: null,
>>>>>>> 173506ef8ea2e42dc34171d17fdb431982307a02
                total_amount: invoice.totalAmount,
                pay_amount: invoice.payAmount,
                discount: invoice.discount,
                invoice_data: invoice.bought_items,
                credit_amount: invoice.creditAmount,
            }

            const response = await createInvoice(requestBody);

            if(response && response.success === false) {
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
        
        await print.invoice();
        await print.reload();

        saveInvoice();
        setSuccess(true);
        localStorage.removeItem('INVOICE');

    }

    useEffect(async () => {
        const shopinfo = await getShop();

        if(shopinfo && shopinfo.success === false) {
            dispatch(setOpenToastAction('Shop', shopinfo.success, 'danger'));
            return;
        }

        setShop(shopinfo); 

        const invoiceResponse = await getLastInvoice();
        if(invoiceResponse && invoiceResponse.success === false) {
            dispatch(setOpenToastAction('Invoice', invoiceResponse.success, 'danger'));
            return;
        }
        console.log(invoiceResponse);

        const lastInvoice = invoiceResponse ? invoiceResponse.invoice_no : 0;
        let ivId = Number(lastInvoice) + 1;

<<<<<<< HEAD
        let invoice_id = '';
=======
        if(lastInvoice.invoice_no) {
            ivId = Number(lastInvoice.invoice_no) + 1;
        } 
        
        let invoice_no = '';
>>>>>>> 173506ef8ea2e42dc34171d17fdb431982307a02

        for(let x=ivId.toString().length; x<6; x++) {
            invoice_no += '0';
        }

        invoice_no += ivId;

        setInvoiceId(invoice_no);

        const iData = JSON.parse(localStorage.getItem('INVOICE'));
        setInvoice(iData);
    },[]);

    return (
        <div className="container-fluid bg-clear">
            { success === false && (
                <>
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
                                        <h4 className={`${zawgyi(lang)}`}> {shop.name} - {shop.description} </h4>
                                        <p className={`${zawgyi(lang)}`}> {shop.address} </p>
                                    </div>

                                    <div className="d-flex flex-column mt-3 pe-3">
                                        <span className={`${zawgyi(lang)}`}> {t('shop-phone')} - {shop.phone} </span>
                                        <span className={`${zawgyi(lang)}`}> {t('shop-email')} - {shop.email} </span>
                                    </div>
                                </div>

                                <div className="col-md-12 mt-3 ps-3">
                                    <div className="d-md-flex flex-row justify-content-between align-items-center mb-3">
                                        <div className="invoice-info">
                                            <h4 className={`${zawgyi(lang)}`}> {t('invoice')} - AT{invoiceId} </h4>
                                            <span className={`${zawgyi(lang)}`}> {t('invoice-date')} - {moment().format('Y-MM-DD')} </span>
                                        </div>

                                        <div className="customer-info">
                                            <div className="mt-3 pe-3">
                                                <h4 className={`${zawgyi(lang)}`}> {t('customer-name')}: {invoice.customer && invoice.customer.name} </h4>
                                                <h4 className={`${zawgyi(lang)}`}> {t('customer-phone')} : {invoice.customer && invoice.customer.phone} </h4>
                                                <h4 className={`${zawgyi(lang)}`}> {t('customer-address')} : {invoice.customer && invoice.customer.address} </h4>
                                            </div>
                                        </div>
                                    </div>


                                    <table className="table mb-3 pb-3">
                                        <thead>
                                            <tr>
                                                {tableHeader.map((thHeader, index) => {
                                                    return (
                                                        <th key={`table_header_id_${index}`} className={`${zawgyi(lang)}`}> {thHeader} </th>
                                                    )
                                                })}
                                            </tr>
<<<<<<< HEAD
                                        </thead>

                                        <tbody>
                                            {invoice.bought_items.length > 0 && invoice.bought_items.map((value, index) => {

                                                return(
                                                    <tr key={`item_id_${index}`}>
                                                        <td className={`${zawgyi(lang)}`}> {value.code} </td>
                                                        <td className={`${zawgyi(lang)}`}> {value.name} </td>
                                                        <td className={`${zawgyi(lang)}`}> {value.model} </td>
                                                        <td className={`${zawgyi(lang)}`}> {value.requestQty} </td>
                                                        <td className={`${zawgyi(lang)}`}> {numeral(value.sell_price).format('0,0')} MMK </td>
                                                        <td className={`${zawgyi(lang)}`}> {numeral(value.totalAmount).format('0,0')} MMK </td>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </table>

                                    <div className="d-md-flex flex-md-row justify-content-between align-items-center mt-3 pt-3">
                                        <div className="">
                                            { invoice && invoice.creditAmount === 0 && (
                                                <img className="paid-img align-self-end" src="build/assets/images/paid.png" />
                                            )}
                                        </div>
                                        <div className="d-md-flex flex-md-center justify-content-end">
                                        </div>
                                        <table>
                                            <thead>
                                                <tr>
                                                    <td className="w-200"> <h5 className={`${zawgyi(lang)}`}> {t('invoice-total')} </h5> </td>
                                                    <td className="w-200"> <h5> {numeral(invoice.totalAmount).format('0,0')} MMK </h5> </td>
                                                </tr>
                                                <tr>
                                                    <td className="w-200"> <h5 className={`${zawgyi(lang)}`}> {t('invoice-discount')} </h5> </td>
                                                    <td className="w-200"> <h5> {numeral(invoice.discount).format('0,0')} MMK </h5> </td>
                                                </tr>
                                                <tr>
                                                    <td className="w-200"> <h5 className={`${zawgyi(lang)}`}> {t('invoice-pay-amount')} </h5> </td>
                                                    <td className="w-200"> <h5> {numeral(invoice.payAmount).format('0,0')} MMK </h5> </td>
                                                </tr>
                                                <tr>
                                                    <td className="w-200"> <h5 className={`${zawgyi(lang)}`}> {t('invoice-credit-amount')} </h5> </td>
                                                    <td className="w-200"> <h5> {numeral(invoice.creditAmount).format('0,0')} MMK </h5> </td>
                                                </tr>
                                                <tr>
                                                    <td className="w-200"> <h5 className={`${zawgyi(lang)}`}> {t('invoice-net-amount')} </h5> </td>
                                                    <td className="w-200"> <h5> {numeral(invoice.netAmount).format('0,0')} MMK </h5> </td>
                                                </tr>

                                                <tr>
                                                    <td colSpan={2}> 
                                                        <Button className={`btn btn-print-full mt-3 ${display}`} onClick={() => print()}> Print </Button>
                                                    </td>
                                                </tr>
                                            </thead>
                                        </table>
                                    </div>
=======
                                        )
                                    })}
                                </tbody>
                            </table>

                            <div className="d-md-flex flex-md-row justify-content-between align-items-center mt-3 pt-3">
                                {invoice.isPaid ? (
                                <div className="">
                                    <img className="paid-img align-self-end" src="build/assets/images/paid.png" />
                                </div>) : (<></>)}
                                <div className="d-md-flex flex-md-center justify-content-end">
>>>>>>> 173506ef8ea2e42dc34171d17fdb431982307a02
                                </div>
                            </>
                        )}
                    </div>
                </>
            )}

            { success && (
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