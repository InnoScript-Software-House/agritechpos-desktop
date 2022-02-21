
import React, { useCallback, useEffect, useState } from 'react';
import { Badge, Button, Card, FormControl, InputGroup, Table } from 'react-bootstrap';
import { t, zawgyi } from '../../utilities/translation.utility';
import DataTable from 'react-data-table-component';
import { BsArrowUpRightSquare, BsTrash } from 'react-icons/bs';

import '../../assets/css/components/account-list.css';
import { delUser, getUsers } from '../../services/user.service';
import { setOpenToastAction } from '../../redux/actions/toast.action';
import { useDispatch } from 'react-redux';

const SubHeaderComponent = () => {
    return(
        <div>
            <InputGroup className='input-group-search'>
                <FormControl
                    type='text'
                    placeholder='အရောင်းစာရေးနာမည်/ဖုန်းနံပါတ်ဖြင့် ရှာဖွေရန်'
                />

                <Button className='btn-search'> ရှာဖွေမည် </Button>
            </InputGroup>
        </div>
    )
}

export const AccountList = ({ props, dataSource, reload, edit }) => {
    const { lang } = props.reducer;
    const [error, setError] = useState(null);

    const paginationComponentOptions = {
        noRowsPerPage: false,
        rowsPerPageText: t('table-viewed-record'),
        rangeSeparatorText: t('table-total-record'),
        selectAllRowsItem: false,
    };

    const columns = [
        {
            name: t('user-table-name'),
            selector: row => row.name,
            sortable: true,
        },
        {
            name: t('user-table-phone'),
            selector: row => row.phone,
            sortable: true,
        },
        {
            name: t('user-table-email'),
            selector: row => row.email,
            sortable: true,
        },
        {
            name: t('user-table-active'),
            selector: row => {
                return(
                    <Badge bg={row.active ? 'success' : 'danger'}> {row.active ? 'Active' : 'Block'} </Badge>
                )
            },
            sortable: true,
        },
        {
            name: t('option'),
            selector: row => {
                return(
                    <div className='d-flex flex-row'>
                        <BsArrowUpRightSquare size={20} className="btn-icon" onClick={() => edit(row)}/>
                        <BsTrash size={20} className="btn-icon ms-3" onClick={() => deleteUser(row.id)} />
                    </div>
                )
            }
        }
    ];
    
    const deleteUser = async (id) => {
        const response = await delUser(id);

        if(response && response.success === false) {
            dispatch(setOpenToastAction('Delete Account', err, 'danger'));
            return;
        }

        reload(true);
        setError(null);
        return;
    }

    return(
        <div className='d-md-flex flex-row'>
            <div className='col-md-12 p-2'>
                <Card className='p-2'>
                    <Card.Title className='p-2'>
                        <span className={`${zawgyi(lang)}`}> {t('account-list-title')} </span>
                    </Card.Title>

                    <Card.Body>
                        <DataTable
                            className='user-table'
                            subHeader={true}
                            subHeaderComponent={<SubHeaderComponent />}
                            pagination
                            fixedHeader
                            fixedHeaderScrollHeight="400px"
                            columns={columns}
                            data={dataSource}
                            paginationComponentOptions={paginationComponentOptions}
                            dense
                            highlightOnHover
                            pointerOnHover
                        />
                    </Card.Body>
                </Card>
            </div>
        </div>
    )
}