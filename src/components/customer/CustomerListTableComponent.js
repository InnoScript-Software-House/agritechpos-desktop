import React, { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import { customerColumns } from '../columns/customer.columns';
import { ChangeNumberFormatBtn } from '../general/changeNumberFormatBtn';
import { paginationComponentOptions } from '../table/paginationOptions';
import CustomerTableHeaderComponent from '../table/customerTableHeader';
import { TableLoadingComponent } from '../table/tableLoading';

const searchColumns = [
    'name', 'email', 'phone'
];

export const CustomerListTableComponent = ({ props, dataSource, reload }) => {

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

    useEffect(() => {
        if (dataSource) {
            let customerList = getCustomerList();
            setCustomerList(customerList);
            setTableLoading(false);
        }
    }, [dataSource]);

    return (
        <>
            <Card className='mt-3'>
                <Card.Header>
                    <div className='d-md-flex flex-md-row justify-content-between'>
                        <span className='title'>Customer List</span>
                    </div>
                </Card.Header>

                <Card.Body>
                    <DataTable
                        subHeader={true}
                        subHeaderComponent={
                            <CustomerTableHeaderComponent
                                type={'CustomerLists'}
                                dataSource={customerList}
                                searchColumns={searchColumns}
                                placeholder='Search Item'
                                filterResult={e => getFilterResult(e)}
                                selectedRows={selectedRows}
                                reload={(e) => reload(e)}

                            />
                        }
                        pagination
                        fixedHeader
                        fixedHeaderScrollHeight='400px'
                        columns={customerColumns(props)}
                        data={customerList}
                        paginationComponentOptions={paginationComponentOptions}
                        progressPending={tableLoading}
                        progressComponent={<TableLoadingComponent />}
                        dense
                        highlightOnHover
                        pointerOnHover
                        selectableRows={true}
                        selectableRowsHighlight={true}
                        onSelectedRowsChange={e => setSelectedRows(e.selectedRows)}
                    />
                </Card.Body>
            </Card>
        </>
    )
}
