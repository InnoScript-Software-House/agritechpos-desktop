import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import DataTable from "react-data-table-component-with-filter";
import { zawgyi, t } from '../../utilities/translation.utility';
import { itemColumns } from "../columns/item.columns";
import { ChangeNumberFormatBtn } from "../general/changeNumberFormatBtn";
import { paginationComponentOptions } from "../table/paginationOptions";
import { TableHeaderComponent } from "../table/tableHeader";
import { TableLoadingComponent } from "../table/tableLoading";

const searchColumns = [
    'eng_name', 'mm_name', 'category', 'location', 'model'
];

export const ItemListTableComponent = ({ props, dataSource }) => {
    const { lang } = props.reducer;

    const [ tableLoading, setTableLoading ] = useState(true);
    const [ itemList, setItemList] = useState([]);

    const getFilterResult = (e) => {
        setItemList(e);
    }

    useEffect(() => {
        if(dataSource) {
            let filterArray = [];

            dataSource.map((item, index) => {
                let updateItem = item;

                if(item.category) {
                    updateItem.category = item.category.name;
                } else {
                    updateItem.category = 'Unknown Category';
                }

                filterArray.push(updateItem);
            });

            setItemList(filterArray);
            setTableLoading(false);
        }
    }, [dataSource]);

    return(
        <Card className="mt-3">
            <Card.Header>
                <div className="d-md-flex flex-md-row justify-content-between">
                    <span className={`card-title ${zawgyi(lang)}`}> {t('item-table-title')} </span>
                    <ChangeNumberFormatBtn props={props} />
                </div>
                
            </Card.Header>

            <Card.Body>
                <DataTable
                    subHeader={true}
                    subHeaderComponent={
                        <TableHeaderComponent 
                            props={props} 
                            dataSource={dataSource} 
                            searchColumns={searchColumns} 
                            placeholder={t('input-item-search')}
                            filterResult={e => getFilterResult(e)}
                        />
                    }
                    pagination
                    fixedHeader
                    fixedHeaderScrollHeight="400px"
                    columns={itemColumns(props)}
                    data={itemList}
                    // selectableRows={true}
                    // onSelectedRowsChange={e => console.log(e)}
                    paginationComponentOptions={paginationComponentOptions}
                    progressPending={tableLoading}
                    progressComponent={<TableLoadingComponent />}
                    dense
                    highlightOnHover
                    pointerOnHover
                />
            </Card.Body>
        </Card>
    )
}