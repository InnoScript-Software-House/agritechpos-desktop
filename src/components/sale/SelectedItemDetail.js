import numeral from "numeral";
import React, { useEffect, useState } from "react";
import { Button, FormControl, InputGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setOpenToastAction } from "../../redux/actions/toast.action";
import { updateItem } from "../../services/item.service";
import { t, zawgyi } from "../../utilities/translation.utility";

const tableHeader = [t('item-code'), t('item-name'), t('item-qty'), t('item-price'), t('table-col-sell-percentage'), t('item-sell'), t('item-location'), ''];

export const SelectedItemDetail = ({ selectedItem }) => {
    const state = useSelector(state => state);
    const dispatch = useDispatch();

    const { lang } = state;

    const [item, setItem] = useState(null);
    const [percentage, setPercentage] = useState('');
    const [showPrice, setShowPrice] = useState(false);
    const [showPercentage, setShowPercentage] = useState(false);

    const changePercentage = (percentageValue) => {
        setPercentage(percentageValue);

        if(!Number(percentageValue)) {
            dispatch(setOpenToastAction('Item', 'Invalid Percentage Value', 'danger'));
            return;
        }
    }

    const save = async () => {
        const requestBody = {
            percentage: percentage
        };

        const response = await updateItem(item.id, requestBody);

        if(response && response.success === false) {
            dispatch(setOpenToastAction('Item', response.message, 'danger'));
            return;
        }

        dispatch(setOpenToastAction('Item', "Item's percentage is updated", 'success'));
        item.percentage = percentage;
        item.sell_price = ((Number(item.price) * Number(percentage)) / 100) + Number(item.price);
        setPercentage('');
        return;
    }

    useEffect(() => {
        if(selectedItem) {
            setItem(selectedItem);
        }
    }, [selectedItem]);

    return (
        <>
            {item && (
                <table className="table">
                    <thead>
                        <tr>
                            {tableHeader.map((value, index) => {
                                return(
                                    <td key={`table_id_${index}`} className={`${zawgyi(lang)}`}> {value} </td>
                                )
                            })}
                        </tr>
                    </thead>
            
                    <tbody>
                        <tr>
                            <td> {item.code} </td>
                            <td> {item.name} </td>
                            <td> {item.totalQty} </td>
                            <td> 
                                <span className="clickable" onClick={() => setShowPrice(!showPrice)}>
                                    {showPrice ? `${numeral(item.price).format('0,0')} MMK` : `${item.price.toString().charAt(0)} XXX... MMK` }
                                </span>
                            </td>
                            <td>
                                <span className="clickable" onClick={() => setShowPercentage(!showPercentage)}> 
                                    {showPercentage ? `${item.percentage} %` : `${item.percentage.toString().charAt(0)} XX (%)`} 
                                </span>
                            </td>
                            <td> {numeral(item.sell_price).format('0,0')} MMK </td>
                            <td> {item.location} </td>
                            <td> 
                                <InputGroup>
                                    <FormControl
                                        type="text"
                                        value={percentage}
                                        onChange={(e) => changePercentage(e.target.value)}
                                    />
                                    <Button className="btn-small" onClick={() => save()}> Save </Button>
                                </InputGroup>
                            </td>
                        </tr>
                    </tbody>
                </table>
            )}
        </>
    )

}