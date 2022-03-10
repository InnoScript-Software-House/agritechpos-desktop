import React, { useState } from "react";
import { Button, FormControl, InputGroup } from "react-bootstrap";
import { ArrowLeft } from "react-bootstrap-icons";
import { useDispatch } from 'react-redux';
import { setOpenToastAction } from "../../redux/actions/toast.action";

export const CustomerInformationComponent = ({ retriveUserInfo, backStep }) => {

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
            dispatch(setOpenToastAction('User Registeration','All fields are requried','danger'));
            return;
        }

        if(!checkEmail.test(email)){
            dispatch(setOpenToastAction('User Registeration','Invalid email address','danger'));
            return;
        }

        if(!checkPhone.test(phone)){
            dispatch(setOpenToastAction('User Registeration','Invalid phone number','danger'));
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
            <p className="mt-3"> Please fill customer information for license registeration process. </p>

            <div className="d-md-flex flex-md-column">
                <ArrowLeft className="back-arrow" size={40} onClick={(e) => backStep('serial-key')} />
                <label className="user-label mb-3 mt-3"> Customer Information </label>
            </div>

            <div className="d-md-flex flex-md-column">
                <div className="d-md-flex flex-md-row justify-content-between mb-3">
                    <InputGroup className="input-between me-3">
                        <FormControl
                            type="text"
                            required={true}
                            value={firstName}
                            placeholder="First Name"
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </InputGroup>

                    <InputGroup className="input-between ms-3">
                        <FormControl
                            type="text"
                            required={true}
                            value={lastName}
                            placeholder="Last Name"
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </InputGroup>
                </div>

                <div className="d-md-flex flex-md-row justify-content-between mb-3">
                    <InputGroup className="input-between me-3">
                        <FormControl
                            type="text"
                            required={true}
                            value={phone}
                            placeholder="Phone"
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </InputGroup>

                    <InputGroup className="input-between ms-3">
                        <FormControl
                            type="email"
                            required={true}
                            value={email}
                            placeholder="Email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </InputGroup>
                </div>

                <div className="d-md-flex flex-md-row justify-content-between mb-3">
                    <InputGroup className="address-input me-3">
                        <FormControl
                            as="textarea"
                            rows={3}
                            required={true}
                            value={address}
                            placeholder="Address"
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </InputGroup>
                </div>

                <Button onClick={() => submit()}> Submit </Button>
            </div>
        </div>
    )
}