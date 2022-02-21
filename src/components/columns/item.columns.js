import React from "react";
import { changeNumberFormat } from "../../utilities/number.utility";
import { zawgyi, t } from "../../utilities/translation.utility";

const numeral = require('numeral');

export const itemColumns = (props) => {
    const { lang, numberFormat, char } = props.reducer;

    const num = (value) => {
        return changeNumberFormat(value, numberFormat, char);
    }

    return [
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
            selector: row => row.category,
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
        }
    
    ]
}
