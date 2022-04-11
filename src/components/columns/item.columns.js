// import { orderBy, sortBy } from "lodash";
// import { Badge } from "react-bootstrap";
import { t } from "i18next";
import React, { useEffect, useState } from "react";
import { BsArrowUpRightSquare, BsTrash } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { setOpenDelModal } from "../../redux/actions/openDelModal.action";
import { changeNumberFormat } from "../../utilities/number.utility";

const numeral = require('numeral');

export const itemColumns = (props) => {

    const { numberFormat, char } = props.reducer;
    const { url } = props.match;

    const history = useHistory();
    const dispatch = useDispatch();

    const [type, setType] = useState('');

    const sortSellPrice = (rowA, rowB) => {
        const sellPriceA = Number(rowA.price) + (Number(rowA.price) * (Number(rowA.qty/100)));
        const sellPriceB = Number(rowB.price )+ (Number(rowB.price) * (Number(rowB.qty/100)));
        if(Number(sellPriceA) > Number(sellPriceB)){
            return 1;
        }
        if(Number(sellPriceA) < Number(sellPriceB)){
            return -1;
        }
        return 0;
    }

    const num = (value) => {
        return changeNumberFormat(value, numberFormat, char);
    }

    useEffect(() => {
        const getUrlType = url.split('/')[1];
        setType(getUrlType);
    }, []);

    const columns = [
        {   
            name: <span className='datatable-header'> # </span>,
            selector: (row, index) => index + 1,
            sortable: true,
            width: "60px"
        },
        {
            name: <span className="database-header"> {t('option')} </span>,
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
                                title: 'Delete Record',
                                message: 'Are you sure to delete record',
                                id: row.id,
                                type: 'items'
                            }))}
                        />
                   </>
               )
            },
            sortable: false
        },
        // {
        //     name: <span className="database-header"> Category </span>,
        //     selector: row => row.category_title,
        //     sortable: true,
        //     width: "200px"
        // },
        {
            name: <span className="database-header"> {t('materail-code')} </span>,
            selector: row => row.code,
            sortable: true,
            width: "250px"
        },
        {
            name: <span className="database-header"> {t('name')} </span>,
            selector: row => row.eng_name,
            sortable: true,
            width: "250px"
        },
        // {
        //     name: <span className="database-header"> Myanmar Name </span>,
        //     selector: row => row.mm_name,
        //     sortable: true,
        //     width: "200px"
        // },
        // {
        //     name: <span className="database-header"> Model </span>,
        //     selector: row => row.model,
        //     sortable: true,
        //     width: "200px"
        // },
        {
            name: <span className="database-header"> {t('quantity')} </span>,
            selector: row => row.qty,
            sortable: true
        },
        {
            name: <span className="database-header"> {t('price')} </span>,
            selector: row => num(row.price),
            sortable: true
        },
        {
            name: <span className="database-header"> {t('total')} </span>,
            selector: row => `${numeral(row.price * row.qty).format('0,0')}  ${t('mmk')}`,
            sortable: true
        },
        {
            name: <span className="database-header"> {t('percentage')} </span>,
            selector: row => row.percentage,
            sortable: true
        },
        {
            name: <span className="database-header"> {t('sale-price')} </span>,
            selector: row =>  `${numeral(Number(row.price) + (Number(row.price) * Number((row.percentage/100)))).format('0,0')}  ${t('mmk')}`,
            sortFunction: (rowA, rowB) => sortSellPrice(rowA, rowB),
        },
        {
            name: <span className="database-header"> {t('location')} </span>,
            selector: row => row.location,
            sortable: true
        },
        // {
        //     name: <span className="database-header"> Status </span>,
        //     selector: row => <Badge bg={row.active ? 'success' : 'danger'}> {row.active ? 'Publish' : 'Unpublished'} </Badge>,
        //     sortable: true,
        //     width: "200px"
        // },
        
    ];

    if(type === 'category') {
        delete columns[1];
    }
    return columns;
}
