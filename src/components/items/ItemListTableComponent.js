import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { zawgyi, t } from '../../utilities/translation.utility';
import { itemColumns } from "../columns/item.columns";
import { ChangeNumberFormatBtn } from "../general/changeNumberFormatBtn";
import { paginationComponentOptions } from "../table/paginationOptions";
import { TableHeaderComponent } from "../table/tableHeader";
import { TableLoadingComponent } from "../table/tableLoading";

const searchColumns = [
    'code', 'eng_name', 'mm_name', 'category_title', 'location', 'model'
];

export const ItemListTableComponent = ({ props, dataSource }) => {
    const { lang } = props.reducer;

    const [ tableLoading, setTableLoading ] = useState(true);
    const [ itemList, setItemList] = useState([]);
    const [ selectedRows, setSelectedRows] = useState([]);

    const getFilterResult = (e) => {
        setItemList(e);
    }

    useEffect(() => {
        if(dataSource) {
            setItemList(dataSource);
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
                            type={'Items'}
                            dataSource={dataSource} 
                            searchColumns={searchColumns} 
                            placeholder={t('input-item-search')}
                            filterResult={e => getFilterResult(e)}
                            selectedRows={selectedRows}
                        />
                    }
                    pagination
                    fixedHeader
                    fixedHeaderScrollHeight="400px"
                    columns={itemColumns(props)}
                    data={itemList}
                    paginationComponentOptions={paginationComponentOptions}
                    progressPending={tableLoading}
                    progressComponent={<TableLoadingComponent />}
                    dense
                    highlightOnHover
                    pointerOnHover
                    selectableRows={true}
                    selectableRowsHighlight={true}
                    onSelectedRowsChange={ e => setSelectedRows(e.selectedRows)}
                />
            </Card.Body>
        </Card>
    )
}