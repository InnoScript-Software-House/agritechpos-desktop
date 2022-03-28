import React, { useEffect, useState } from "react";
import { FormControl, FormLabel, InputGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setOpenToastAction } from "../../redux/actions/toast.action";
import { t, zawgyi } from "../../utilities/translation.utility";
import { AutoCompleteDropDown } from "../general/autoCompleteDropDown";

export const SaleVoucherInputComponent = ({ dataSource, retrive }) => {

    const dispatch = useDispatch();
    const state = useSelector(state => state);
    const { lang } = state;

    const [qty, setQty] = useState('');
    const [items, setItems] = useState([]);
    const [item, setItem] = useState(null);

    const addItem = (e) => {
        if(!Number(qty)){
            dispatch(setOpenToastAction('Item', "Invalid qty", 'danger'));
            return;
        }
        
        if(Number(item.totalQty) < Number(e) || Number(e) <= 0) {
            dispatch(setOpenToastAction('Item', "Invalid request item's qty", 'danger'));
            return;
        }

        item.requestQty = Number(e);
        item.totalAmount = Number(e) * Number(item.sell_price);
        item.totalOriginAmount = Number(e) * Number(item.price);
        retrive(item);
    }

    useEffect(() => {
        if(dataSource) {
            setItems(dataSource);
        }
    }, [dataSource])

    return (
        <div className="d-md-flex flex-md-row align-items-start">
            <div className="">
                <FormLabel className={`${zawgyi(lang)}`}> {t('item-code')} </FormLabel>
                <AutoCompleteDropDown 
                    dataSource={items} 
                    inputOption={
                        {
                            type: "text",
                            placeholder: t('input-item-code'),
                            search_name: 'code'
                        }} 
                    chooseItem={(e) => setItem({
                        name: e.eng_name,
                        model: e.model,
                        code: e.code,
                        price: Number(e.price),
                        totalQty: Number(e.qty),
                        percentage: Number(e.percentage),
                        sell_price: ((Number(e.price) * Number(e.percentage)) / 100) + Number(e.price)
                    })}
                />
            </div>

        <InputGroup>
            <div className="">
                <FormLabel className={`${zawgyi(lang)}`}> {t('item-qty')} </FormLabel>
                <FormControl 
                    type="text" 
                    placeholder={t('item-qty')} 
                    value={qty} 
                    onChange={(e) => setQty(e.target.value)}
                    onKeyPress={(e) => {
                        if(e.code === 'Enter') {
                            addItem(e.target.value);
                        }
                    }}
                />
            </div>

            { item && (
                <>  
                    <div className="table-responsive">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>
                                        <FormLabel className={`${zawgyi(lang)}`}> {t('item-code')} </FormLabel>
                                    </th>
                                    <th>
                                        <FormLabel className={`${zawgyi(lang)}`}> {t('item-request')} </FormLabel>
                                    </th>
                                    <th>
                                        <FormLabel className={`${zawgyi(lang)}`}> {t('item-name')} </FormLabel>
                                    </th>
                                    <th>
                                        <FormLabel className={`${zawgyi(lang)}`}> {t('item-price')} (MMK) </FormLabel>
                                    </th>
                                    <th>
                                        <FormLabel className={`${zawgyi(lang)}`}> {t('item-total')} </FormLabel>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <FormControl placeholder={t('item-model')} value={item.code || ''} disabled={true} />
                                    </td>
                                    <td>
                                        <FormControl placeholder={t('item-request')} value={qty || 0} disabled={true} />
                                    </td>
                                    <td>
                                        <FormControl className="w-50" placeholder={t('item-name')} value={item.name || ''} disabled={true} />
                                    </td>
                                    <td>
                                        <FormControl className="w-50" placeholder={t('item-price')} value={item.sell_price || ''} disabled={true} />
                                    </td>
                                    <td>
                                        <FormControl className="w-50" placeholder={t('item-total')} value={item.totalQty || 0} disabled={true} />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    {/* <div className="">
                        <FormLabel className={`${zawgyi(lang)}`}>  {t('item-model')} </FormLabel>
                        <FormControl placeholder={t('item-model')} value={item.model || ''} disabled={true} />
                    </div> */}

                    {/* <div className="">
                       
                        
                    </div> */}

                   

                    {/* <div className="">
                       
                        
                    </div> */}
                </>
            )}
        </InputGroup>
</div>
    )
}