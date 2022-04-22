import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import {  useSelector } from 'react-redux';
import { BsFillCartCheckFill, BsTrashFill } from 'react-icons/bs';
import { t, zawgyi } from '../../utilities/translation.utility';
import DataTable from 'react-data-table-component';

const headers = () => {

	const state = useSelector(state => state);

	const { lang } = state;

	const columns = [
		{
			name: <span>#</span>,
			selector: (row, index) => index + 1,
			width: '50px'
		},

		{
			name: <span className={`${zawgyi(lang)}`}>  {t('save-invoice-id')} </span>,
			selector: (row, index) => {`Recent Invoice ${index + 1}`},
		},

		{
			name: <span className={`${zawgyi(lang)}`}>  {t('name')} </span>,
			selector: row => row.customer === null ? 'Unknown Customer' : row.customer.name,
		},

		{
			name: <span>  {t('option')} </span>,
			selector: (row) => {
				return(
					<>
						<BsFillCartCheckFill
							className="btn-icon"
							onClick={() => setCart(index)}
							size={20}
						/>

						<BsTrashFill
							className="btn-icon ms-1"
							onClick={() => removeInvoice(index)}
							size={20}
						/>
					</>
				)
			},
		},
	];

	return columns;
};

export const RecentInvoiceDialog = ({isopen, reload, close}) => {
	const state = useSelector(state => state);
	
	const { lang } = state;

	const [recentInvoices, SetRecentInvoices] = useState([]);
	const [isShow, setIsShow] = useState(false);
	const [addInvoice, setAddInvoice] = useState(null);

	const handleClose = () => {
		close(false);
	};

	const loadingData = () => {
		const getInvoices = localStorage.getItem('STORE_INVOICES')
			? JSON.parse(localStorage.getItem('STORE_INVOICES'))
			: [];
		SetRecentInvoices(getInvoices);
	};

	const removeInvoice = id => {
		const remainInvoice = recentInvoices.filter((e, i) => i !== id);
		SetRecentInvoices(remainInvoice);
		localStorage.setItem('STORE_INVOICES', JSON.stringify(remainInvoice));
	};

	const setCart = id => {
		const invoiceToCart = recentInvoices.filter((e, i) => i === id);
		const cart_invoice = invoiceToCart[0];
		const remainInvoice = recentInvoices.filter((e, i) => i !== id);
		SetRecentInvoices(remainInvoice);
		localStorage.setItem('STORE_INVOICES', JSON.stringify(remainInvoice));
		localStorage.setItem('CURRENT_INVOICE', JSON.stringify(cart_invoice.items));
		localStorage.setItem('CUSTOMER', JSON.stringify(cart_invoice.customer));
		reload();
		setIsShow(false);
		close(false);
	};

	useEffect(
		() => {
			setIsShow(isopen);
			loadingData();
		},
		[isopen]
	);

	return (
		<Modal show={isShow} dialogClassName="save-invoice-model">
			<Modal.Header className={`title-primary ${zawgyi(lang)}`}> {t('title-save-invoice')} </Modal.Header>
			<Modal.Body>
				<DataTable
					columns={headers()}
					data={recentInvoices}
				/>
			</Modal.Body>
			<Modal.Footer>
				<Button onClick={handleClose}> {t('close')} </Button>
			</Modal.Footer>
		</Modal>
	);
};
