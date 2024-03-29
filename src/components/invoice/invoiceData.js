import React, { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import { getShop } from "../../services/shop.service";
import moment from "moment";
import { t, zawgyi } from "../../utilities/translation.utility";
import { useSelector } from "react-redux";
import numeral from "numeral";

const tableHeader = [t('item-code'), t('item-name'), t('item-model'), t('item-qty'), t('item-price'), t('item-total')];

export const InvoiceDataComponent = ({ invoiceDetail }) => {

    const [shop, setShop] = useState (null);
    const [invoice, setInvoice] = useState (null);
    const [invoiceData, setInVoiceData] = useState(null);

    const lang = useSelector(state => state.lang);

    const importData = () => {
        const iData = invoiceDetail && invoiceDetail.length > 0 && JSON.parse(invoiceDetail[0].invoice_data);
        setInVoiceData(iData);
    }

    useEffect(async () => {
        if(invoiceDetail) {
            const shopinfo = await getShop();

            if(shopinfo && shopinfo.success === false) {
                dispatch(setOpenToastAction('Shop', shopinfo.success, 'danger'));
                return;
            }
            setShop(shopinfo);
            setInvoice(invoiceDetail && invoiceDetail[0]);
            importData();   
        }

    },[invoiceDetail]);

    return (
        <>
        <Card className="mt-3">
            <Card.Header>
                <Card.Title> <span> Preview Invoice </span> </Card.Title>
            </Card.Header>

            <Card.Body>
                {shop && invoice && (
                    <>
                        <div className="col-md-12 d-md-flex flex-md-row justify-content-between align-items-center mt-3 line mb-3">
                            <div className="ps-3">
                                <h3 className={`${zawgyi(lang)}`}> {shop.name} - {shop.description} </h3>
                                <p className={`${zawgyi(lang)}`}> {shop.address} </p>
                            </div>

                            <div className="d-md-flex flex-md-column pe-3">
                                <span className={`${zawgyi(lang)}`}> {t('shop-phone')} - {shop.phone} </span>
                                <span className={`${zawgyi(lang)}`}> {t('shop-email')} - {shop.email} </span>
                            </div>
                        </div>

                        <div className="col-md-12 mt-3 ps-3">
                            <div className="d-md-flex flex-row justify-content-between align-items-center mb-3">
                                <div className="invoice-info">
                                    <h2 className={`${zawgyi(lang)}`}> {t('invoice')} - AT{invoice.invoice_no} </h2>
                                    <span className={`${zawgyi(lang)}`}> {t('invoice-date')} - {moment(invoice.created_at).format('DD,MM,YYYY')} </span>
                                </div>

                                <div className="customer-info">
                                    <div className="pe-3">
                                        <h5 className={`${zawgyi(lang)}`}> {t('customer-name')} - {invoice.customer_name} </h5>
                                        <h5 className={`${zawgyi(lang)}`}> {t('customer-phone')} - {invoice.customer_phone} </h5>
                                        <h5 className={`${zawgyi(lang)}`}> {t('customer-address')} - {invoice.customer_address} </h5>
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
                                    { invoiceData && invoiceData.map((value, index) => {
                                        return (
                                        <tr key={`invoice data key ${index}`}>
                                            <td className={`${zawgyi(lang)}`}> <small> {value.code} </small> </td>
                                            <td className={`${zawgyi(lang)}`}> <small> {value.name} </small> </td>
                                            <td className={`${zawgyi(lang)}`}> <small> {value.model} </small> </td>
                                            <td className={`${zawgyi(lang)}`}> <small> {value.requestQty} </small> </td>
                                            <td className={`${zawgyi(lang)}`}> <small> {numeral(value.sell_price).format('0,0')} MMK </small> </td>
                                            <td className={`${zawgyi(lang)}`}> <small> {numeral(value.totalAmount).format('0,0')} MMK </small> </td>
                                        </tr>
                                        )
                                    })
                                    }
                                </tbody>
                            </table>

                            <div className="d-md-flex flex-md-row justify-content-between align-items-center mt-3 pt-3">
                                <div className="">
                                    {invoice && invoice.creditAmount === 0 && (
                                        <img className="paid-img align-self-end" src="build/assets/images/paid.png" />
                                    )}
                                </div>

                                <table>
                                    <thead>
                                        <tr>
                                            <td className="w-200"> <h6 className={`${zawgyi(lang)}`}> {t('invoice-total')} </h6> </td>
                                            <td className="w-200"> <h6> {numeral(invoice.total_amount).format('0,0')} MMK </h6> </td>
                                        </tr>

                                        <tr>
                                            <td className="w-200"> <h6 className={`${zawgyi(lang)}`}> {t('invoice-discount')} </h6> </td>
                                            <td className="w-200"> <h6> {numeral(invoice.discount).format('0,0')} MMK </h6> </td>
                                        </tr>

                                        <tr>
                                            <td className="w-200"> <h6 className={`${zawgyi(lang)}`}> {t('invoice-pay-amount')} </h6> </td>
                                            <td className="w-200"> <h6> {numeral(invoice.pay_amount).format('0,0')} MMK </h6> </td>
                                        </tr>

                                        <tr>
                                            <td className="w-200"> <h6 className={`${zawgyi(lang)}`}> {t('invoice-credit-amount')} </h6> </td>
                                            <td className="w-200"> <h6> {numeral(invoice.credit_amount).format('0,0')} MMK </h6> </td>
                                        </tr>

                                        <tr>
                                            <td className="w-200"> <h6 className={`${zawgyi(lang)}`}> {t('invoice-net-amount')} </h6> </td>
                                            <td className="w-200"> <h6> {numeral(invoice.total_amount).format('0,0')} MMK </h6> </td>
                                        </tr>
                                    </thead>
                                </table>
                            </div>
                        </div>
                    </>
                )
                }
            </Card.Body>
        </Card>
        </>
    )
}