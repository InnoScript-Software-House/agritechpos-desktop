import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { t, zawgyi } from "../../utilities/translation.utility";
import { sellItemColumns } from "../columns/sellItemColumns";
import { ChangeNumberFormatBtn } from "../general/changeNumberFormatBtn";
import { paginationComponentOptions } from "../table/paginationOptions";
import { SellTableHeader } from "../table/sellTableHeader";
import { TableLoadingComponent } from "../table/tableLoading";

const searchColumns = [
    'code', 'eng_name', 'mm_name', 'category_title', 'location', 'model'
];

export const SaleItemListTableComponent = ({ props, items, categories, preCart, remove }) => {

    const { lang } = props.reducer;

    const [ tableLoading, setTableLoading ] = useState(true);
    const [ itemList, setItemList] = useState([]);
    const [ selectedRows, setSelectedRows] = useState([]);

    const getFilterResult = (e) => {
        setItemList(e);
    }

    const getSelectedCategory = (e) => {
        if(e === 'All') {
            setItemList(items);
            return;
        }

        const result = categories.filter(item => Number(item.id) === Number(e));
        setItemList(result[0].items);
        return;
    }

    useEffect(() => {
        if(items) {
            setItemList(items);
            setTableLoading(false);
        }
    }, [items]);
    
    return(
        <Card className="mt-3">
            <Card.Header>
                <div className="d-md-flex flex-md-row justify-content-between">
                    <span className={`title ${zawgyi(lang)}`}> {t('item-list-title')} </span>
                    <ChangeNumberFormatBtn props={props} />
                </div>
            </Card.Header>

            <Card.Body>
                <DataTable
                    subHeader={true}
                    subHeaderComponent={
                        <SellTableHeader 
                            props={props} 
                            type={'Items'}
                            dataSource={items} 
                            searchColumns={searchColumns} 
                            placeholder={t('input-item-search')}
                            filterResult={e => getFilterResult(e)}
                            selectedRows={selectedRows}
                            filterCategory={(e) => getSelectedCategory(e)}
                            categories={categories}
                            preCart={(e) => preCart(e)}
                            remove={remove}
                        />
                    }
                    pagination
                    fixedHeader
                    fixedHeaderScrollHeight="400px"
                    columns={sellItemColumns(props)}
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
                    selectableRowsSingle={true}
                />
            </Card.Body>
        </Card>
    )
}