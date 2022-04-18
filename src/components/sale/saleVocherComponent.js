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

export const SaleVoucherComponent = ({ dataSource, total }) => {
    
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

    const messageBoxTitle = t('open-invoice');

    const calculateDiscount = (e) => {
        if(e !== '' && !Number(e)) {
            nativeApi.messageBox.open({title:messageBoxTitle, message: t('invalid-number'), type: messageBoxType.info});
            return;
        }

        const getGrandAmount = Number(netAmount) - Number(e);

        if(getGrandAmount < 0) {
            nativeApi.messageBox.open({title:messageBoxTitle, message: t('over-discount'), type: messageBoxType.info});
            return;
        }

        setDiscount(e);
        setGrandAmount(Number(getGrandAmount));
    }

    const calculateCredit = (e) => {

        if(e !== '' && !Number(e)) {
            nativeApi.messageBox.open({title:messageBoxTitle, message: t('invalid-number'), type: messageBoxType.info});
            return;
        }  
        const getCreditAmount = Number(grandAmount) - Number(e);

        if(getCreditAmount < 0) {
            nativeApi.messageBox.open({title:messageBoxTitle, message: t('over-net-amount'), type: messageBoxType.info});
            return;
        }

        setPayAmount(e);
        setCreditAmount(getCreditAmount);
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
                                            <h4 className={`${zawgyi(lang)}`}> {t('total-amount')} </h4>
                                            <h4> {numeral(totalAmount).format('0,0')} MMK </h4>
                                        </div> 
                                        
                                    </td>
                                </tr>

                                <tr>
                                    <td colSpan={5}></td>
                                    <td colSpan={3}>
                                        <div className="d-flex flex-row justify-content-between align-items-center">
                                            <h4 className={`${zawgyi(lang)}`}> TAX (15%) </h4>
                                            <h4> { numeral(tax).format('0,0')} MMK </h4>
                                        </div>
                                    </td>
                                </tr>

                                <tr>
                                    <td colSpan={5}></td>
                                    <td colSpan={3}>
                                        <div className="d-flex flex-row justify-content-between align-items-center">
                                            <h4 className={`${zawgyi(lang)}`}> {t('actural-amount')} </h4>
                                            <h4> { numeral(netAmount).format('0,0')} MMK </h4>
                                        </div>
                                    </td>
                                </tr>

                                <tr>
                                    <td colSpan={5}></td>
                                    <td colSpan={3}>
                                        <div className="d-flex flex-row justify-content-between align-items-center">
                                            <h4 className={`${zawgyi(lang)}`}> {t('grand-amount')} </h4>
                                            <h4> { numeral(grandAmount).format('0,0')} MMK </h4>
                                        </div>
                                    </td>
                                </tr>

                                <tr>
                                    <td colSpan={5}></td>
                                    <td colSpan={3}>
                                        <div className="d-flex flex-row justify-content-between align-items-center">
                                            <h4 className={`${zawgyi(lang)}`}> {t('discount')} </h4>
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
                                            <h4 className={`${zawgyi(lang)}`}> {t('pay-amount')} </h4>
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
                                            <h4 className={`${zawgyi(lang)}`}> {t('credit-amount')} </h4>
                                            <h4> { numeral(creditAmount).format('0,0')} MMK </h4>
                                        </div>
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