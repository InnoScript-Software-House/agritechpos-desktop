import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { paginationComponentOptions } from "../table/paginationOptions";
import { CreditTableColumns } from "./CreditTableColumn";

export const CreditTableComponent = ({ data, retrive, refresh }) => {
  const [tableData, setTableData] = useState([]);
  const [currentRow, setCurrentRow] = useState(null);
  console.log(data);

  const selectRowHandler = (e) => {
    setCurrentRow(e);
    retrive(e)
  };

  console.log(currentRow);

  useEffect(() => {
    if (data) {
      setTableData(data);
      retrive(currentRow);
    }
  }, [data, currentRow]);

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
          onSelectedRowsChange={(e) => {selectRowHandler(e.selectedRows)}}
          columns={CreditTableColumns()}
          data={tableData}
          pagination
          paginationComponentOptions={paginationComponentOptions}
        />
      </Card.Body>
    </Card>
  );
};
