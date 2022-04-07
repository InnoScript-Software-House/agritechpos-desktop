import React, {useEffect, useState} from 'react';
import {Card, Button} from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import {itemColumns} from '../columns/item.columns';
import {ChangeNumberFormatBtn} from '../general/changeNumberFormatBtn';
import {paginationComponentOptions} from '../table/paginationOptions';
import {TableHeaderComponent} from '../table/tableHeader';
import {TableLoadingComponent} from '../table/tableLoading';
import { BsEye, BsEyeSlash, BsListTask } from "react-icons/bs";
import { t } from "i18next";

const searchColumns = ['code', 'eng_name', 'mm_name', 'category_title', 'location'];

export const ItemListTableComponent = ({props, dataSource, reload, openCreateItem, open}) => {
	const [tableLoading, setTableLoading] = useState(true);
	const [itemList, setItemList] = useState([]);
	const [selectedRows, setSelectedRows] = useState([]);

	const getFilterResult = e => {
		setItemList(e);
	};

	useEffect(
		() => {
			if (dataSource) {
				setItemList(dataSource);
				setTableLoading(false);
			}
		},
		[dataSource]
	);

	return (
		<Card className="mt-3">
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
					fixedHeaderScrollHeight="400px"
					subHeader={true}
					subHeaderComponent={
						<TableHeaderComponent
							type={'Items'}
							dataSource={dataSource}
							searchColumns={searchColumns}
							placeholder={t('search')}
							filterResult={e => getFilterResult(e)}
							selectedRows={selectedRows}
							reload={e => reload(e)}
						/>
					}
					pagination
					fixedHead
					columns={itemColumns(props)}
					data={itemList}
					paginationComponentOptions={paginationComponentOptions}
					keyField
					progressPending={tableLoading}
					progressComponent={<TableLoadingComponent />}
					dense
					highlightOnHover
					pointerOnHover
					selectableRows={true}
					selectableRowsHighlight={true}
					onSelectedRowsChange={e => setSelectedRows(e.selectedRows)}
					paginationPerPage={50}
					paginationRowsPerPageOptions={[50, 100, 150, 200, 500]}
				/>
			</Card.Body>
		</Card>
	);
};
