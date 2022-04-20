import numeral from "numeral";
import React, { useEffect, useState } from "react";
import { Button, FormControl, InputGroup } from "react-bootstrap";
import { BsArrowCounterclockwise, BsTrash } from "react-icons/bs";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { t, zawgyi } from "../../utilities/translation.utility";
import { v4 as uuidv4 } from 'uuid';
import { loadLanguages } from "i18next";
import { messageBoxType } from "../../utilities/native.utility";

const tableHeader = [t('materail-code'), t('name'), t('model'), t('quantity'), t('price'), t('total')];

export const SaleVoucherComponent = ({ dataSource, total, retrive }) => {

    const history = useHistory();
    const state = useSelector(state => state);
    const { lang } = state;

    const [items, setItems] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const [discount, setDiscount] = useState('');
    const [payAmount, setPayAmount] = useState('');
    const [creditAmount, setCreditAmount] = useState('');
    const [netAmount, setNetAmount] = useState('');
    const [grandAmount, setGrandAmount] = useState('');
    const [tax, setTax] = useState('');
    const [changes, setChanges] = useState('');

    const messageBoxTitle = t('open-invoice');

    const calculateDiscount = (e) => {
        if(e !== '' && !Number(e)) {
            nativeApi.messageBox.open({title:messageBoxTitle, message: t('invalid-number'), type: messageBoxType.info});
            return;
        }

        if(payAmount !== ''){
            const getGrandAmount = (Number(netAmount)-Number(payAmount)) - Number(e);

            if(e > grandAmount) {
                nativeApi.messageBox.open({title:messageBoxTitle, message: t('over-discount'), type: messageBoxType.info});
                return;
            }

            if(Number(getGrandAmount) < 0) {
                setCreditAmount(0);
                setChanges(Math.abs(getGrandAmount));
                setDiscount(e);
                return;
            }
            setDiscount(e);
            setChanges(Number(getGrandAmount) > 0 ? 0 : Math.abs(getGrandAmount));
            setGrandAmount(Number(netAmount) - Number(e));
            setCreditAmount(Number(getGrandAmount));
            return;
        }

        const getGrandAmount = Number(netAmount) - Number(e);

        if(e > grandAmount) {
            nativeApi.messageBox.open({title:messageBoxTitle, message: t('over-discount'), type: messageBoxType.info});
            return;
        }

        setDiscount(e);
        setGrandAmount(Number(getGrandAmount));
        setCreditAmount(Number(getGrandAmount));
    }

    const makePayment = () => {
        const amounts = {
            total_amount: totalAmount,
            tax: tax,
            actual_amount: netAmount,
            grand_amount: grandAmount,
            discount: discount,
            pay_amount: payAmount,
            changes: changes,
            credit_amount: creditAmount
        }
        localStorage.setItem('AMOUNTS', JSON.stringify(amounts));
        localStorage.setItem('INVOICE', JSON.stringify(dataSource));
        history.push('/invoiceReport')
    }

    const calculateCredit = (e) => {

        if(e !== '' && !Number(e)) {
            nativeApi.messageBox.open({title:messageBoxTitle, message: t('invalid-number'), type: messageBoxType.info});
            return;
        }  
        const getCreditAmount = (Number(netAmount) - Number(discount)) - Number(e);

        if(getCreditAmount < 0) {
            const getChanges = (Number(netAmount) - Number(discount)) - Number(e);
            setChanges(Math.abs(getChanges));
            setCreditAmount(0);
            setPayAmount(e);
            return;
        }
        setChanges(getCreditAmount < 0 ? Math.abs(getCreditAmount) : 0);
        setPayAmount(e);
        setCreditAmount(getCreditAmount);
    }

    const removeItem = (item) => {
        const delitems = items.filter(e => e.id !== item.id);
        console.log(delitems);
        setItems(delitems);
        retrive(delitems);
    }

    useEffect(() => {
        setItems(dataSource);

        if(dataSource.length > 0) {
            const totalAmounts = dataSource.map(value => value.totalAmount);
            const totaPaidAmount = totalAmounts.reduce((a,b) => a + b);
            setTotalAmount(totaPaidAmount);

            const getTax = parseInt((totaPaidAmount * 15) / 100);
            
            setTax(getTax);
            setNetAmount(getTax + totaPaidAmount);
            setGrandAmount(getTax + totaPaidAmount);
            setCreditAmount(getTax + totaPaidAmount)
        }

    }, [dataSource, total]);

    return (
        <>
            <div className="table-responsive">
                <table className="table request-item-table">
                    <thead>
                        <tr>
                            <th> # </th>
                            {tableHeader.map((header, index) => {
                                return (
                                    <th key={`header_id_${index}`} className={`${zawgyi(lang)}`}> {header} </th>
                                )
                            })}
                        </tr>
                    </thead>

                    <tbody>
                        {items.length > 0 && items.map((item, index) => {
                            return (
                                <tr key={`cart_item_id_${index}`}>
                                    <td> {index + 1} </td>
                                    <td> {item.code} </td>
                                    <td> {item.name} </td>
                                    <td> {item.model} </td>
                                    <td> {item.requestQty} </td>
                                    <td> {numeral(item.sell_price).format('0,0')} MMK </td>
                                    <td>
                                        <div className="d-md-flex flex-md-row justify-content-between align-items-center">
                                            <span className="me-3"> {numeral(item.sell_price * item.requestQty).format('0,0')} MMK</span>
                                            <BsTrash className="btn-icon" size={20} onClick={() => removeItem(item)} />
                                        </div>
                                    </td>
                                </tr>  
                            )
                        })}

                        { items.length > 0 && (
                            <>
                                <tr>
                                    <td colSpan={5}></td>
                                    <td colSpan={3}>
                                        <div className="d-flex flex-row justify-content-between align-items-center">
                                            <h5 className={`${zawgyi(lang)}`}> {t('total-amount')} </h5>
                                            <h5> {numeral(totalAmount).format('0,0')} MMK </h5>
                                        </div> 
                                        
                                    </td>
                                </tr>

                                <tr>
                                    <td colSpan={5}></td>
                                    <td colSpan={3}>
                                        <div className="d-flex flex-row justify-content-between align-items-center">
                                            <h5 className={`${zawgyi(lang)}`}> TAX (15%) </h5>
                                            <h5> { numeral(tax).format('0,0')} MMK </h5>
                                        </div>
                                    </td>
                                </tr>

                                <tr>
                                    <td colSpan={5}></td>
                                    <td colSpan={3}>
                                        <div className="d-flex flex-row justify-content-between align-items-center">
                                            <h5 className={`${zawgyi(lang)}`}> {t('actural-amount')} </h5>
                                            <h5> { numeral(netAmount).format('0,0')} MMK </h5>
                                        </div>
                                    </td>
                                </tr>

                                <tr>
                                    <td colSpan={5}></td>
                                    <td colSpan={3}>
                                        <div className="d-flex flex-row justify-content-between align-items-center">
                                            <h5 className={`${zawgyi(lang)}`}> {t('grand-amount')} </h5>
                                            <h5> { numeral(grandAmount).format('0,0')} MMK </h5>
                                        </div>
                                    </td>
                                </tr>

                                <tr>
                                    <td colSpan={5}></td>
                                    <td colSpan={3}>
                                        <div className="d-flex flex-row justify-content-between align-items-center">
                                            <h5 className={`${zawgyi(lang)}`}> {t('discount')} </h5>
                                            <InputGroup className="request-item-table-input">
                                                <FormControl
                                                    className={`${zawgyi(lang)}`}
                                                    type="text"
                                                    value={discount}
                                                    onChange={(e) => calculateDiscount(e.target.value)}
                                                />
                                            </InputGroup>
                                        </div> 
                                        
                                    </td>
                                </tr>

                                <tr>
                                    <td colSpan={5}></td>
                                    <td colSpan={3}>
                                        <div className="d-flex flex-row justify-content-between align-items-center">
                                            <h5 className={`${zawgyi(lang)}`}> {t('pay-amount')} </h5>
                                            <InputGroup className="request-item-table-input">
                                                <FormControl
                                                    className={`${zawgyi(lang)}`}
                                                    type="text"
                                                    value={payAmount}
                                                    onChange={(e) => calculateCredit(e.target.value)}
                                                />
                                            </InputGroup>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan={5}></td>
                                    <td colSpan={3}>
                                        <div className="d-flex flex-row justify-content-between align-items-center">
                                            <h5 className={`${zawgyi(lang)}`}> {t('changes')} </h5>
                                            <h5> { numeral(changes).format('0,0')} MMK </h5>
                                        </div>
                                    </td>
                                </tr>

                                <tr>
                                    <td colSpan={5}></td>
                                    <td colSpan={3}>
                                        <div className="d-flex flex-row justify-content-between align-items-center">
                                            <h5 className={`${zawgyi(lang)}`}> {t('credit-amount')} </h5>
                                            <h5> { numeral(creditAmount).format('0,0')} MMK </h5>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan={5}></td>
                                    <td colSpan={3}>
                                        <Button className="large-btn" onClick={() => makePayment('cash')}> <span> {t('make-payment')} </span> </Button>
                                    </td>
                                </tr>
                            </>
                        )}
                    </tbody>
                </table>
            </div>

            {/* <div className="d-md-flex flex-md-row justify-content-between align-items-center mb-3">
                <div className="mt-3 pt-3">
                    {items.length > 0 && (
                        <table className="table">
                            <thead>

                                <tr>
                                    <td className="pe-3"> <h4> {t('credit-amount')} </h4> </td>
                                    <td className="pe-3"> <h4> {creditAmount} MMK </h4> </td>
                                </tr>

                                <tr>
                                    <td className="pe-3"> <h4> {t('net-amount')} </h4> </td>
                                    <td className="pe-3"> <h4> {numeral(netAmount).format('0,0')} MMK </h4> </td>
                                </tr>

                                <tr>
                                    <td className="pe-3" colSpan={2}>
                                        <Button className="btn w-full" onClick={() => makePayment('cash')}> <span> {t('make-payment')} </span> </Button>
                                        <Button className="btn w-full mt-3" onClick={() => makePayment('save')}> <span> {t('save-invoice')}  </span> </Button>
                                    </td>
                                </tr>
                            </thead>
                        </table>
                    )}
                </div>
            </div> */}
        </>
    )
}