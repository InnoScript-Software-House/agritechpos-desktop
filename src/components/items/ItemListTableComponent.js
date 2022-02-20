import React, { useEffect, useState } from "react";
import { Card, Table } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { zawgyi, t } from '../../utilities/translation.utility';
import { itemColumns } from "../columns/item.columns";
import { BsEyeSlash, BsEye } from "react-icons/bs";
import { ChangeNumberFormatBtn } from "../general/changeNumberFormatBtn";

const paginationComponentOptions = {
    noRowsPerPage: false,
    rowsPerPageText: t('table-row-record'),
    rangeSeparatorText: t('table-row-total'),
    selectAllRowsItem: false,
};

export const ItemListTableComponent = ({ props, dataSource }) => {
    const { lang, numberFormat } = props.reducer;

    const [ tableLoading, setTableLoading ] = useState(true);
    const [ itemList, setItemList] = useState([]);

    useEffect(() => {
        if(dataSource) {
            setItemList(dataSource);
            setTableLoading(false);
        }
    }, [dataSource])

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
                    // subHeaderComponent={<SubHeaderComponent />}
                    pagination
                    fixedHeader
                    fixedHeaderScrollHeight="400px"
                    columns={itemColumns(props)}
                    data={itemList}
                    selectableRows={true}
                    onSelectedRowsChange={e => console.log(e)}
                    paginationComponentOptions={paginationComponentOptions}
                    // progressPending={table_loading}
                    // progressComponent={<DataTableLoading />}
                    dense
                    highlightOnHover
                    pointerOnHover
                />
            </Card.Body>
        </Card>
    )
}