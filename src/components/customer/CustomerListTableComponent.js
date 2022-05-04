import React, { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import { customerColumns } from '../columns/customer.columns';
import { paginationComponentOptions } from '../table/paginationOptions';
import CustomerTableHeaderComponent from '../table/customerTableHeader';
import { TableLoadingComponent } from '../table/tableLoading';
import { t, zawgyi } from '../../utilities/translation.utility';
import { CustomerRowExpandComponent } from './utilities/CustomerRowExpandComponent';
import { useSelector } from 'react-redux';

const searchColumns = [
    t('name'), t('email'), t('phone')
];

export const CustomerListTableComponent = ({ dataSource, reload, retrive }) => {

    const state = useSelector(state => state);
    const { lang } = state;

    const [tableLoading, setTableLoading] = useState(true);
    const [customerList, setCustomerList] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);

    const getFilterResult = (e) => {
        setCustomerList(e);
    }

    const getCustomerList = () => {
        let customerData = dataSource.filter(e => e.customer_name !== null);
        return customerData;
    }

    const boughtInvoicesHandler = (e) => {
        setSelectedRows(e);
        retrive(e);
    }

    useEffect(() => {
        if (dataSource) {
            let customerList = getCustomerList();
            setCustomerList(customerList);
            setTableLoading(false);
        }
    }, [dataSource]);

    return (
        <Card>
            <Card.Header>
                <Card.Title> 
                    <div className='d-md-flex flex-md-row justify-content-between'>
                        <span className={`${zawgyi(lang)}`}> {t('customer')} </span>
                    </div>
                </Card.Title>
            </Card.Header>

            <Card.Body>
                <DataTable
                    subHeader={true}
                    subHeaderComponent={
                        <CustomerTableHeaderComponent
                            type={'CustomerLists'}
                            dataSource={dataSource}
                            searchColumns={searchColumns}
                            placeholder={t('search')}
                            filterResult={e => getFilterResult(e)}
                            selectedRows={selectedRows}
                            reload={(e) => reload(e)}

                        />
                    }
                    pagination
                    fixedHeader
                    fixedHeaderScrollHeight='400px'
                    columns={customerColumns()}
                    data={customerList}
                    paginationComponentOptions={paginationComponentOptions}
                    progressPending={tableLoading}
                    progressComponent={<TableLoadingComponent />}
                    dense
                    highlightOnHover
                    pointerOnHover
                    selectableRows={true}
                    selectableRowsHighlight={true}
                    onSelectedRowsChange={e => boughtInvoicesHandler(e.selectedRows)}
                    selectableRowsSingle={true}
                    paginationPerPage={50}
                    expandableRows={true}
                    expandOnRowClicked={true}
                    expandableRowsComponent={CustomerRowExpandComponent}
                    expandableRowsComponentProps={{'refresh' : e => reload(e)}}
                    paginationRowsPerPageOptions={[50, 100, 150, 200, 500]}
                />
            </Card.Body>
        </Card>
    )
}
