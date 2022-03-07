import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import { t, zawgyi } from '../../utilities/translation.utility';
import { itemColumns } from '../columns/item.columns';
import { ChangeNumberFormatBtn } from '../general/changeNumberFormatBtn';
import { paginationComponentOptions } from '../table/paginationOptions';
import { TableHeaderComponent } from '../table/tableHeader';
import { TableLoadingComponent } from '../table/tableLoading';

const searchColumns = [
    'code', 'eng_name', 'mm_name', 'location', 'model'
];

export const CategoryDetailItemListTableComponent = ({ props, category }) => {

    const { lang } = props.reducer;
    
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [ selectedRows, setSelectedRows] = useState([]);

    const getFilterResult = (e) => {
        setItems(e);
    }

    useEffect(() => {
        if(category) {
            setItems(category.items);
        }
        setLoading(false);
    }, [category]);

    return(
        <Card>
            <Card.Header>
                <div className="d-md-flex flex-md-row justify-content-between">
                    <span className={`card-title ${zawgyi(lang)}`}> {t('item-list-title')} </span>
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
                            dataSource={items} 
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
                    data={items}
                    paginationComponentOptions={paginationComponentOptions}
                    progressPending={loading}
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