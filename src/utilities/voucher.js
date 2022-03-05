import React, { useCallback, useEffect, useReducer, useState } from "react";
import { Card } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { useDispatch } from "react-redux";
import "../assets/css/components/voucher-table.css";
import { saleReducer } from "../redux/reducers/sale.reducer";

const columns = [{
    name: 'Model',
    selector: row => row.Model
},
{
    name: 'Price',
    selector: row=> row.Price
},
{
    name: 'Amount',
    selector: row=> row.Amount
},
{
    name: 'Total',
    selector: row=> row.Total
}
];

export const VoucherComponent = ({props}) => {

    const { cartReducer } = props.reducer;
    const additem = [];
    const [items, setItems] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        if(cartReducer) {
            additem.push(cartReducer);
            setItems(additem);
        }
    }, [cartReducer, dispatch]);
    console.log(items)

    return(
        <div className="voucher-wrapper">
        <Card>
            <Card.Header>
                <Card.Title>
                    <span>Voucher Form</span>
                </Card.Title>
            </Card.Header>

            <Card.Body>
                {/* <ul>
                    {additem && additem.map((item, index) => {
                        return(
                            <li key={`item_id_${index}`}> {item.itemSaleAmount} </li>
                        )
                    })}
                </ul> */}
            </Card.Body>
        </Card>
        </div>
       
    )
}