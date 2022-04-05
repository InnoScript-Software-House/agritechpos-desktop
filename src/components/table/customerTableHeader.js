import React, { useEffect, useState } from "react";
import { InputGroup, FormControl, Button } from "react-bootstrap";
import { itemExportToExcel } from "../../utilities/exports/itemExport.utility";
import { t } from 'i18next';

const CustomerTableHeaderComponent = ({dataSource, searchColumns, filterResult, selectedRows}) => {
    const [filterValue, setFilterValue] = useState('customer_name');
    const [filterType, setFilterType] = useState(searchColumns[0]);
    const [text, setText] = useState('');
    const [isSelected, setIsSelected] = useState(false);

    const paidCount = (e) => {
        let repayment = JSON.parse(e.credit.repayment);
        let paidCount = repayment.length;
        return paidCount;
    }

    const exportToExcel = () => {
        const excelData = selectedRows.map(e => ({
            name: e.customer_name,
            email: e.customer_email,
            phone_number: e.customer_phone,
            credit: e.credit_amount,
            paid_count: paidCount(e),
            total_amount: e.total_amount
        }));
        itemExportToExcel('customerlist', excelData);
    }

    const completeFilter = (type) => {
        switch(type){
            case 'name' : setFilterValue('customer_name'); break;
            case 'email' : setFilterValue('customer_email'); break;
            case 'phone' : setFilterValue('customer_phone'); break;
        };
    }

    const autoSearch = (searchText) => {
        setText(searchText);

        if(searchText === '') {
            filterResult(dataSource);
            return;
        }

        const suggestionResut = dataSource.filter((customer) => {
            if(customer[filterValue]) {
               return customer[filterValue].toLowerCase().includes(text.toLowerCase())
            }
        });

        filterResult(suggestionResut);
    }

    useEffect(() => {
        if(selectedRows){
            if(selectedRows.length > 0){
                setIsSelected(true);
                return;
            }
            else{
                setIsSelected(false)
                return;
            }
        }
            
    },[selectedRows]);

    return (
            <>
            <div className="d-flex flex-row">
            {
                isSelected && (
                    <div className="me-3">
                        <Button onClick={() => exportToExcel()}>
                            {t('export')}
                        </Button>
                    </div>
                )
            }
            <InputGroup>
                <FormControl
                    className="input-small"
                    type='text'
                    placeholder={filterType}
                    value={text}
                    onChange={e => autoSearch(e.target.value)}
                />
                <FormControl
                    className="select-input-group"
                    as={'select'}
                    value={filterType}
                    onChange={(e) => {
                        completeFilter(e.target.value); 
                        setFilterType(e.target.value);
                        setText('');
                        filterResult(dataSource)
                    }}
                >
                    {searchColumns.map((filter, index) => {
                        return(
                            <option key={`filter_column_id_${index}`}> {filter} </option>
                        )
                    })}
                </FormControl>
        </InputGroup>
            </div>
        </>
    )
}

export default CustomerTableHeaderComponent;