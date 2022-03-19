import React, { useEffect, useState } from 'react';
import { Card } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { CreditTableColumns } from './CreditTableColumn';

export const CreditTableComponent = ({props, detail, data}) => {

    console.log(data);
    const [tableData, setTableData] = useState([]);
    const [creditDetail, setCreditDetail] = useState(null);

    const dummyData = [
        {
            id: 1,
            invoice_no: '000001',
            customer_name: 'Aung Aung',
            credit_amount: 50000,
            repayment: 0,
            amount_left: 50000
        },
        {
            id: 2,
            invoice_no: '000002',
            customer_name: 'Kuu Kuu',
            credit_amount: 100000,
            repayment: 0,
            amount_left: 100000
        }
    ];

    const selectRowHandler = (e) => {
        setCreditDetail(e);
        detail(e);
    }


    useEffect(() => {
        if(data){
            setTableData(data);
        }
    },[data])

  return (
        <Card>
            <Card.Header>
                <Card.Title>
                    <span> Credit </span>
                </Card.Title>
            </Card.Header>
            <Card.Body>
                <DataTable
                dense
                highlightOnHover
                pointerOnHover
                selectableRows={true}
                selectableRowsHighlight={true}
                selectableRowsSingle={true}
                onSelectedRowsChange={e => selectRowHandler(e.selectedRows)}
                columns={CreditTableColumns(props)}
                data={tableData} />
            </Card.Body>
        </Card>
  )
}
