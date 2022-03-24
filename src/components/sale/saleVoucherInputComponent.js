import { t } from "i18next";
import React, { useEffect, useState } from "react";
import { FormControl, FormLabel, InputGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setOpenToastAction } from "../../redux/actions/toast.action";
import { AutoCompleteDropDown } from "../general/autoCompleteDropDown";
import { zawgyi } from "../../utilities/translation.utility";

export const SaleVoucherInputComponent = ({ dataSource, retrive }) => {

    const [qty, setQty] = useState(0);
    const [items, setItems] = useState([]);
    const [item, setItem] = useState(null);
    
    const lang = useSelector(state => state.lang)
    const dispatch = useDispatch();

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
            <div className={`${zawgyi(lang)}`}>
                <FormLabel> {t('martial-code')} </FormLabel>
                <AutoCompleteDropDown 
                    dataSource={items} 
                    inputOption={
                        {
                            type: "text",
                            placeholder: t('enter-item-code'),
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
            <div className={`${zawgyi(lang)}`}>
                <FormLabel> {t('quality')} </FormLabel>
                <FormControl 
                    type="text" 
                    placeholder="qty" 
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
                    <div className={`${zawgyi(lang)}`}>
                        <FormLabel> {t('name')} </FormLabel>
                        <FormControl placeholder={t('name')} value={item.name || ''} disabled={true} />
                    </div>
                    
                    <div className={`${zawgyi(lang)}`}>
                        <FormLabel> {t('model')} </FormLabel>
                        <FormControl placeholder={t('model')} value={item.model || ''} disabled={true} />
                    </div>

                    <div className={`${zawgyi(lang)}`}>
                        <FormLabel> {t('code')} </FormLabel>
                        <FormControl placeholder={t('code')} value={item.code || ''} disabled={true} />
                    </div>

                    <div className={`${zawgyi(lang)}`}>
                        <FormLabel> {t('price')} </FormLabel>
                        <FormControl placeholder={t('price')} value={item.sell_price || ''} disabled={true} />
                    </div>

                    <div className={`${zawgyi(lang)}`}>
                        <FormLabel> {t('total-qty')} </FormLabel>
                        <FormControl placeholder={t('total-qty')} value={item.totalQty || 0} disabled={true} />
                    </div>

                    <div className={`${zawgyi(lang)}`}>
                        <FormLabel>{t('request-qty')}</FormLabel>
                        <FormControl placeholder={t('request-qty')} value={qty || 0} disabled={true} />
                    </div>
                </>
            )}
        </InputGroup>
</div>
    )
}