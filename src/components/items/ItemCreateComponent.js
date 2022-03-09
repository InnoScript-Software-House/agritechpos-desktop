
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
    const [code, setCode] = useState('');
    const [percentage, setPercentage] = useState(0);

    const dispatch = useDispatch();

    const itemSave = async () => {
        if(eng_name === '') {
            dispatch(setOpenToastAction(t('toast-item'), t('valitation-item-name-empty'), 'danger'));
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
            dispatch(setOpenToastAction(t('toast-item'), response.message, 'danger'));
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
                <Card.Title>
                    <span className={`${zawgyi(lang)} title`}> {t('item-create-title')} </span>
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
                            placeholder={`${t('input-item-code')}`}
                            value={code}
                            onChange={e => setCode(e.target.value)}
                        />
                    </InputGroup>

                    <InputGroup className="mb-3">
                        <FormControl
                            className={`${zawgyi(lang)}`}
                            type="text"
                            placeholder={`${t('input-item-eng-name')}`}
                            value={eng_name}
                            onChange={e => setEngName(e.target.value)}
                        />
                    </InputGroup>

                    <InputGroup className="mb-3">
                        <FormControl
                            className={`${zawgyi(lang)}`}
                            type="text"
                            placeholder={`${t('input-item-mm-name')}`}
                            value={mm_name}
                            onChange={e => setMName(e.target.value)}
                        />
                    </InputGroup>

                    <InputGroup className="mb-3">
                        <FormControl
                            className={`${zawgyi(lang)}`}
                            type="text"
                            placeholder={`${t('input-item-model')}`}
                            value={model}
                            onChange={e => setModel(e.target.value)}
                        />
                    </InputGroup>

                    <div className="d-flex flex-column">
                        <div className="row mb-1">
                            <span>{t('input-item-qty')}</span>
                        </div>
                        <div className="row">
                            <InputGroup className="mb-3">
                                <FormControl
                                    className={`${zawgyi(lang)}`}
                                    type="number"
                                    placeholder={`${t('input-item-qty')}`}
                                    value={qty}
                                    onChange={e => setQty(e.target.value)}
                                />
                            </InputGroup>
                        </div>
                    </div>

                    <div className="d-flex flex-column">
                        <div className="row mb-1">
                            <span>{t('input-item-price')}</span>
                        </div>
                        <div className="row">
                            <InputGroup className="mb-3">
                                <FormControl
                                    className={`${zawgyi(lang)}`}
                                    type="text"
                                    placeholder={`${t('input-item-price')}`}
                                    value={price}
                                    onChange={e => setPrice(e.target.value)}
                                />
                            </InputGroup>
                        </div>
                    </div>

                    <div className="d-flex flex-column">
                        <div className="row mb-1">
                            <span>{t('input-item-percentage')}</span>
                        </div>
                        <div className="row">
                            <InputGroup className="mb-3">
                                <FormControl
                                    className={`${zawgyi(lang)}`}
                                    type="number"
                                    placeholder={`${t('input-percentage')}`}
                                    value={percentage}
                                    onChange={e => setPercentage(e.target.value)}
                                />
                            </InputGroup>
                        </div>
                    </div>

                    <InputGroup className="mb-3">
                        <FormControl
                            className={`${zawgyi(lang)}`}
                            type="text"
                            placeholder={`${t('input-item-location')}`}
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
                    {t('btn-save')}
                </Button>
            </Card.Footer>
        </Card>
    )
}