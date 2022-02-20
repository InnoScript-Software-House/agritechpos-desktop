import React from "react";
import { zawgyi, t } from "../../utilities/translation.utility";

const numeral = require('numeral');

export const itemColumns = (props) => {
    const { lang, numberFormat, char } = props.reducer;

    const num = (value) => {
        if(numberFormat === 'number') {
            return numeral(value).format('0,0');
        }

        let charValue = '';

        if(char && char.length > 0) {
            console.log('dddd') 
            for(let x=0; x<value.length; x++) {
                char.map((data, index) => {
                    // console.log(data);
                    // if(data.set_number === value.charAt(x)) {
                    //     console.log(data.set_char);
                    // }
                });

                charValue += value.charAt(x);
            }
        }


        // console.log('price_with_char', charValue);
    

        // for(let x=0; x<value.length; x++) {
        //     const getNumber = value.charAt(x);

        //     char.map((data, index) => {
        //         if(data.set_number === getNumber) {
        //             charValue += data.set_char;
        //         }
        //     })
        // }

        // return charValue;

        
    }

    return [
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
            selector: (row) => {
                if(!row.category) {
                    return 'Unknown Category'
                }

                return row.category.name;
               

            },
            sortable: true,
        },

        {
            name: <span className={`datatable-header ${zawgyi(lang)}`}> {t('item-mm-model')} </span>,
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
            selector: row => row.price === null ? 0 : num(row.price),
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
