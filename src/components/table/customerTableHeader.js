import React, { useEffect, useState } from "react";
import { InputGroup, FormControl, Button } from "react-bootstrap";
import { itemExportToExcel } from "../../utilities/exports/itemExport.utility";
import { autocomplete } from "../../utilities/table.utility";

const CustomerTableHeaderComponent = ({dataSource, searchColumns, filterResult, selectedRows}) => {
    const [filterValue, setFilterValue] = useState('customer_name');
    const [filterType, setFilterType] = useState(searchColumns[0]);
    const [text, setText] = useState('');
    const [isSelected, setIsSelected] = useState(false);
    const [excelData, setExcelData] = useState([]);

    const exportToExcel = () => {
        // const data = selectedRows.map(e => e);
        // console.log(data)
        itemExportToExcel('customerlist', selectedRows);
    }

    const completeFilter = (type) => {
        switch(type){
            case 'name' : setFilterValue('customer_name'); break;
            case 'email' : setFilterValue('customer_email'); break;
            case 'phone' : setFilterValue('customer_phone'); break;
        };
    }

    const autoSearch = (searchText) => {
        const result = autocomplete(dataSource, text, filterValue);
        setText(searchText);
        filterResult(result);
        console.log(result) 
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
                            Export
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