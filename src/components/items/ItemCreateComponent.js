import '../../assets/css/theme.css';
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Card, FormControl, FormLabel, InputGroup } from "react-bootstrap";
import { saveItem } from "../../services/item.service";
import { setOpenToastAction } from '../../redux/actions/toast.action';
import { t } from 'i18next';
import { messageBoxType } from '../../utilities/native.utility';
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
    const [messageBoxTitle, setMessageBoxTitle] = useState('Create Item');

    const dispatch = useDispatch();

    const itemSave = async () => {

        if(eng_name === '') {
            window.nativeApi.messageBox.open({title: messageBoxTitle, message: `${t('english-name-is-required')}`, type: messageBoxType.error});
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
            window.nativeApi.messageBox.open({title: messageBoxTitle, message: response.message, type: messageBoxType.error});
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
                <Card.Title className="fontsize"> {t('create-new-item')} </Card.Title>
            </Card.Header>

            <Card.Body>
                <>
                    <FormLabel> {t('category')} </FormLabel>
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
                    
                    <FormLabel> {t('materail-code')} </FormLabel>
                    <InputGroup className="mb-3">
                        <FormControl
                            type="text"
                            placeholder={t('materail-code')}
                            value={code}
                            onChange={e => setCode(e.target.value)}
                        />
                    </InputGroup>
                    
                    <FormLabel> {t('name')} </FormLabel>
                    <InputGroup className="mb-3">
                        <FormControl
                            type="text"
                            placeholder={t('name')}
                            value={eng_name}
                            onChange={e => setEngName(e.target.value)}
                        />
                    </InputGroup>
                    
                    <FormLabel> {t('myanmar-name')} </FormLabel>
                    <InputGroup className="mb-3">
                        <FormControl
                            type="text"
                            placeholder={t('myanmar-name')}
                            value={mm_name}
                            onChange={e => setMName(e.target.value)}
                        />
                    </InputGroup>
                    
                    <FormLabel> {t('model')} </FormLabel>
                    <InputGroup className="mb-3">
                        <FormControl
                            type="text"
                            placeholder={t('model')}
                            value={model}
                            onChange={e => setModel(e.target.value)}
                        />
                    </InputGroup>

                    <FormLabel> {t('quantity')} </FormLabel>
                    <InputGroup className="mb-3">
                        <FormControl
                            type="text"
                            placeholder={t('quantity')}
                            value={qty}
                            onChange={e => setQty(e.target.value)}
                        />
                    </InputGroup>

                    <FormLabel> {t('price')} </FormLabel>
                    <InputGroup className="mb-3">
                        <FormControl
                            type="text"
                            placeholder={t('price')}
                            value={price}
                            onChange={e => setPrice(e.target.value)}
                        />
                    </InputGroup>

                    <FormLabel> {t('percentage')} </FormLabel>
                    <InputGroup className="mb-3">
                        <FormControl
                            type="text"
                            placeholder={t('percentage')}
                            value={percentage}
                            onChange={e => setPercentage(e.target.value)}
                        />
                    </InputGroup>
                    
                    <FormLabel> {t('location')} </FormLabel>
                    <InputGroup>
                        <FormControl
                            type="text"
                            placeholder={t('location')}
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
                    {t('confirm')}
                </Button>
            </Card.Footer>
        </Card>
    )
}