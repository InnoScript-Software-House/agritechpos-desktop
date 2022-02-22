import React, { useState } from "react";
import { Button, Card, FormControl, InputGroup } from "react-bootstrap";
import { BsArrowCounterclockwise } from "react-icons/bs";
import { t, zawgyi } from "../../utilities/translation.utility";

export const EditItemComponent = ({ props, item }) => {

    const { lang } = props.reducer;
    const dispatch = useDispath();

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

    const update = () => {
        const requestBody = {
            
        }
    }

    useState(() => {
        if(item) {
            setData();
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

            <Card.Footer>
                <Button className={`btn-small ${zawgyi(lang)}`} onClick={() => update()}>
                    {t('item-update-btn')}
                </Button>
            </Card.Footer>
        </Card>
    );
}