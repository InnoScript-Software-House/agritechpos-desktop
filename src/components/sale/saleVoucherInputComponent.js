import React, { useEffect, useState } from "react";
import { FormControl, FormLabel, InputGroup } from "react-bootstrap";
import { AutoCompleteDropDown } from "../general/autoCompleteDropDown";


export const SaleVoucherInputComponent = ({ dataSource, retrive }) => {

    const [qty, setQty] = useState(0);
    const [items, setItems] = useState([]);
    const [item, setItem] = useState(null);  

    const addItem = (e) => {
        item.qty = e;
        items.push(item);
        setItems(items);
    }

    useEffect(() => {
        if(dataSource) {
            setItems(dataSource)
        }
    }, [dataSource])

    return (
        <div className="d-md-flex flex-md-row align-items-start">
        <AutoCompleteDropDown 
            dataSource={items} 
            inputOption={
                {
                    type: "text",
                    placeholder: 'Enter item code',
                    search_name: 'code'
                }} 
            chooseItem={(e) => setItem({
                name: e.eng_name,
                model: e.model,
                code: e.code,
                price: e.price,
                totalQty: e.qty,
                percentage: e.percentage,
                sell_price: ((Number(e.price) * Number(e.percentage)) / 100) + Number(e.price)
            })}
        />

        <InputGroup>
            <div className="">
                <FormLabel> Qty </FormLabel>
                <FormControl 
                    type="number" 
                    placeholder="qty" 
                    value={qty} 
                    onChange={(e) => setQty(e.target.value)}
                    onKeyPress={(e) => addItem(e.code)}
                />
            </div>

            { item && (
                <>
                    <div className="">
                        <FormLabel> Name </FormLabel>
                        <FormControl placeholder="Name" value={item.name || ''} disabled={true} />
                    </div>
                    <FormControl placeholder="Model" value={item.model || ''} disabled={true} />
                    <FormControl placeholder="Code" value={item.code || ''} disabled={true} />
                    <FormControl placeholder="Qty" value={item.qty} disabled={true} />
                    <FormControl placeholder="Qty" value={qty} disabled={true} />
                    <FormControl placeholder="Price" value={item.price || ''} disabled={true} />
                </>
            )}
        </InputGroup>
</div>
    )
}