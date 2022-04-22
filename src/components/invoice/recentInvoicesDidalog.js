import React, {useEffect, useState} from 'react';
import {Button, Modal} from 'react-bootstrap';
import {BsFillCartCheckFill, BsTrashFill} from 'react-icons/bs';

export const RecentInvoiceDialog = ({isopen, reload, close}) => {
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
		<Modal show={isShow}>
			<Modal.Header>Recent Invoices</Modal.Header>
			<Modal.Body>
				<table className="table table-bordered table-hover">
					<thead>
						<tr>
							<th className="text-center"> Recent Invoice No </th>
							<th className="text-center"> Name </th>
							<th className="text-center"> Options </th>
						</tr>
					</thead>
					<tbody>
						{recentInvoices &&
							recentInvoices.map((invoice, index) => (
								<tr key={`recent invoice id ${index}`}>
									<td align="center"> {`Recent Invoice ${index + 1}`}</td>
									<td align="center">
										{' '}
										{invoice.customer === null ? 'Unknown Customer' : invoice.customer.name}
									</td>
									<td align="center">
										<BsFillCartCheckFill
											className="btn-icon"
											onClick={() => setCart(index)}
											size={20}
										/>
										<BsTrashFill
											className="btn-icon ms-3"
											onClick={() => removeInvoice(index)}
											size={20}
										/>
									</td>
								</tr>
							))}
					</tbody>
				</table>
			</Modal.Body>
			<Modal.Footer>
				<Button onClick={handleClose}> Close </Button>
			</Modal.Footer>
		</Modal>
	);
};
