import React, { useEffect, useState } from 'react';
import { Button, Card, FormControl, InputGroup } from 'react-bootstrap';
import { updateShop } from '../../services/shop.service';
import { useDispatch } from 'react-redux';
import { setOpenToastAction } from '../../redux/actions/toast.action';

export const EditShopFormComponent = ({ dataSource, retrive }) => {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [loading, setLoading] = useState(false);

    const checkphone = /^(\+?(95)|[09])\d{10}/g;
    const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
   
    const dispatch = useDispatch();

    useEffect(() => {
        if(dataSource) {
            setName(dataSource.name);
            setDescription(dataSource.description);
            setPhone(dataSource.phone);
            setEmail(dataSource.email);
            setAddress(dataSource.address);
        }
    }, [dataSource]);

    const update = async () => {
        if(name === '' || description === '' || phone === '' || email === '' || address === '') {
            return dispatch(setOpenToastAction('Shop Create', 'All fileds are required','danger'));
        }

        if(!checkphone.test(phone)) {
            return dispatch(setOpenToastAction('Shop Create', 'Invalid phone numnber','danger'));
        }

        if(!pattern.test(email)){
            return dispatch(setOpenToastAction('Shop Create', 'Invalid email address','danger'));
        }

        const requestBody = {
            name: name,
            description: description,
            phone: phone,
            address: address,
            email: email
        }

        setLoading(true);

        const response = await updateShop(requestBody);

        if(response && response.success === false) {
            setLoading(false);
            dispatch(setOpenToastAction('Shop Update', response.message,'danger'));
            return;
        }

        if(response) {
            dispatch(setOpenToastAction('Shop Update', 'Shop info is updated','success'));
            setLoading(false);
            retrive(response)
            return;
        }
    }

    return(
        <Card>
            <Card.Header>
                <Card.Title> Update Shop Information </Card.Title>
            </Card.Header>
        
            <Card.Body>
                <InputGroup className='mb-3'>
                    <FormControl
                        type='text'
                        value={name}
                        placeholder="Shop Name"
                        onChange={(e) => setName(e.target.value)}
                    />
                </InputGroup>

                <InputGroup className='mb-3'>
                    <FormControl
                        type='text'
                        value={description}
                        placeholder="Description"
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </InputGroup>

                <InputGroup className='mb-3'>
                    <FormControl
                        as="textarea"
                        value={address}
                        placeholder="Address"
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </InputGroup>

                <InputGroup className='mb-3'>
                    <FormControl 
                        className='me-3'
                        type="phone"
                        value={phone}
                        placeholder="Phone"
                        onChange={(e) => setPhone(e.target.value)}
                    />

                    <FormControl 
                        type="email"
                        value={email}
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </InputGroup>

                <div className='d-flex flex-row justify-content-start align-items-center'>
                    <Button onClick={() => update()} disabled={loading}> Create Shop </Button>
                </div>
            </Card.Body>
        </Card>
    )
}