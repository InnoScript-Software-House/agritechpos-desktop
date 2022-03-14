import React, { useEffect, useState } from 'react';
import { InputGroup, FormControl } from 'react-bootstrap';

export const InvoiceTableHeader = ({ props, filterResult, data }) => {
    const [searchText, setSearchText] = useState('');


    const show =() => {
        console.log(data.map(e => e.invoice_id))
    }

    const search = (text) => {
        setSearchText(text);
        const resultData = data.filter((result, index) => {
            let filterText = result.invoice_id.toString();
            if(filterText.includes(text)){
                return result;
            };
        })
        filterResult(resultData);
    }

    useEffect(() => {
        if(searchText){
            search(searchText)
        }
    },[searchText]);

    return (
        <>
        <InputGroup>
            <FormControl 
            type='text'
            value={searchText}
            placeholder='search with Invoid ID'
            onChange={(e) => {
                search(e.target.value);
            }}
            />
            <button onClick={e => show()}>aa</button>
        </InputGroup>
        </>
    )
}