import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { zawgyi, t } from '../../utilities/translation.utility';
import { TableLoadingComponent } from "../table/tableLoading";
import { categoryColumns } from "../columns/category.columns";
import { paginationComponentOptions } from "../table/paginationOptions";

export const CategoryListTableComponent = ({ props, dataSource }) => {
    const { lang } = props.reducer;


    return(
        <Card className="mt-3">
            <Card.Header>
                <div className="d-md-flex flex-md-row justify-content-between">
                    <span className={`card-title ${zawgyi(lang)}`}> Category List Table</span>
                </div>
                
            </Card.Header>

            <Card.Body>
                <DataTable
                fixedHeaderScrollHeight="400px"
                fixedHeader
                pagination
                columns={categoryColumns(props)}
                paginationComponentOptions={paginationComponentOptions}
                data={dataSource}
                dense
                highlightOnHover
                pointerOnHover
                selectableRows
                progressComponent={<TableLoadingComponent />}
                 />
            </Card.Body>
        </Card>
    )
}