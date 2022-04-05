import React, {useEffect, useState} from 'react';
import {FormControl, InputGroup} from 'react-bootstrap';
import {useDispatch} from 'react-redux';
import {setOpenToastAction} from '../../redux/actions/toast.action';
import {t} from '../../utilities/translation.utility';
import {AutoCompleteDropDown} from '../general/autoCompleteDropDown';

export const SaleVoucherInputComponent = ({dataSource, retrive, selectedItem}) => {
	const dispatch = useDispatch();
	const [qty, setQty] = useState('');
	const [items, setItems] = useState([]);
	const [item, setItem] = useState(null);

	const addItem = e => {
		if (!Number(qty)) {
			dispatch(setOpenToastAction('Item', 'Invalid qty', 'danger'));
			return;
		}

		if (Number(item.totalQty) < Number(e) || Number(e) <= 0) {
			dispatch(setOpenToastAction('Item', "Invalid request item's qty", 'danger'));
			return;
		}

		item.requestQty = Number(e);
		item.totalAmount = Number(e) * Number(item.sell_price);
		item.totalOriginAmount = Number(e) * Number(item.price);

		const getCurrentInvoice = localStorage.getItem('CURRENT_INVOICE')
			? JSON.parse(localStorage.getItem('CURRENT_INVOICE'))
			: [];
		// const checkItem = getCurrentInvoice.filter(value => value.code === item.code);

		// if (checkItem.length > 0) {
		// 	dispatch(setOpenToastAction('Item', 'Item is already exist', 'danger'));
		// 	return;
		// }

		getCurrentInvoice.push(item);
		localStorage.setItem('CURRENT_INVOICE', JSON.stringify(getCurrentInvoice));

		retrive(item);
		selectedItem(null);
	};

	useEffect(
		() => {
			if (dataSource) {
				setItems(dataSource);
			}

			if (item !== null) {
				selectedItem(item);
			}
		},
		[dataSource, item]
	);

	return (
		<div className="d-md-flex flex-md-row align-items-start justify-content-end">
			<AutoCompleteDropDown
				dataSource={items}
				inputOption={{
					type: 'text',
					placeholder: t('input-item-code'),
					search_name: 'code',
					for: 'items'
				}}
				chooseItem={e =>
					setItem({
						id: e.id,
						name: e.eng_name,
						model: e.model,
						code: e.code,
						price: Number(e.price),
						totalQty: Number(e.qty),
						percentage: Number(e.percentage),
						sell_price: Number(e.price) * Number(e.percentage) / 100 + Number(e.price),
						location: e.location
					})}
			/>

			<InputGroup>
				<FormControl
					type="text"
					placeholder={t('item-qty')}
					value={qty}
					onChange={e => setQty(e.target.value)}
					onKeyPress={e => {
						if (e.code === 'Enter') {
							addItem(e.target.value);
						}
					}}
				/>
			</InputGroup>
		</div>
	);
};
