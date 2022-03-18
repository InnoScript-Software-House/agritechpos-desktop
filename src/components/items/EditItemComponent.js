import React, { useState } from "react";
import { Button, Card, FormControl, FormLabel, InputGroup } from "react-bootstrap";
import { BsArrowCounterclockwise } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { setOpenToastAction } from "../../redux/actions/toast.action";
import { updateItem } from "../../services/item.service";

export const EditItemComponent = ({ props, item, reload }) => {

    const { id } = props.match.params;

    const dispatch = useDispatch();

    const [editItem, setEditItem] = useState(null);
    const [loading, setLoading] = useState(false);
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
            setLoading(true);

            const response = await updateItem(id, requestBody);

            if(response && response.success === false) {
                dispatch(setOpenToastAction('Item Update', response.message, 'danger'));
                setLoading(false);
                return;
            }

            dispatch(setOpenToastAction('Item Update', 'Item is updated', 'success'));
            setLoading(false);
            reload();
        }

        return;
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
                    <span className="title"> Update Item </span>
                    <BsArrowCounterclockwise size={20} className="btn-icon" onClick={() => setData()} />
                </Card.Title>
            </Card.Header>

            { editItem && (
                <Card.Body>
                    <FormLabel> Material Code </FormLabel>
                    <InputGroup className="mb-3">
                        <FormControl 
                            type="text"
                            placeholder="Material Code"
                            value={code || ''}
                            onChange={e => setCode(e.target.value)}
                        />
                    </InputGroup>

                    <FormLabel> English Name </FormLabel>
                    <InputGroup className="mb-3">
                        <FormControl 
                            type="text"
                            placeholder="English Name"
                            value={eng_name || ''}
                            onChange={e => setEnName(e.target.value)}
                        />
                    </InputGroup>

                    <FormLabel> Myanmar Name </FormLabel>
                    <InputGroup className="mb-3">
                        <FormControl 
                            type="text"
                            placeholder="Myanmar Name"
                            value={mm_name || ''}
                            onChange={e => setMMName(e.target.value)}
                        />
                    </InputGroup>

                    <FormLabel> Model </FormLabel>
                    <InputGroup className="mb-3">
                        <FormControl 
                            type="text"
                            placeholder="Model"
                            value={model || ''}
                            onChange={e => setModel(e.target.value)}
                        />
                    </InputGroup>

                    <FormLabel> Qty </FormLabel>
                    <InputGroup className="mb-3">
                        <FormControl 
                            type="number"
                            placeholder="Qty"
                            value={qty || 0}
                            onChange={e => setQty(e.target.value)}
                        />
                    </InputGroup>

                    <FormLabel> Price </FormLabel>
                    <InputGroup className="mb-3">
                        <FormControl 
                            type="text"
                            placeholder="Price"
                            value={price || ''}
                            onChange={e => setPrice(e.target.value)}
                        />
                    </InputGroup>

                    <FormLabel> Location </FormLabel>
                    <InputGroup className="mb-3">
                        <FormControl 
                            type="text"
                            placeholder="Location"
                            value={itemLocation || ''}
                            onChange={e => setItemLocation(e.target.value)}
                        />
                    </InputGroup>
                </Card.Body>
            )}

            {editItem && (
                <Card.Footer>
                    <Button className="btn-small w-full" disabled={loading} onClick={() => update()}> Update </Button>
                </Card.Footer>
            )}
        </Card>
    );
}