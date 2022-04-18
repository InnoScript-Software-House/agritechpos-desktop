import React, {useState} from 'react';
import {Button, Card, FormControl, InputGroup} from 'react-bootstrap';
import {useDispatch} from 'react-redux';
import {setOpenToastAction} from '../../redux/actions/toast.action';
import {saveCategory} from '../../services/category.service';
import {t} from 'i18next';
import {messageBoxType} from '../../utilities/native.utility';

export const CreateCategoryComponent = ({reload}) => {
	const dispatch = useDispatch();

	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [loading, setLoading] = useState('');
	const [messageBoxTitle, setMessageBoxTitle] = useState('Create Category');

	const reset = () => {
		setName('');
		setDescription('');
		setLoading(false);
	};

	const createCategory = async () => {
		const {nativeApi} = window;
		if (name === '') {
			nativeApi.messageBox.open({
				title: messageBoxTitle,
				message: 'category name is required',
				type: messageBoxType.error
			});
			return;
		}

		const requestBody = {
			name: name,
			description: description
		};

		setLoading(true);

		const response = await saveCategory(requestBody);

		if (response && response.success === false) {
			nativeApi.messageBox.open({
				title: messageBoxTitle,
				message: response.message,
				type: messageBoxType.error
			});
			setLoading(false);
			return;
		}

		nativeApi.messageBox.open({
			title: messageBoxTitle,
			message: 'category is updated',
			type: messageBoxType.info
		});
		setLoading(false);
		reset();
		reload(true);
		return;
	};

	return (
		<Card className="mt-3">
			<Card.Header>
				<Card.Title>
					<span className="title"> {t('create-category')} </span>
				</Card.Title>
			</Card.Header>

			<Card.Body>
				<InputGroup className="mb-3">
					<FormControl
						type="text"
						placeholder={t('name')}
						value={name}
						onChange={e => setName(e.target.value)}
					/>
				</InputGroup>

				<InputGroup className="mb-3">
					<FormControl
						type="text"
						placeholder={t('description')}
						value={description}
						onChange={e => setDescription(e.target.value)}
					/>
				</InputGroup>

				<Button className="btn btn-samll" disabled={loading} onClick={() => createCategory()}>
					{t('confirm')}
				</Button>
			</Card.Body>
		</Card>
	);
};
