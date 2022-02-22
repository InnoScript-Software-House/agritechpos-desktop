import React, { useState } from "react";
import { Card, FormControl, InputGroup } from "react-bootstrap";
import { t, zawgyi } from "../../utilities/translation.utility";


export const EditItemComponent = ({ props, item }) => {

    const { lang } = props.reducer;
    const [editItem, setEditItem] = useState(null);
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

    useState(() => {
        if(item) {
            setData();
        }
    }, [item]);

    return(
        <Card>
            <Card.Header>
                <Card.Title> 
                    <span className={`${zawgyi(lang)}`}> {t('item-edit-title')} </span>
                </Card.Title>
            </Card.Header>

            { editItem && (
                <Card.Body>
                    <InputGroup className="mb-3">
                        <FormControl 
                            type="text"
                            className={`${zawgyi(lang)}`}
                            placeholder={`${t('item-code')}`}
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
        </Card>
    );
}