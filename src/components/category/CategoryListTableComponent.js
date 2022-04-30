import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { TableLoadingComponent } from "../table/tableLoading";
import { t, zawgyi } from "../../utilities/translation.utility";
import { paginationComponentOptions, paginationPerPage, paginationRowsPerPageOptions } from "../../utilities/tablePagination.utility";
import { CategorySearchComponent} from "./CategorySearchComponent";
import { CategoryRowExpandComponent } from "./CategoryRowExpandComponent";
import { CategoryColumns } from "./category.columns";
import { useSelector } from "react-redux";

const searchColumns = ['name'];

export const CategoryListTableComponent = ({ dataSource ,reload }) => {

    const state = useSelector(state => state);
    const { lang } = state;

    const [tableLoading, setTableLoading] = useState(true);
    const [categories, setCategory] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);

    useEffect(() => {
        console.log(dataSource);
        if(dataSource){
            setCategory(dataSource);
            setTableLoading(false);
        }
    },[dataSource]); 


    return(
        <Card className="mt-3">
            <Card.Header>
                <div className="d-md-flex flex-md-row justify-content-between align-items-center">
                    <Card.Title>
                        <span className={`title-default ${zawgyi(lang)}`}> {t('category')} </span>
                    </Card.Title>

                    <div className="col-md-2">
                        <CategorySearchComponent 
                            categoriesList={categories} 
                            retrive={e => setCategoryList(e)}  
                        />
                    </div>
                </div>
            </Card.Header>

            <Card.Body>
				<DataTable
                    responsive={true}
                    fixedHeader={true}
                    fixedHeaderScrollHeight='400px'
                    pagination
                    columns={CategoryColumns()}
                    subHeader={true}
                    // subHeaderComponent={
                    //     <ItemTableHeaderComponent 
                    //         dataSource={selectedRows}
                    //     />
                    // }
                    data={categories}
                    paginationComponentOptions={paginationComponentOptions}
                    progressPending={tableLoading}
                    progressComponent={
                        <TableLoadingComponent dataSource={categories} />
                    }
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
                    expandableRowsComponent={CategoryRowExpandComponent}
                    expandableRowsComponentProps={{'refresh': (e) => {
                        reload(e)
                    }}}
                />
            </Card.Body>
        </Card>
    )
}