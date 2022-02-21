import React, { useEffect, useState } from 'react';
import { Button, Card, FormControl, InputGroup } from 'react-bootstrap';
import { t, zawgyi } from '../../utilities/translation.utility';
import { createShop } from '../../services/shop.service';
import { useDispatch } from 'react-redux';
import { setOpenToastAction } from '../../redux/actions/toast.action';

import '../../assets/css/components/shop.css';

export const CreateShopFormComponent = ({ props, retrive }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const { lang } = props.reducer;

    const dispatch = useDispatch();
    const checkphone = /^(\+?(95)|[09])\d{10}/g;
    var pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const create = async () => {
        if(name === '' || description === '' || phone === '' || email === '' || address === '') {
            return dispatch(setOpenToastAction('Shop Create', t('shop-create-empty-error'),'danger'));
            // setError(t('shop-create-empty-error'));
        }

        if(!checkphone.test(phone)) {
            return dispatch(setOpenToastAction('Shop Create', t('shop-create-phone-error'),'danger'));
            // setError(t('shop-create-phone-error'));
        }

        if(!pattern.test(email))
        {
            return dispatch(setOpenToastAction('Shop Create', t('invalid-email-error'),'danger'));
            // setError('invalid-email-error');
        }

        const requestBody = {
            name: name,
            description: description,
            phone: phone,
            address: address,
            email: email
        }

        setLoading(true);

        const response = await createShop(requestBody);
        
        if(response.success === false) {
            dispatch(setOpenToastAction('Create Shop', response.message,'danger'));
            // setError(response.message);
            setLoading(false);
            return;
        }

        if(response) {
            dispatch(setOpenToastAction('Create Shop', 'Create Shop Successful', 'success'))
            setLoading(false);
            setError(null);
            retrive(response)
            return;
        }
    }

    return(
        <div className='col-7'>
            <div className='d-flex flex-column'>
                <Card className='m-3'>
                    <Card.Title className={`m-3 ${zawgyi(lang)}`}> {t('shop-create-title')} </Card.Title>

                    <Card.Body>
                        <InputGroup className='mb-3'>
                            <FormControl
                                className={`${zawgyi(lang)}`}
                                type='text'
                                value={name}
                                placeholder={`${t('shop-input-name')}`}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </InputGroup>

                        <InputGroup className='mb-3'>
                            <FormControl
                                className={`${zawgyi(lang)}`}
                                type='text'
                                value={description}
                                placeholder={`${t('shop-input-description')}`}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </InputGroup>

                        <InputGroup className='mb-3'>
                            <FormControl
                                className={`${zawgyi(lang)}`}
                                as="textarea"
                                value={address}
                                placeholder={`${t('shop-input-address')}`}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </InputGroup>

                        <InputGroup className='mb-3'>
                            <FormControl 
                                className='me-3'
                                type="phone"
                                value={phone}
                                placeholder={`${t('shop-input-phone')}`}
                                onChange={(e) => setPhone(e.target.value)}
                            />

                            <FormControl 
                                type="email"
                                value={email}
                                placeholder={`${t('shop-input-email')}`}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </InputGroup>

                        <div className='d-flex flex-row justify-content-start align-items-center'>
                            <Button
                                className={`${zawgyi(lang)}`}
                                onClick={() => create()}
                                disabled={loading}
                            > 
                                {t('shop-btn-create')} 
                            </Button>

                            {error && (
                                <label className={`ms-3 shop-error ${zawgyi(lang)}`}> {error} </label>
                            )}
                        </div>
                    </Card.Body>
                </Card>
            </div>
        </div>
    )
}