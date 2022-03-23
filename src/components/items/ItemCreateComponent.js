
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Card, FormControl, FormLabel, InputGroup } from "react-bootstrap";
import { saveItem } from "../../services/item.service";
import { setOpenToastAction } from '../../redux/actions/toast.action';

export const ItemCreateComponent = ({ props, categoriesList, reload }) => {

    const [btnLoading, setBtnLoading] = useState(false);
    const [categories, setCategories] = useState(categoriesList);
    const [category, setCategory] = useState('');

    const [eng_name, setEngName] = useState('');
    const [mm_name, setMName] = useState('');
    const [model, setModel] = useState('');
    const [qty, setQty] = useState(0);
    const [price, setPrice] = useState(0);
    const [location, setLocation] = useState('');
    const [code, setCode] = useState('');
    const [percentage, setPercentage] = useState(0);

    const dispatch = useDispatch();

    const itemSave = async () => {

        if(!Number(price) || !Number(qty) || !Number(percentage)) {
            dispatch(setOpenToastAction('Create Item', 'Invalid Input', 'danger'));
            return;
        }

        if(eng_name === '') {
            dispatch(setOpenToastAction('Create Item', 'English name is required', 'danger'));
            return;
        }

        const requestBody = {
            eng_name: eng_name,
            mm_name: mm_name,
            model: model,
            qty: qty,
            price: price,
            location: location,
            category_id: category,
            code: code,
            percentage: percentage
        }

        setBtnLoading(true);

        const response = await saveItem(requestBody);
        if(response && response.success === false) {
            dispatch(setOpenToastAction('Create Item', response.message, 'danger'));
            setBtnLoading(false);
            return;
        }
        setBtnLoading(false);
        reload();
    }

    useEffect(() => {
        setCategories(categoriesList);

        if(categoriesList.length > 0) {
            setCategory(categoriesList[0].id);
        } 
    }, [categoriesList]);

    return(
        <Card className='mt-3'>
            <Card.Header>
                <Card.Title> Create New Item </Card.Title>
            </Card.Header>

            <Card.Body>
                <>
                    <FormLabel> Category </FormLabel>
                    <InputGroup className="mb-3">
                        <FormControl
                            as="select"
                            value={category}
                            onChange={e => setCategory(e.target.value)}
                        >
                            {categories.length > 0 && categories.map((cat, index) => {
                                return(
                                    <option key={`cat_id_${index}`} value={cat.id}> { cat.name} </option>
                                )
                            })}
                        </FormControl>
                    </InputGroup>
                    
                    <FormLabel> Material Code </FormLabel>
                    <InputGroup className="mb-3">
                        <FormControl
                            type="text"
                            placeholder="Material Code"
                            value={code}
                            onChange={e => setCode(e.target.value)}
                        />
                    </InputGroup>
                    
                    <FormLabel> English Name </FormLabel>
                    <InputGroup className="mb-3">
                        <FormControl
                            type="text"
                            placeholder="English Name"
                            value={eng_name}
                            onChange={e => setEngName(e.target.value)}
                        />
                    </InputGroup>
                    
                    <FormLabel> Myanmar Name </FormLabel>
                    <InputGroup className="mb-3">
                        <FormControl
                            type="text"
                            placeholder="Myanamr Name"
                            value={mm_name}
                            onChange={e => setMName(e.target.value)}
                        />
                    </InputGroup>
                    
                    <FormLabel> Model </FormLabel>
                    <InputGroup className="mb-3">
                        <FormControl
                            type="text"
                            placeholder="Model"
                            value={model}
                            onChange={e => setModel(e.target.value)}
                        />
                    </InputGroup>

                    <FormLabel> Qty </FormLabel>
                    <InputGroup className="mb-3">
                        <FormControl
                            type="text"
                            placeholder="Qty"
                            value={qty}
                            onChange={e => setQty(e.target.value)}
                        />
                    </InputGroup>

                    <FormLabel> Price </FormLabel>
                    <InputGroup className="mb-3">
                        <FormControl
                            type="text"
                            placeholder="Price"
                            value={price}
                            onChange={e => setPrice(e.target.value)}
                        />
                    </InputGroup>

                    <FormLabel> Sell Percentage </FormLabel>
                    <InputGroup className="mb-3">
                        <FormControl
                            type="text"
                            placeholder="Sell Percentage"
                            value={percentage}
                            onChange={e => setPercentage(e.target.value)}
                        />
                    </InputGroup>
                    
                    <FormLabel> Location </FormLabel>
                    <InputGroup>
                        <FormControl
                            type="text"
                            placeholder="Location"
                            value={location}
                            onChange={e => setLocation(e.target.value)}
                        />
                    </InputGroup>
                </>
            </Card.Body>

            <Card.Footer className="d-flex flex-column">
                <Button 
                    className="btn-small mb-3"
                    onClick={() => itemSave()}
                    disabled={btnLoading}
                >
                    Save
                </Button>
            </Card.Footer>
        </Card>
    )
}