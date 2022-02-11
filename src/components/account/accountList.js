
import React, { useEffect, useState } from 'react';
import { Card, Table } from 'react-bootstrap';
import { t, zawgyi } from '../../utilities/translation.utility';

import '../../assets/css/components/account-list.css';

export const AccountList = ({ props, dataSource }) => {
    const { lang } = props.reducer;

    return(
        <div className='d-md-flex flex-row'>
            <div className='col-md-12 p-2'>
                <Card className='p-2'>
                    <Card.Title className='p-2'>
                        <span className={`${zawgyi(lang)}`}> {t('account-list-title')} </span>
                    </Card.Title>

                    <Card.Body>
                        <Table>
                        <thead>
                            <tr>
                            <th>#</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Username</th>
                            </tr>
                        </thead>

                        </Table>
                    </Card.Body>
                </Card>
            </div>
        </div>
    )
}