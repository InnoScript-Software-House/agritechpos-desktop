import React, { useState } from "react";
import { Badge } from "react-bootstrap";
import { BsArrowUpRightSquare, BsTrash } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { setOpenDelModal } from "../../redux/actions/openDelModal.action";
import { changeNumberFormat } from "../../utilities/number.utility";
import { zawgyi, t } from "../../utilities/translation.utility";

const numeral = require('numeral');

export const itemColumns = (props) => {
    const { lang, numberFormat, char } = props.reducer;
    const history = useHistory();
    const dispatch = useDispatch();

    const num = (value) => {
        return changeNumberFormat(value, numberFormat, char);
    }

    return [
        {   
            name: <span className='datatable-header'> # </span>,
            selector: (row, index) => index + 1,
            sortable: true,
            width: "50px"
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
            name: <span className={`datatable-header ${zawgyi(lang)}`}> {t('item-price')} (MMK) </span>,
            selector: row => num(row.price),
            sortable: true,
        },
        {
            name: <span className={`datatable-header ${zawgyi(lang)}`}> {t('item-total-price')} (MMK)</span>,
            selector: row => numeral(row.price * row.qty).format('0,0'),
            sortable: true,
        },
        {
            name: <span className={`datatable-header ${zawgyi(lang)}`}> {t('item-sell-percentage')} </span>,
            selector: row => row.percentage,
            sortable: true,
        },
        {
            name: <span className={`datatable-header ${zawgyi(lang)}`}> {t('item-sell-fix-amount')} (MMK) </span>,
            selector: row => numeral(Number(row.fix_amount)).format('0,0'),
            sortable: true,
        },
        {
            name: <span className={`datatable-header ${zawgyi(lang)}`}> {t('item-location')} </span>,
            selector: row => row.location,
            sortable: true,
        },
        {
            name: <span className={`datatable-header ${zawgyi(lang)}`}> {t('item-status')} </span>,
            selector: row => <Badge bg={row.active ? 'success' : 'danger'}> {row.active ? 'Publish' : 'Unpublished'} </Badge>,
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
