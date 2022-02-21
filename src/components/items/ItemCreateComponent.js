
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Card, FormControl, InputGroup } from "react-bootstrap";
import { saveItem } from "../../services/item.service";
import { t, zawgyi } from "../../utilities/translation.utility";
import { setOpenToastAction } from '../../redux/actions/toast.action';

export const ItemCreateComponent = ({ props, categoriesList, reload }) => {

    const { lang } = props.reducer;
    const [btnLoading, setBtnLoading] = useState(false);
    const [categories, setCategories] = useState(categoriesList);
    const [category, setCategory] = useState('');

    const [eng_name, setEngName] = useState('');
    const [mm_name, setMName] = useState('');
    const [model, setModel] = useState('');
    const [qty, setQty] = useState(0);
    const [price, setPrice] = useState(0);
    const [location, setLocation] = useState('');

    const dispatch = useDispatch();

    const httpHandler = (response) => {
        if(response && response.success === false) {
            toastOptions.title = 'Item Create';
            toastOptions.message = response.message;

            dispatch(setOpenToastAction('Create Item', response.message, 'danger'));
            setBtnLoading(false);
            return;
        }
    }

    const itemSave = async () => {
        if(eng_name === '' || mm_name === '') {
            dispatch(setOpenToastAction('Item Create', t('create-item-name-empty'), 'danger'));
            return;
        }

        const requestBody = {
            eng_name: eng_name,
            mm_name: mm_name,
            model: model,
            qty: qty,
            price: price,
            location: location,
            category_id: category
        }

        setBtnLoading(true);

        const saved = await saveItem(requestBody);
        httpHandler(saved);
        setBtnLoading(false);
        reload();
    }

    useEffect(() => {
        setCategories(categoriesList);
    }, [categoriesList]);

    return(
        <Card className='mt-3'>
            <Card.Header>
                <Card.Title>
                    <span className={`${zawgyi(lang)} card-title`}> {t('create-item-title')} </span>
                </Card.Title>
            </Card.Header>

            <Card.Body>
                <>
                    <InputGroup className="mb-3">
                        <FormControl
                            className={`${zawgyi(lang)}`}
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

                    <InputGroup className="mb-3">
                        <FormControl
                            className={`${zawgyi(lang)}`}
                            type="text"
                            placeholder={`${t('input-item-create-eng-name')}`}
                            value={eng_name}
                            onChange={e => setEngName(e.target.value)}
                        />
                    </InputGroup>

                    <InputGroup className="mb-3">
                        <FormControl
                            className={`${zawgyi(lang)}`}
                            type="text"
                            placeholder={`${t('input-item-create-mm-name')}`}
                            value={mm_name}
                            onChange={e => setMName(e.target.value)}
                        />
                    </InputGroup>

                    <InputGroup className="mb-3">
                        <FormControl
                            className={`${zawgyi(lang)}`}
                            type="text"
                            placeholder={`${t('input-item-create-model')}`}
                            value={model}
                            onChange={e => setModel(e.target.value)}
                        />
                    </InputGroup>

                    <InputGroup className="mb-3">
                        <FormControl
                            className={`${zawgyi(lang)}`}
                            type="number"
                            placeholder={`${t('input-item-create-qty')}`}
                            value={qty}
                            onChange={e => setQty(e.target.value)}
                        />
                    </InputGroup>

                    <InputGroup className="mb-3">
                        <FormControl
                            className={`${zawgyi(lang)}`}
                            type="text"
                            placeholder={`${t('input-item-create-price')}`}
                            value={price}
                            onChange={e => setPrice(e.target.value)}
                        />
                    </InputGroup>

                    <InputGroup className="mb-3">
                        <FormControl
                            className={`${zawgyi(lang)}`}
                            type="text"
                            placeholder={`${t('input-item-create-location')}`}
                            value={location}
                            onChange={e => setLocation(e.target.value)}
                        />
                    </InputGroup>
                </>
            </Card.Body>

            <Card.Footer className="d-flex flex-column">
                <Button 
                    className={`btn-small ${zawgyi(lang)} mb-3`}
                    onClick={() => itemSave()}
                    disabled={btnLoading}
                >
                    {t('item-save')}
                </Button>
            </Card.Footer>
        </Card>
    )
}