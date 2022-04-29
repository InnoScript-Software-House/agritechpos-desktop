import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { TableLoadingComponent } from "../table/tableLoading";
import { categoryColumns } from "../columns/category.columns";
import { t } from "i18next";
import { paginationComponentOptions, paginationPerPage, paginationRowsPerPageOptions } from "../../utilities/tablePagination.utility";
import { CategorySearchComponent} from "./CategorySearchComponent";
import { CategoryRowExpandComponent } from "./CategoryRowExpandComponent";
import { CategoryConditionalRowStyles } from "../../utilities/tableConditionalRowStylesutility";

const searchColumns = ['name'];

export const CategoryListTableComponent = ({ categoriesList ,reload  }) => {

    const [tableLoading, setTableLoading] = useState(true);
    const [categoryList, setCategoryList] = useState([]);

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
                        <CategorySearchComponent categoriesList={categoriesList} retrive={e => setCategoryList(e)}  />
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
					paginationPerPage={paginationPerPage}
					paginationRowsPerPageOptions={paginationRowsPerPageOptions}
					conditionalRowStyles={CategoryConditionalRowStyles}
					expandableRowsComponent={CategoryRowExpandComponent}
					expandableRowsComponentProps={{'refresh': (e) => {
						reload(e) }}}
                />
            </Card.Body>
        </Card>
    )
}