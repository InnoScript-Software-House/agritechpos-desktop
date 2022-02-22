import React from "react";
import { BsArrowUpRightSquare, BsTrash } from "react-icons/bs";
import { useHistory } from "react-router-dom";
import { changeNumberFormat } from "../../utilities/number.utility";
import { zawgyi, t } from "../../utilities/translation.utility";

const numeral = require('numeral');

export const itemColumns = (props) => {
    const { lang, numberFormat, char } = props.reducer;

    const history = useHistory();

    console.log(history);

    const num = (value) => {
        return changeNumberFormat(value, numberFormat, char);
    }

    return [
        {   
            name: <span className='datatable-header'> # </span>,
            selector: (row, index) => index + 1,
            sortable: true,
        },
        {
            name: <span className={`datatable-header ${zawgyi(lang)}`}> {t('item-code')} </span>,
            selector: row => row.code,
            sortable: true,
        },
        {
            name: <span className={`datatable-header ${zawgyi(lang)}`}> {t('item-eng-name')} </span>,
            selector: row => row.eng_name,
            sortable: true,
        },
        {
            name: <span className={`datatable-header ${zawgyi(lang)}`}> {t('item-mm-name')} </span>,
            selector: row => row.mm_name,
            sortable: true,
        },
        {
            name: <span className={`datatable-header ${zawgyi(lang)}`}> {t('item-category')} </span>,
            selector: row => row.category_title,
            sortable: true,
        },

        {
            name: <span className={`datatable-header ${zawgyi(lang)}`}> {t('item-model')} </span>,
            selector: row => row.model,
            sortable: true,
        },
        {
            name: <span className={`datatable-header ${zawgyi(lang)}`}> {t('item-qty')} </span>,
            selector: row => numeral(row.qty).format('0,0'),
            sortable: true,
        },
        {
            name: <span className={`datatable-header ${zawgyi(lang)}`}> {t('item-price')} </span>,
            selector: row => num(row.price),
            sortable: true,
        },
        {
            name: <span className={`datatable-header ${zawgyi(lang)}`}> {t('item-total-price')} </span>,
            selector: row => numeral(row.price * row.qty).format('0,0'),
            sortable: true,
        },
        {
            name: <span className={`datatable-header ${zawgyi(lang)}`}> {t('item-location')} </span>,
            selector: row => row.location,
            sortable: true,
        },
        {
            name: <span className={`datatable-header ${zawgyi(lang)}`}> {t('item-option')} </span>,
            selector: (row) => {
               return(
                   <>
                    <BsArrowUpRightSquare 
                        size={20} 
                        className="icon-btn-outline"
                        onClick={() => history.push(`/item/${row.id}`)}
                    />

                    <BsTrash size={20} className="icon-btn-outline ms-3" />
                   </>
               )
            },
            sortable: true,
        }
    
    ]
}
