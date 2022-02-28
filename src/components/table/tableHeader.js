import React, { useEffect, useState } from 'react';
import { Button, FormControl, InputGroup } from 'react-bootstrap';
import { autocomplete } from '../../utilities/table.utility';
import { t, zawgyi } from '../../utilities/translation.utility';
import { ItemExportToExcel } from '../exports/itemExportComponent';
import { BsCloudUpload, BsTrash } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { setOpenDelModal } from '../../redux/actions/openDelModal.action';

import '../../assets/css/components/table-header.css';

export const TableHeaderComponent = ({ type, props, dataSource, searchColumns, placeholder, filterResult, selectedRows }) => {
    const { lang } = props.reducer;
    const dispatch = useDispatch();

    const [text, setText] = useState('');
    const [filterType, setFilterType] = useState(searchColumns[0]);
    const [openExportSetting, setOpenExportSetting] = useState(false);
    const [selectedList, setSelectedList] = useState([]);

    const autoSearch = (text) => {
        const result = autocomplete(dataSource, text, filterType);
        setText(text);
        filterResult(result);
    }

    const reset = () => {
        setFilterType(searchColumns[0]);
        setText('');
        filterResult(dataSource);
    }

    const deleteSelectedRows = () => {
       dispatch(setOpenDelModal({
           title: type+' Delete',
           message: 'Are you sure want to delete these '+type,
           type: type,
           multiple: true,
           open: true,
           data: selectedList
       }))
    }

    useEffect(() => {
        if(selectedRows) {
            setSelectedList(selectedRows);
        }
    },[selectedRows]);

    return(
        <div className='table-header mb-3'>
            <div className='table-header-left'>
                {selectedRows.length > 0 && (
                    <div className='d-md-flex flex-md-row justifiy-content-start align-items-center'>
                        <Button 
                            className='btn-small'
                            onClick={() => setOpenExportSetting(true)}
                        >  
                            <BsCloudUpload size={20} />
                            <span className={`${zawgyi(lang)}`}> {t('export-excel-setting-btn')} </span>
                        </Button>

                        <Button
                            className='btn-small ms-3'
                            onClick={() => deleteSelectedRows()}
                        >
                            <BsTrash size={20} />
                            <span> Delete Selected Items </span>
                        </Button>
                    </div>
                )}
            </div>

            <InputGroup className='table-header-right'>
                <FormControl
                    className={`input-small ${zawgyi(lang)}`}
                    type='text'
                    placeholder={placeholder}
                    value={text}
                    onChange={e => autoSearch(e.target.value)}
                />

                <FormControl
                    className={`select-input-group ${zawgyi(lang)}`}
                    as={'select'}
                    value={filterType}
                    onChange={(e) => {
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
                    
                <Button 
                    className={`btn-small ${zawgyi(lang)}`}
                    onClick={() => reset()}
                > 
                    {t('btn-table-search-reset')} 
                </Button>
            </InputGroup>

           {openExportSetting && (
                <ItemExportToExcel 
                    props={props} 
                    open={openExportSetting} 
                    close={e => setOpenExportSetting(e)}
                />
           )}
        </div>
    )
}