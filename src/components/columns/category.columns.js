import React from 'react';
import { useDispatch } from 'react-redux';
import { zawgyi, t } from '../../utilities/translation.utility';
import { BsArrowUpRightSquare, BsTrash } from "react-icons/bs";
import { useHistory } from 'react-router-dom';

export const categoryColumns = (props) => {
    const { lang } = props.reducer;
    const dispatch = useDispatch();
    const history = useHistory();

    return [
        {
            name: <span className='datatable-header'>#</span>,
            selector: (row, index) => index + 1,
            sortable: true,
            width: "50px"
        },
        {
            name: <span className={`datatable-header ${zawgyi(lang)}`}>{t('item-category')}</span>,
            selector: row => row.name,
            sortable: true
        },
        {
            name: <span className={`datatable-header ${zawgyi(lang)}`}>{t('item-amount')}</span>,
            selector: row => row.items.length,
            sortable: true
        },
        {
            name: <span className={`datatable-header ${zawgyi(lang)}`}>{t('input-create-description')}</span>,
            selector: row => row.description,
        },
        {
            name: <span className={`datatable-header ${zawgyi(lang)}`}> {t('item-option')} </span>,
            selector: (row) => {
                return(
                       <>
                        <BsArrowUpRightSquare 
                            size={20} 
                            className="icon-btn-outline"
                            onClick={() => history.push(`/category/:${row.id}`)}
                        />
    
                        <BsTrash 
                            size={20} 
                            className="icon-btn-outline ms-3" 
                            onClick={() => dispatch(setOpenDelModal({
                                open: true,
                                title: 'Item Delete',
                                message: 'Are you sure to delete this item',
                                id: row.id,
                                type: 'items'
                            }))}
                        />
                       </>
               )
            },
            sortable: true,
        }
    ]
}