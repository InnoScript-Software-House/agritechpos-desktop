import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { zawgyi, t } from '../../utilities/translation.utility';
import { TableLoadingComponent } from "../table/tableLoading";
import { categoryColumns } from "../columns/category.columns";
import { paginationComponentOptions } from "../table/paginationOptions";
import { TableHeaderComponent } from "../table/tableHeader";

const searchColumns = ['name'];

export const CategoryListTableComponent = ({ props, dataSource }) => {

    const { lang } = props.reducer;
    const [tableLoading, setTableLoading] = useState(true);
    const [categoryList, setCategoryList] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]); 

    const getFilterResult = (e) => {
        setCategoryList(e);
    }

    useEffect(() => {
        if(dataSource){
            setCategoryList(dataSource);
            setTableLoading(false);
        }
    },[dataSource]); 


    return(
        <Card className="mt-3">
            <Card.Header>
                <Card.Title>
                    <span className={`title ${zawgyi(lang)}`}> {t('category-table-title')} </span>
                </Card.Title> 
            </Card.Header>

            <Card.Body>
                <DataTable
                    subHeader={true}
                    subHeaderComponent={
                        <TableHeaderComponent
                            props={props} 
                            type={'Category'}
                            dataSource={dataSource} 
                            searchColumns={searchColumns} 
                            placeholder={t('input-category-search')}
                            filterResult={e => getFilterResult(e)}
                            selectedRows={selectedRows}
                        />
                    }
                    fixedHeaderScrollHeight="400px"
                    fixedHeader
                    pagination
                    columns={categoryColumns(props)}
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