import React, { useEffect, useState } from "react";
import { FormControl, InputGroup } from "react-bootstrap";
import { useSelector } from "react-redux";
import { t, zawgyi } from "../../utilities/translation.utility";

export const CustomerComponent = ({ input, retrive }) => {

    const [customerName, setCustomerName] = useState('');
    const [customerPhone, setCustomerPhone] = useState('');
    const [customerEmail, setCustomerEmail] = useState('');
    const [customerAddress, setCustomerAddress] = useState('');

    const state = useSelector(state => state);
    const { lang } = state;

    const updateCustomerInfo = (e, type) => {
        let customer = {
            name: customerName,
            phone: customerPhone,
            email: customerEmail,
            address: customerAddress
        }

        customer.name = type === 'name' ? e : customerName;
        customer.phone = type === 'phone' ? e : customerPhone;
        customer.email = type === 'email' ? e : customerEmail;
        customer.address = type === 'address' ? e : customerAddress;

        retrive(customer);
        return;
    }

    useEffect(() => {
        if(input) {
            setCustomerAddress(input.address? input.address: '');
            setCustomerEmail(input.email? input.email: '');
            setCustomerName(input.name);
            setCustomerPhone(input.phone? input.phone: '');
        }
    }, [input]);

    return(
        <>
            <InputGroup>
                <FormControl 
                    className='me-3'
                    type="text"
                    placeholder={t('name')}
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    onBlur={(e) => updateCustomerInfo(e.target.value, 'name')}
                />

                <FormControl 
                    className='me-3'
                    type="text"
                    placeholder={t('phone')}
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    onBlur={(e) => updateCustomerInfo(e.target.value, 'phone')}

                />

                <FormControl 
                    className='me-3'
                    type="text"
                    placeholder={t('email')}
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    onBlur={(e) => updateCustomerInfo(e.target.value, 'email')}
                />
            </InputGroup>

            <InputGroup className='me-3'>
                <FormControl
                    as={'textarea'}
                    placeholder={t('address')}
                    value={customerAddress}
                    onChange={(e) => setCustomerAddress(e.target.value)}
                    onBlur={(e) => updateCustomerInfo(e.target.value, 'address')}
                />
            </InputGroup>
        </>
    )
}