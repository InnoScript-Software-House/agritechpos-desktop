import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { TableLoadingComponent } from "../table/tableLoading";
import { categoryColumns } from "../columns/category.columns";
import { paginationComponentOptions } from "../table/paginationOptions";
import { TableHeaderComponent } from "../table/tableHeader";
import { t } from "i18next";

const searchColumns = ['name'];

export const CategoryListTableComponent = ({ props, categoriesList }) => {

    const [tableLoading, setTableLoading] = useState(true);
    const [categoryList, setCategoryList] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]); 

    const getFilterResult = (e) => {
        setCategoryList(e);
    }

    useEffect(() => {
        if(categoriesList){
            setCategoryList(categoriesList);
            setTableLoading(false);
        }
    },[categoriesList]); 


    return(
        <Card className="mt-3">
            <Card.Header>
                <Card.Title>
                    <span className="title"> {t('category')} </span>
                </Card.Title> 
            </Card.Header>

            <Card.Body>
                <DataTable
                    subHeader={true}
                    subHeaderComponent={
                        <TableHeaderComponent
                            props={props} 
                            type={'Category'}
                            dataSource={categoriesList} 
                            searchColumns={searchColumns} 
                            placeholder={t('search')}
                            filterResult={e => getFilterResult(e)}
                            selectedRows={selectedRows}
                        />
                    }
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
                />
            </Card.Body>
        </Card>
    )
}