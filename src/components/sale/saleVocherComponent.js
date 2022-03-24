import numeral from "numeral";
import React, { useEffect, useState } from "react";
import { Button, FormControl, InputGroup } from "react-bootstrap";
import { BsTrash } from "react-icons/bs";
import { useSelector } from "react-redux";
import { t, zawgyi } from "../../utilities/translation.utility";
import { useHistory } from "react-router-dom";

const tableHeader = [t('martial-code'),t('name'),t('model'), t('Qty'),t('price'),t('total')];

export const SaleVoucherComponent = ({ dataSource, retrive, total, getcustomer }) => {

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
    const history = useHistory();
    // const [ispaid, setIsPaid] = useState(true);
    const [customer, setCustomer] = useState(null);

    const lang = useSelector(state => state.lang);

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

    const makePayment = () => {
    //     const { history } = this.props;
    //     if(this.state.cartItems.length > 0){
    //         this.setState({
    //             payBtn: true
    //         });
            // if(!creditAmount === 0) {
            //     setIsPaid(false);
            // };
            let iData = {
                totalAmount: totalAmount,
                discount: discount,
                netAmount: netAmount,
                creditAmount: creditAmount,
                payAmount: payAmount,
                customer: customer,
                // isPaid: ispaid,
                bought_items: items.map(e => e)
            };
            localStorage.setItem('INVOICE', JSON.stringify(iData));
            history.push('/invoiceReport');
    //     this.setState({
    //         payBtn: false
    //     });
    //     return;
    }

    useEffect(() => {
        if(dataSource) {
            setItems(dataSource)
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
                                    <th key={`header_id_${index}`} >  
                                        <span className={`${zawgyi(lang)} cart-item-table-with`}> {header}  </span>
                                    </th>
                                )
                            })}
                            
                        </tr>
                    </thead>

                    <tbody>
                        {items.length > 0 && items.map((item, index) => {
                            return(
                                <tr key={`cart_item_id_${index}`}>
                                    <td className="cart-item-table-hash-width"> {index + 1} </td>
                                    <td className={`${zawgyi(lang)} cart-item-table-with`}> {item.name} </td> 
                                    <td className={`${zawgyi(lang)} cart-item-table-with`}> {item.model} </td>
                                    <td className={`${zawgyi(lang)} cart-item-table-with`}> {item.code} </td>
                                    <td className={`${zawgyi(lang)} cart-item-table-with`}> {item.requestQty} </td>
                                    <td className={`${zawgyi(lang)} cart-item-table-with`}> {numeral(item.sell_price).format('0,0')} MMK </td>
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
                                    <td className={`${zawgyi(lang)} pe-3`}> <h4> {t('total-amount')} </h4> </td>
                                    <td className={`${zawgyi(lang)} pe-3`}> <h4> {numeral(totalAmount).format('0,0')} {t('mmk')} </h4> </td>
                                </tr>

                                <tr>
                                    <td className={`${zawgyi(lang)}`}> <h4> {t('discount')} </h4> </td>
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
                                    <td className={`${zawgyi(lang)}`}> <h4> {t('pay-amount')} </h4> </td>
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
                                    <td className={`${zawgyi(lang)} pe-3`}> <h4> {t('credit-amount')} </h4> </td>
                                    <td className={`${zawgyi(lang)} pe-3`}> <h4> {creditAmount}  {t('mmk')} </h4> </td>
                                </tr>

                                <tr>
                                    <td className={`${zawgyi(lang)} pe-3`}> <h4> {t('net-amount')}</h4> </td>
                                    <td className={`${zawgyi(lang)} pe-3`}> <h4> {numeral(netAmount).format('0,0')}  {t('mmk')} </h4> </td>
                                </tr>

                                <tr>
                                    <td className={`${zawgyi(lang)} pe-3`} colSpan={2}>
                                        <Button className="btn w-full" onClick={() => makePayment()}> {t('make-payment')}</Button>
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