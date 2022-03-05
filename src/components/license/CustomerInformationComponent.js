import React, { useState } from "react";
import { Button, FormControl, InputGroup } from "react-bootstrap";
import { t, zawgyi } from "../../utilities/translation.utility";
import { ArrowLeft } from "react-bootstrap-icons";
import { useDispatch } from 'react-redux';
import { setOpenToastAction } from "../../redux/actions/toast.action";

import '../../assets/css/components/license/user-register-info-form.css';

export const CustomerInformationComponent = ({ props, retriveUserInfo, backStep }) => {

    const { lang } = props.reducer;
    const dispatch = useDispatch();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');

    const checkPhone = /^(\+?(95)|[09])\d{10}/g;
    const checkEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const submit = () => {
        if(firstName === '' || lastName === '' || email === '' || phone === '' || address === '') {
            dispatch(setOpenToastAction(t('toast-license-customer'),t('license-customer-all-field-required'),'danger'));
            return;
        }

        if(!checkEmail.test(email)){
            dispatch(setOpenToastAction(t('toast-license-customer'),t('invalid-email-error'),'danger'));
            return;
        }

        if(!checkPhone.test(phone)){
            dispatch(setOpenToastAction(t('toast-license-customer'),t('invalid-phone-error'),'danger'));
            return;
        }

        const userInfo = {
            first_name: firstName,
            last_name: lastName,
            display_name: `${firstName} ${lastName}`,
            phone: phone,
            email: email,
            address: address
        }

        retriveUserInfo(userInfo);
    }

    return (
        <div className="d-md-flex flex-md-column"> 
            <p className={`mt-3 ${zawgyi(lang)}`}> {t('license-customer-description')} </p>

            <div className="d-md-flex flex-md-column">
                <ArrowLeft className="back-arrow" size={40} onClick={(e) => backStep('serial-key')} />
                <label className={`user-label mb-3 mt-3 ${zawgyi(lang)}`}> {t('license-customer-form-title')} </label>
            </div>

            <div className="d-md-flex flex-md-column">
                <div className="d-md-flex flex-md-row justify-content-between mb-3">
                    <InputGroup className="input-between me-3">
                        <FormControl
                            className={`${zawgyi(lang)}`}
                            type="text"
                            required={true}
                            value={firstName}
                            placeholder={t('license-customer-first-name')}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </InputGroup>

                    <InputGroup className="input-between ms-3">
                        <FormControl
                            className={`${zawgyi(lang)}`}
                            type="text"
                            required={true}
                            value={lastName}
                            placeholder={t('license-customer-last-name')}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </InputGroup>
                </div>

                <div className="d-md-flex flex-md-row justify-content-between mb-3">
                    <InputGroup className="input-between me-3">
                        <FormControl
                            className={`${zawgyi(lang)}`}
                            type="text"
                            required={true}
                            value={phone}
                            placeholder={t('license-customer-phone')}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </InputGroup>

                    <InputGroup className="input-between ms-3">
                        <FormControl
                            className={`${zawgyi(lang)}`}
                            type="email"
                            required={true}
                            value={email}
                            placeholder={t('license-customer-email')}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </InputGroup>
                </div>

                <div className="d-md-flex flex-md-row justify-content-between mb-3">
                    <InputGroup className="address-input me-3">
                        <FormControl
                            className={`${zawgyi(lang)}`}
                            as="textarea"
                            rows={3}
                            required={true}
                            value={address}
                            placeholder={t('license-customer-address')}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </InputGroup>
                </div>

                <Button 
                    className={`${zawgyi(lang)}`} 
                    onClick={() => submit()}
                > 
                    {t('license-customer-submit')} 
                </Button>
            </div>
        </div>
    )
}