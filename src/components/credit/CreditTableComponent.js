import React, { useEffect, useState } from 'react';
import { Card } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { paginationComponentOptions } from '../table/paginationOptions';
import { CreditTableColumns } from './CreditTableColumn';

export const CreditTableComponent = ({ data, retrive }) => {

    const [tableData, setTableData] = useState([]);

    const selectRowHandler = (e) => {
        retrive(e);
    }

    useEffect(() => {
        if(data){
            console.log(data);
            setTableData(data);
        }
    },[data]);

  return (
        <Card>
            <Card.Header>
                <Card.Title> Credit </Card.Title>
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
                    columns={CreditTableColumns()}
                    data={tableData}
                    pagination
                    paginationComponentOptions={paginationComponentOptions}
                />
            </Card.Body>
        </Card>
  )
}
