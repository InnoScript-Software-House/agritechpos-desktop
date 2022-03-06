import React, { useEffect, useReducer, useState } from 'react';
import { Card } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { zawgyi, t } from '../../utilities/translation.utility';
import { VoucherComponent } from '../../utilities/voucher';
import { SaleTableHeaderComponent } from '../table/tableCategoryHeader';
import { TableLoadingComponent } from '../table/tableLoading';
import { saleTableColumns } from './saleTableColumns';

const searchColumns = [
    'code', 'eng_name', 'mm_name', 'location', 'model'
];

export const SaleTableComponent = ({props , itemsData, categoriesData}) => {
    const { lang } = props.reducer;
    const { cartedItem } = useReducer();

    const [ tableLoading, setTableLoading ] = useState(true);
    const [ categoriesList, setCategoriesList ] = useState([]);
    const [ itemsList, setItemList ] = useState([]);
    console.log(categoriesData)

    const getFilterResult = (e) => {
        setItemList(e);
    }

    useEffect(() => {
        if(itemsData && categoriesData){
            setItemList(itemsData);
            setCategoriesList(categoriesData);
            setTableLoading(false);
        };
    },[itemsData, categoriesData]);
    

    return(
        <>
        <div className='d-md-flex flex-md-row justify-content-between align-items-center'>
            <div className="col-md-4">
                <VoucherComponent props={props}/>
            </div>
            <div className='col-md-8'>
            <Card className='mt-3'>
            <Card.Header>
                <Card.Title>
                    Sale Table
                </Card.Title>
            </Card.Header>  
            <Card.Body>
                <DataTable
                subHeader={true}
                subHeaderComponent={
                    <SaleTableHeaderComponent
                    props={props} 
                    type={'Items'}
                    dataSource={itemsData} 
                    searchColumns={searchColumns} 
                    placeholder={t('input-item-search')}
                    filterResult={e => getFilterResult(e)}
                    categories={categoriesData}
                   />                           
              
                }                
                fixedHeader
                fixedHeaderScrollHeight='400px'
                pagination
                columns={saleTableColumns(props)}
                data={itemsList}
                progressComponent={<TableLoadingComponent/>}
                progressPending={tableLoading}
                dense
                highlightOnHover
                pointerOnHover />
            </Card.Body>
        </Card>
            </div>
        </div>
        </>
    )
}