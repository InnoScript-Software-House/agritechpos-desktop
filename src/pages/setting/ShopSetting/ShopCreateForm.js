import React, {useState} from 'react';
import {Button, Card, FormControl, InputGroup} from 'react-bootstrap';
import {useDispatch} from 'react-redux';

import {t} from 'i18next';
import { messageBoxType } from '../../../utilities/native.utility';
import { createShop } from '../../../services/shop.service';

export const ShopCreateForm = ({retrive}) => {
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [phone, setPhone] = useState('');
	const [email, setEmail] = useState('');
	const [address, setAddress] = useState('');
	const [loading, setLoading] = useState(false);
	const [messageBoxTitle, setMessageBoxTitle] = useState('Create Shop');

	const dispatch = useDispatch();

	const checkphone = /^(\+?(95)|[09])\d{10}/g;
	const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	const create = async () => {
		const {nativeApi} = window;
		if (name === '' || description === '' || phone === '' || address === '') {
			nativeApi.messageBox.open({
				title: messageBoxTitle,
				message: 'All fields are required',
				type: messageBoxType.error
			});
			return;
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
			nativeApi.messageBox.open({
				title: messageBoxTitle,
				message: response.message,
				type: messageBoxType.error
			});
			setLoading(false);
			return;
		}

		if (response) {
			nativeApi.messageBox.open({
				title: messageBoxTitle,
				message: 'Shop is created',
				type: messageBoxType.info
			});
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
