import numeral from "numeral";
import React, { useEffect, useState } from "react";
import { Button, FormControl, InputGroup } from "react-bootstrap";
import { BsTrash } from "react-icons/bs";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import moment from "moment";
import { t, zawgyi } from "../../utilities/translation.utility";
import { v4 as uuidv4 } from 'uuid';

const tableHeader = [t('item-code'), t('item-name'), t('item-model'), t('item-qty'), t('item-price'), t('item-total')];

export const SaleVoucherComponent = ({ dataSource, retrive, total, getcustomer, save }) => {
    const history = useHistory();
    const state = useSelector(state => state);
    const { lang } = state;

    const [items, setItems] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [netAmount, setNetAmount] = useState(0);
    const [creditAmount, setCreditAmount] = useState(0);
    const [payAmount, setPayAmount] = useState(0);
    const [totalOrignPrice, setTotalOriginPrice] = useState({
        sell: 0,
        buy: 0
    });
   const [customer, setCustomer] = useState(null);

    const removeItem = (selectedItem) => {
        const removeItems = items.filter(item => item.code !== selectedItem.code);
        retrive(removeItems);
    }

    const calculateDiscount = () => {
        const updateNetAmount = Number(totalAmount) - Number(discount);
        setNetAmount(updateNetAmount); 
        setPayAmount(updateNetAmount);
    }

    const calculateCredit = () => {
        const updateCreditAmount = Number(netAmount) - Number(payAmount);
        setCreditAmount(updateCreditAmount);
    }

    const makePayment = (type) => {
        let iData = {
            totalAmount: totalAmount,
            discount: discount,
            netAmount: netAmount,
            creditAmount: creditAmount,
            payAmount: payAmount,
            customer: customer,
            bought_items: items.map(e => e)
        };

        if(type === 'cash') {
            localStorage.setItem('INVOICE', JSON.stringify(iData));
            history.push('/invoiceReport');
        }

        if(type === 'save') {
            const invoiceLists = localStorage.getItem('INVOICE_LIST') ? JSON.parse(localStorage.getItem('INVOICE_LIST')) : [];
            iData.recent_id = uuidv4();
            invoiceLists.push(iData);

            localStorage.setItem('INVOICE_LIST', JSON.stringify(invoiceLists));
            // window.location.reload();
            save(invoiceLists);
            return;
        }
    }

    useEffect(() => {
        if(dataSource) {
            setItems(dataSource);
        }

        if(total) {
            setTotalOriginPrice(total.buy);
            setTotalAmount(total.sell);
            setNetAmount(total.sell);
            setPayAmount(total.sell);
        }
        if(getcustomer) {
            setCustomer(getcustomer);
        }
    }, [dataSource, total, getcustomer])

    return (
        <>
            <div className="table-responsive">
                <table className="table">
                    <thead>
                        <tr>
                            <th className="cart-item-table-hash-width"> # </th>
                            {tableHeader.map((header, index) => {
                                return(
                                    <th key={`header_id_${index}`} className={`${zawgyi(lang)} cart-item-table-with`}> {header} </th>
                                )
                            })}
                            
                        </tr>
                    </thead>

                    <tbody>
                        {items.length > 0 && items.map((item, index) => {
                            return(
                                <tr key={`cart_item_id_${index}`}>
                                    <td className="cart-item-table-hash-width"> {index + 1} </td>
                                    <td className="cart-item-table-with"> {item.name} </td> 
                                    <td className="cart-item-table-with"> {item.model} </td>
                                    <td className="cart-item-table-with"> {item.code} </td>
                                    <td className="cart-item-table-with"> {item.requestQty} </td>
                                    <td className="cart-item-table-with"> {numeral(item.sell_price).format('0,0')} MMK </td>
                                    <td className="cart-item-table-with"> 
                                        <div className="d-md-flex flex-md-row justify-content-between align-items-center">
                                            <span className="me-3"> { numeral(item.sell_price * item.requestQty).format('0,0') } MMK</span>
                                            <BsTrash className="btn-icon" size={20} onClick={() => removeItem(item)} />
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>

            <div className="d-md-flex flex-md-row justify-content-between align-items-center mb-3">
                <div className=""></div>
                <div className="mt-3 pt-3">
                    {items.length > 0 && (
                        <table className="table">
                            <thead>
                                <tr>
                                    <td className="pe-3"> <h4 className={`${zawgyi(lang)}`}> {t('invoice-total')} </h4> </td>
                                    <td className="pe-3"> <h4> {numeral(totalAmount).format('0,0')} MMK </h4> </td>
                                </tr>

                                <tr>
                                    <td> <h4 className={`${zawgyi(lang)}`}> {t('invoice-discount')} </h4> </td>
                                    <td>
                                        <InputGroup>
                                            <FormControl 
                                                type="number"
                                                value={discount}
                                                onChange={(e) => setDiscount(e.target.value)}
                                                onKeyPress={(e) => {
                                                    if(e.code === 'Enter') {
                                                        calculateDiscount();
                                                    }
                                                }}
                                            />
                                        </InputGroup>
                                    </td>
                                </tr>
                                
                                <tr>
                                    <td> <h4 className={`${zawgyi(lang)}`}> {t('invoice-pay-amount')} </h4> </td>
                                    <td>
                                        <InputGroup>
                                            <FormControl 
                                                type="text"
                                                value={payAmount}
                                                onChange={(e) => setPayAmount(e.target.value)}
                                                onKeyPress={(e) => {
                                                    if(e.code == 'Enter') {
                                                        calculateCredit();
                                                    }
                                                }}
                                            /> 
                                        </InputGroup>
                                    </td>
                                </tr>

                                <tr>
                                    <td className="pe-3"> <h4 className={`${zawgyi(lang)}`}> {t('invoice-credit-amount')} </h4> </td>
                                    <td className="pe-3"> <h4> {creditAmount} MMK </h4> </td>
                                </tr>

                                <tr>
                                    <td className="pe-3"> <h4 className={`${zawgyi(lang)}`}> {t('invoice-net-amount')} </h4> </td>
                                    <td className="pe-3"> <h4> {numeral(netAmount).format('0,0')} MMK </h4> </td>
                                </tr>

                                <tr>
                                    <td className="pe-3" colSpan={2}>
                                        <Button className="btn w-full" onClick={() => makePayment('cash')}> {t('make-payment')} </Button>
                                        <Button className="btn w-full mt-3" onClick={() => makePayment('save')}> {t('save-invoice')} </Button>
                                    </td>
                                </tr>
                            </thead>
                        </table>
                    )}
                </div>
            </div>
        </>
    )
}