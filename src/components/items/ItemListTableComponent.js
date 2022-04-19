import React, {useEffect, useState} from 'react';
import {Card, Button} from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import {ItemColumns} from './Item.columns';
import {ChangeNumberFormatBtn} from '../general/changeNumberFormatBtn';
import {paginationComponentOptions, paginationPerPage, paginationRowsPerPageOptions} from '../../utilities/tablePagination.utility';
import {TableHeaderComponent} from '../table/tableHeader';
import {TableLoadingComponent} from '../table/tableLoading';
import { BsEye, BsEyeSlash, BsListTask } from "react-icons/bs";
import { t } from '../../utilities/translation.utility';
import { ItemRowExpandComponent } from './ItemRowExpandComponent';
import { jsPDF } from "jspdf";
import 'jspdf-autotable';

const itemConditionalRowStyles = [
	{
		when: row => row.qty === 0,
		style: row => ({
			backgroundColor: row.qty === 0 ? 'red' : '',
			color: row.qty === 0 ? 'white' : 'black'
		})
	},
	{
		when: row => row.percentage === 0 || row.percentage < 0,
		style: row => ({
			backgroundColor: row.percentage === 0 || row.percentage < 0 ? 'red' : '',
			color: row.percentage === 0 || row.percentage < 0 ? 'white' : 'black'
		})
	}
];

export const ItemListTableComponent = ({props, dataSource, reload, openCreateItem, open}) => {
	const [tableLoading, setTableLoading] = useState(true);
	const [itemList, setItemList] = useState([]);
	const [selectedRows, setSelectedRows] = useState([]);

	const getFilterResult = e => {
		setItemList(e);
	};

	const exportPDF = () => {
		const doc = new jsPDF({
			orientation: 'landscape',
			unit: 'in',
		});

		const result = itemList.map((value) => {
			return [
				value.code, value.eng_name, value.model, value.qty, value.location,
				value.percentage, value.price, value.sell_price
			]
		});

		doc.autoTable({
			head: [[
				'Material Code', 'Name', 'Model','Qty', 'Location',
				'Percentage', 'Purchase Price', 'Sell Price',
			]],
			body: result
		});

		doc.save('inventory.pdf');
	}

	useEffect(() => {
		if (dataSource) {
			setItemList(dataSource);
			console.log(dataSource);
			setTableLoading(false);
		}
	},[dataSource]);

	return (
		<Card className="mt-1">
			<Card.Header>
				<div className="d-md-flex flex-md-row justify-content-between">
					<div className=''>
						<Button
                            className='btn-small mt-3 me-3'
                            onClick={(e) => open(!openCreateItem)}
                        >
                            {openCreateItem ? (<BsEyeSlash size={20} />) :  <BsEye size={20} />}
                        	<span className='me-3'> {openCreateItem ? `${t('hide-create-item-from')}` : `${t('show-create-item-form')}` }</span>
                        </Button>

						<Button
                            className='btn-small mt-3 ms-3'
                            onClick={() => props.history.push('/category')}
                        >
                            <BsListTask size={20} />
                            <span className='me-3'> {t('category')} </span>
                        </Button>
					</div>
					<ChangeNumberFormatBtn props={props} />
				</div>
			</Card.Header>

			<Card.Body>
				<DataTable
					responsive={true}
					fixedHeader={true}
					fixedHeaderScrollHeight='400px'
					pagination
					columns={ItemColumns()}
					data={itemList}
					paginationComponentOptions={paginationComponentOptions}
					progressPending={tableLoading}
					progressComponent={<TableLoadingComponent />}
					dense
					highlightOnHover
					pointerOnHover
					selectableRows={true}
					selectableRowsHighlight={true}
					expandableRows={true}
					expandOnRowDoubleClicked={true}
					onSelectedRowsChange={e => setSelectedRows(e.selectedRows)}
					paginationPerPage={paginationPerPage}
					paginationRowsPerPageOptions={paginationRowsPerPageOptions}
					conditionalRowStyles={itemConditionalRowStyles}
					expandableRowsComponent={ItemRowExpandComponent}
					expandableRowsComponentProps={{'refresh': (e) => {
						reload(e)
					}}}
				/>
			</Card.Body>
		</Card>
	);
};
