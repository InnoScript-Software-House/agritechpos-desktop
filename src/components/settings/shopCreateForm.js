import React, {useState} from 'react';
import {Button, Card, FormControl, InputGroup} from 'react-bootstrap';
import {createShop} from '../../services/shop.service';
import {useDispatch} from 'react-redux';
import {setOpenToastAction} from '../../redux/actions/toast.action';
import { t } from 'i18next';

export const CreateShopFormComponent = ({retrive}) => {
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [phone, setPhone] = useState('');
	const [email, setEmail] = useState('');
	const [address, setAddress] = useState('');
	const [loading, setLoading] = useState(false);

	const dispatch = useDispatch();

	const checkphone = /^(\+?(95)|[09])\d{10}/g;
	const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	const create = async () => {
		if (name === '' || description === '' || phone === '' || address === '') {
			return dispatch(setOpenToastAction('Create Shop', 'All fields are required', 'danger'));
		}

		// if(!checkphone.test(phone)) {
		//     return dispatch(setOpenToastAction('Create Shop', 'Invalid phone number','danger'));
		// }

		// if(!pattern.test(email)) {
		//     return dispatch(setOpenToastAction('Create Shop', 'Invalid email address','danger'));
		// }

		const requestBody = {
			name: name,
			description: description,
			phone: phone,
			address: address,
			email: email
		};

		setLoading(true);

		const response = await createShop(requestBody);

		if (response.success === false) {
			dispatch(setOpenToastAction('Create Shop', response.message, 'danger'));
			setLoading(false);
			return;
		}

		if (response) {
			dispatch(setOpenToastAction('Create Shop', 'Shop is created', 'success'));
			setLoading(false);
			retrive(response);
			return;
		}
	};

	return (
		<Card>
			<Card.Header>
				<Card.Title> {t('create-shop-information')} </Card.Title>
			</Card.Header>

			<Card.Body>
				<InputGroup className="mb-3">
					<FormControl
						type="text"
						value={name}
						placeholder={t('name')}
						onChange={e => setName(e.target.value)}
					/>
				</InputGroup>

				<InputGroup className="mb-3">
					<FormControl
						type="text"
						value={description}
						placeholder={t('description')}
						onChange={e => setDescription(e.target.value)}
					/>
				</InputGroup>

				<InputGroup className="mb-3">
					<FormControl
						as="textarea"
						value={address}
						placeholder={t('address')}
						onChange={e => setAddress(e.target.value)}
					/>
				</InputGroup>

				<InputGroup className="mb-3">
					<FormControl
						className="me-3"
						type="phone"
						value={phone}
						placeholder={t('phone')}
						onChange={e => setPhone(e.target.value)}
					/>

					<FormControl
						type="email"
						value={email}
						placeholder={t('email')}
						onChange={e => setEmail(e.target.value)}
					/>
				</InputGroup>

				<div className="d-flex flex-row justify-content-start align-items-center">
					<Button onClick={() => create()} disabled={loading}>
						{' '}
						{t('confirm')} {' '}
					</Button>
				</div>
			</Card.Body>
		</Card>
	);
};
