import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { useSelector } from "react-redux";
import { changeNumberFormat } from "../../utilities/number.utility";
import { t, zawgyi } from "../../utilities/translation.utility";
import numeral from 'numeral';
import { SortByAlphabet, SortByNumber } from "../../utilities/tableSort.utility";

const OverlayToolTip = (row, filedName) => {
    return(
        <OverlayTrigger placement="top" overlay={<Tooltip> {row[filedName]} </Tooltip>}>
            <span> {row[filedName]} </span>
        </OverlayTrigger>
    )
}

export const CategoryColumns = () => {
    const state = useSelector(state => state);
    const { numberFormat, char, lang } = state;

    const num = (value) => {
        return changeNumberFormat(value, numberFormat, char);
    }

    const columns = [
        {   
            name: <span> # </span>,
            selector: (row, index) => index + 1,
            width: '70px'
        },
        {
            name: <span className={`${zawgyi(lang)}`}> {t('name')} </span>,
            selector: row => OverlayToolTip(row, 'name'),
            sortable: true,
            sortFunction: (rowA, rowB) => SortByAlphabet(rowA, rowB, 'name')
        },
        {
            name: <span className={`${zawgyi(lang)}`}> {t('description')} </span>,
            selector: row => OverlayToolTip(row, 'description')
        },
    ];

    return columns;
}
