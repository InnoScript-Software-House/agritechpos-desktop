import React, { useState } from "react";
import { Button, Card, FormControl, InputGroup } from "react-bootstrap";
import { BsArrowCounterclockwise } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { setOpenToastAction } from "../../redux/actions/toast.action";
import { updateItem } from "../../services/item.service";
import { t, zawgyi } from "../../utilities/translation.utility";
import { LoadingComponent } from "../general/Loading";

export const EditItemComponent = ({ props, item, reload }) => {

    const { lang } = props.reducer;
    const { id } = props.match.params;
    const dispatch = useDispatch();

    const [editItem, setEditItem] = useState(null);
    const [loading, setLoading] = useState(false);
    const [loadingData, setLoadingData] = useState(true);
    const [code, setCode] = useState('');
    const [eng_name, setEnName] = useState('');
    const [mm_name, setMMName] = useState('');
    const [model, setModel] = useState('');
    const [qty, setQty] = useState('');
    const [price, setPrice] = useState('');
    const [itemLocation, setItemLocation] = useState('');

    const setData = () => {
        setEditItem(item);
        setCode(item.code);
        setEnName(item.eng_name);
        setMMName(item.mm_name);
        setModel(item.model);
        setQty(item.qty);
        setPrice(item.price);
        setItemLocation(item.location);
    }

    const httpHandler = (response) => {
        if(response && response.success === false) {
            dispatch(setOpenToastAction('Edit Item', response.message, 'danger'));
            setLoading(false);
            setLoadingData(false);
            return;
        }
    }

    const update = async () => {
        const requestBody = {
            code: code,
            eng_name: eng_name,
            mm_name: mm_name,
            model: model,
            qty: qty,
            price: price,
            location: itemLocation
        }

        const fileds = Object.keys(requestBody);

        fileds.map((field) => {
            if(requestBody[field] === editItem[field]) {
                delete requestBody[field];
            }
        });

        if(Object.keys(requestBody).length > 0) {
            setLoadingData(true);
            setLoading(true);

            const response = await updateItem(id, requestBody);
            httpHandler(response);
            dispatch(setOpenToastAction('Update Item', 'Item is updated!', 'success'));
            setLoadingData(false);
            setLoading(false);
            reload();
        }

        return;
    }

    useState(() => {
        setLoadingData(true);
        if(item) {
            setData();
            setLoadingData(false);
        }
    }, [item]);

    return(
        <Card>
            <Card.Header>
                <Card.Title className="d-md-flex flex-md-row justify-content-between align-items-center"> 
                    <span className={`${zawgyi(lang)}`}> {t('item-edit-title')} </span>
                    <BsArrowCounterclockwise size={20} className="btn-icon" onClick={() => setData()} />
                </Card.Title>
            </Card.Header>

            { editItem && !loadingData && (
                <Card.Body>
                    <InputGroup className="mb-3">
                        <FormControl 
                            type="text"
                            className={`${zawgyi(lang)}`}
                            placeholder={`${t('input-item-create-code')}`}
                            value={code}
                            onChange={e => setCode(e.target.value)}
                        />
                    </InputGroup>

                    <InputGroup className="mb-3">
                        <FormControl 
                            type="text"
                            className={`${zawgyi(lang)}`}
                            placeholder={`${t('input-item-create-eng-name')}`}
                            value={eng_name}
                            onChange={e => setEnName(e.target.value)}
                        />
                    </InputGroup>

                    <InputGroup className="mb-3">
                        <FormControl 
                            type="text"
                            className={`${zawgyi(lang)}`}
                            placeholder={`${t('input-item-create-mm-name')}`}
                            value={mm_name}
                            onChange={e => setMMName(e.target.value)}
                        />
                    </InputGroup>

                    <InputGroup className="mb-3">
                        <FormControl 
                            type="text"
                            className={`${zawgyi(lang)}`}
                            placeholder={`${t('input-item-create-model')}`}
                            value={model}
                            onChange={e => setModel(e.target.value)}
                        />
                    </InputGroup>

                    <InputGroup className="mb-3">
                        <FormControl 
                            type="number"
                            className={`${zawgyi(lang)}`}
                            placeholder={`${t('input-item-create-qty')}`}
                            value={qty}
                            onChange={e => setQty(e.target.value)}
                        />
                    </InputGroup>

                    <InputGroup className="mb-3">
                        <FormControl 
                            type="text"
                            className={`${zawgyi(lang)}`}
                            placeholder={`${t('input-item-create-price')}`}
                            value={price}
                            onChange={e => setPrice(e.target.value)}
                        />
                    </InputGroup>

                    <InputGroup className="mb-3">
                        <FormControl 
                            type="text"
                            className={`${zawgyi(lang)}`}
                            placeholder={`${t('input-item-create-location')}`}
                            value={itemLocation}
                            onChange={e => setItemLocation(e.target.value)}
                        />
                    </InputGroup>
                </Card.Body>
            )}

            {editItem && !loadingData && (
                <Card.Footer>
                    <Button 
                        className={`btn-small w-full ${zawgyi(lang)}`} 
                            disabled={loading}
                            onClick={() => update()}
                        >
                            {t('item-update-btn')}
                    </Button>
                </Card.Footer>
            )}

            { loadingData && (
                <Card.Body>
                    <LoadingComponent />
                </Card.Body>
            )}
        </Card>
    );
}