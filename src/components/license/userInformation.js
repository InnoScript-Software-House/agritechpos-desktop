import React, { useState } from "react";
import { Button, FormControl, InputGroup } from "react-bootstrap";
import { t, zawgyi } from "../../utilities/translation.utility";
import { ArrowLeft } from "react-bootstrap-icons";
import { useDispatch } from 'react-redux';
import { setOpenToastAction } from "../../redux/actions/toast.action";
import '../../assets/css/components/user-register-info-form.css';

export const UserInformationForm = ({ lng, retriveUserInfo, backStep }) => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');

    const [err, setErr] = useState(null);
    const dispatch = useDispatch();
    const checkphone = /^(\+?(95)|[09])\d{10}/g;

    var pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const submit = () => {
        if(firstName === '' || lastName === '' || email === '' || phone === '' || address === '') {
            dispatch(setOpenToastAction('User Info',t('user-info-empty-error'),'danger'));
            return;
        }

        if(!pattern.test(email)){
            dispatch(setOpenToastAction('User Info',t('invalid-email-error'),'danger'));
            return
        }

        if(!checkphone.test(phone)){
            dispatch(setOpenToastAction('User Info',t('Invalid Phone Number'),'danger'));
            return
        }

        setErr(null);

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
        <div className="flex-row m-2">
            <p className={`${zawgyi(lng)}`}> {t('demo-text')} </p>

            <div className="d-flex flex-column">
                <ArrowLeft className="back-arrow" size={40} onClick={(e) => backStep('serial-key')} />
                <label className={`user-label mb-3 mt-3 ${zawgyi(lng)}`}> {t('user-description-title')} </label>
            </div>
            
            <div className="d-flex flex-column">
                <div className="d-flex flex-row justify-content-between mb-3">
                    <InputGroup className="input-between me-3">
                        <FormControl
                            type="text"
                            required={true}
                            value={firstName}
                            placeholder={t('user-first-name')}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </InputGroup>

                    <InputGroup className="input-between ms-3">
                        <FormControl
                            type="text"
                            required={true}
                            value={lastName}
                            placeholder={t('user-last-name')}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </InputGroup>
                </div>

                <div className="d-flex flex-row justify-content-between mb-3">
                    <InputGroup className="input-between me-3">
                        <FormControl
                            type="text"
                            required={true}
                            value={phone}
                            placeholder={t('user-phone')}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </InputGroup>

                    <InputGroup className="input-between ms-3">
                        <FormControl
                            type="email"
                            required={true}
                            value={email}
                            placeholder={t('user-email')}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </InputGroup>
                </div>

                <div className="d-flex flex-row justify-content-between mb-3">
                    <InputGroup className="address-input me-3">
                        <FormControl
                            as="textarea"
                            rows={3}
                            required={true}
                            value={address}
                            placeholder={t('user-address')}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </InputGroup>
                </div>

            </div>

            <div className="d-flex flex-row">
                <Button 
                    className={`${zawgyi(lng)}`} 
                    onClick={() => submit()}
                > 
                    {t('serial-key-submit')} 
                </Button>
            </div>

            {/* { err && (<label className={`serial-key-err-message mt-3 mb-3 ${zawgyi(lng)}`}> {err} </label>)} */}
            
        </div>
    )
}