import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { TableLoadingComponent } from "../table/tableLoading";
import { categoryColumns } from "../columns/category.columns";
import { TableHeaderComponent } from "../table/tableHeader";
import { t } from "i18next";
import { paginationComponentOptions, paginationPerPage, paginationRowsPerPageOptions } from "../../utilities/tablePagination.utility";
import { ItemConditionalRowStyles } from "../../utilities/tableConditionalRowStylesutility";
import { ItemRowExpandComponent } from "../items/ItemRowExpandComponent";
import CategorySearchComponent from "./CategorySearchComponent";

const searchColumns = ['name'];

export const CategoryListTableComponent = ({ categoriesList  }) => {

    const [tableLoading, setTableLoading] = useState(true);
    const [categoryList, setCategoryList] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]); 

    useEffect(() => {
        if(categoriesList){
            setCategoryList(categoriesList);
            setTableLoading(false);
        }
    },[categoriesList]); 


    return(
        <Card className="mt-3">
            <Card.Header>
                <div className="d-md-flex flex-md-row justify-content-between align-items-center">
                    <Card.Title>
                        <span className="title"> {t('category')} </span>
                    </Card.Title>
                    <div className="col-md-2">
                        <CategorySearchComponent categoriesList={categoriesList} reload={e => setCategoryList(e)}  />
                    </div>
                </div>
            </Card.Header>

            <Card.Body>
                <DataTable
                    responsive={true}
                    subHeader={true}
                    fixedHeaderScrollHeight="400px"
                    fixedHeader
                    pagination
                    columns={categoryColumns()}
                    paginationComponentOptions={paginationComponentOptions}
                    data={categoryList}
                    dense
                    highlightOnHover
                    pointerOnHover
                    progressPending={tableLoading}
                    progressComponent={<TableLoadingComponent />}
					selectableRows={true}
					selectableRowsHighlight={true}
					expandableRows={true}
					expandOnRowDoubleClicked={true}
					onSelectedRowsChange={e => setSelectedRows(e.selectedRows)}
					paginationPerPage={paginationPerPage}
					paginationRowsPerPageOptions={paginationRowsPerPageOptions}
					conditionalRowStyles={ItemConditionalRowStyles}
					expandableRowsComponent={ItemRowExpandComponent}
					expandableRowsComponentProps={{'refresh': (e) => {
						reload(e) }}}
                />
            </Card.Body>
        </Card>
    )
}