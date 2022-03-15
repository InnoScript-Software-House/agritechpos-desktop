import React, { useEffect, useState } from "react";
import { Badge } from "react-bootstrap";
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
            width: "50px"
        },
        {
            name: <span className="database-header"> Category </span>,
            selector: row => row.category_title,
            sortable: true,
            width: "200px"
        },
        {
            name: <span className="database-header"> Material Code </span>,
            selector: row => row.code,
            sortable: true,
            width: "200px"
        },
        {
            name: <span className="database-header"> English Name </span>,
            selector: row => row.eng_name,
            sortable: true,
            width: "200px"
        },
        {
            name: <span className="database-header"> Myanmar Name </span>,
            selector: row => row.mm_name,
            sortable: true,
            width: "200px"
        },
        {
            name: <span className="database-header"> Model </span>,
            selector: row => row.model,
            sortable: true,
            width: "200px"
        },
        {
            name: <span className="database-header"> Qty </span>,
            selector: row => numeral(row.qty).format('0,0'),
            sortable: true,
            width: "200px"
        },
        {
            name: <span className="database-header"> Price(MMK) </span>,
            selector: row => num(row.price),
            sortable: true,
            width: "200px"
        },
        {
            name: <span className="database-header"> Total Price(MMK) </span>,
            selector: row => `${numeral(row.price * row.qty).format('0,0')} MMK`,
            sortable: true,
            width: "200px"
        },
        {
            name: <span className="database-header"> Sell Percentage </span>,
            selector: row => row.percentage,
            sortable: true,
            width: "200px"
        },
        {
            name: <span className="database-header"> Sell Price(MMK) </span>,
            selector: row =>  `${numeral(Number(row.price) + (Number(row.price) * Number((row.percentage/100)))).format('0,0')} MMK`,
            sortable: true,
            width: "200px"
        },
        {
            name: <span className="database-header"> Location </span>,
            selector: row => row.location,
            sortable: true,
            width: "200px"
        },
        {
            name: <span className="database-header"> Status </span>,
            selector: row => <Badge bg={row.active ? 'success' : 'danger'}> {row.active ? 'Publish' : 'Unpublished'} </Badge>,
            sortable: true,
            width: "200px"
        },
        {
            name: <span className="database-header"> Option </span>,
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
            sortable: true,
            width: "200px"
        }
    ];

    if(type === 'category') {
        delete columns[1];
    }
    return columns;
}
