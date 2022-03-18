import React, { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import { getShop } from "../../services/shop.service";
import moment from "moment";
import numeral from "numeral";

export const InvoiceDataComponent = ({props, invoiceDetail }) => {

    const [shop, setShop] = useState (null);
    const [invoice, setInvoice] = useState (null);
    const [invoiceData, setInVoiceData] = useState(null);
    const [totalAmount, setTotalAmount] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [netAmount, setNetAmount] = useState(0);
    const [display, setDisplay] = useState('');
    console.log(invoiceDetail);

    const importData = () => {
            const iData = invoiceDetail && JSON.parse(invoiceDetail[0].invoice_data);
            if(iData){
            const total = iData.map(e => e.total);
            setTotalAmount(total.reduce((a, b) => a + b, 0));
            setNetAmount(total.reduce((a, b) => a + b, 0) - discount);
            setInVoiceData(iData);
            }
    }


    useEffect(async () => {
        const shopinfo = await getShop();

        if(shopinfo && shopinfo.success === false) {
            dispatch(setOpenToastAction('Shop', shopinfo.success, 'danger'));
            return;
        }
        setShop(shopinfo);
        setInvoice(invoiceDetail && invoiceDetail[0]);
        importData();   

    },[invoiceDetail]);

    return (
        <>
        <Card>
            <Card.Header>
                <Card.Title>
                        <span>Saved Invoices</span>
                </Card.Title>
            </Card.Header>
            <Card.Body>{
                shop && invoice && (
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
                                    <h2> INVOICE - AT{invoice.invoice_id} </h2>
                                    <span> Date - {moment(invoice.created_at).format('DD,MM,YYYY')} </span>
                                </div>

                                <div className="customer-info">
                                    <div className="pe-3">
                                        <h4> Customer Name : {invoice.customer_name} </h4>
                                        <h4> Phone Number : {invoice.customer_phone} </h4>
                                        <h4> Address : {invoice.customer_address} </h4>
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
                                    { invoiceData && invoiceData.map((value, index) => {
                                        return (
                                        <tr key={`invoice data key ${index}`}>
                                            <td> {value.code} </td>
                                            <td> {value.name} </td>
                                            <td> {value.model} </td>
                                            <td> {value.qty} </td>
                                            <td> {numeral(( ((Number(value.price) * Number(value.percentage)) / 100) + Number(value.price))).format('0,0')} MMK </td>
                                            <td> {numeral(((((Number(value.price) * Number(value.percentage)) / 100) + Number(value.price)) * Number(value.qty))).format('0,0')} MMK </td>
                                        </tr>
                                        )
                                    })
                                    }
                                </tbody>
                            </table>

                            <div className="d-md-flex flex-md-row justify-content-between align-items-center mt-3 pt-3">
                                {/* <div className="">
                                    <img className="paid-img align-self-end" src="build/assets/images/paid.png" />
                                </div> */}
                                <table>
                                    <thead>
                                        <tr>
                                            <td className="w-200"> <h4> TOTAL </h4> </td>
                                            <td className="w-200"> <h4> {numeral(totalAmount).format('0,0')} MMK </h4></td>
                                        </tr>
                                        <tr>
                                            <td className="w-200"> <h4> DISCOUNT </h4> </td>
                                            <td className="w-200"> <h4> {numeral(discount).format('0,0')} MMK </h4></td>
                                        </tr>
                                        <tr>
                                            <td className="w-200"> <h4> NET AMOUNT </h4> </td>
                                            <td className="w-200"> <h4> {numeral(netAmount).format('0,0')} MMK </h4></td>
                                        </tr>

                                        <tr>
                                            {/* <td colSpan={2}> 
                                                <Button className={`btn btn-print-full mt-3 ${display}`} onClick={() => print()}> Print </Button>
                                            </td> */}
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