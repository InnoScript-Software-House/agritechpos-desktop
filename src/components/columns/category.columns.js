import React from 'react';
import { useDispatch } from 'react-redux';
import { zawgyi, t } from '../../utilities/translation.utility';
import { BsArrowUpRightSquare } from "react-icons/bs";
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
            name: <span className={`datatable-header ${zawgyi(lang)}`}>{t('table-col-name')}</span>,
            selector: row => row.name,
            sortable: true
        },
        {
            name: <span className={`datatable-header ${zawgyi(lang)}`}>{t('table-col-qty')}</span>,
            selector: row => row.items.length,
            sortable: true
        },
        {
            name: <span className={`datatable-header ${zawgyi(lang)}`}>{t('table-col-description')}</span>,
            selector: row => row.description,
        },
        {
            name: <span className={`datatable-header ${zawgyi(lang)}`}> {t('table-option')} </span>,
            selector: (row) => {
                return(
                    <BsArrowUpRightSquare 
                        size={20} 
                        className="icon-btn-outline"
                        onClick={() => history.push(`/category/${row.id}`)}
                    />
               )
            },
            sortable: true,
        }
    ]
}