import React, { useCallback, useEffect, useState } from 'react';
import { Badge, Card, Table } from 'react-bootstrap';
import { t, zawgyi } from '../../utilities/translation.utility';
import { getNumberSpecList } from '../../services/numberSpecification.service';

import '../../assets/css/components/number-specification.css';
import { EditNumberSpecificationForm } from './editNumberSpecificationForm';

export const NumberSpecificationComponent = ({ props }) => {
    const { lang } = props.reducer;

    const [numLists, setNumLists] = useState([]);
    const [update, setUpdate] = useState(false);

    const fetchApi = useCallback( async () => {
        const response = await getNumberSpecList();
        if(response) {
            setNumLists(response);
        }

    },[]);

    useEffect(() => {
        fetchApi();
    },[fetchApi]);

    const getUpdateStatus = (e) => {
        if(e) {
            fetchApi()
        }
        
    }

    return(
        <div className='number-spec-component m-3'>
            <div className='d-flex flex-row justify-content-between'>
                <div className='col-3'>
                    <Card>
                        <Card.Body>
                            <Card.Title className={`number-spec-info-title ${zawgyi(lang)}`}> {t('number-spec-info-title')} </Card.Title>

                            <Card.Body>
                                <Table striped bordered>
                                    <thead>
                                        <tr>
                                        <th>#</th>
                                        <th className={`${zawgyi(lang)}`}> {t('number-spec-table-number')} </th>
                                        <th className={`${zawgyi(lang)}`}>  {t('number-spec-table-char')} </th>
                                        <th className={`${zawgyi(lang)}`}>  {t('number-spec-table-status')} </th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                    {numLists.map((numSpec, index) => {
                                        return(
                                            <tr key={`number_id_${index}`}>
                                                <td> {index + 1} </td>
                                                <td> {numSpec.set_number} </td>
                                                <td> {numSpec.set_char} </td>
                                                <td>
                                                    <Badge  bg={`${numSpec.active === true ? 'success' : 'warning'}`}>
                                                        {numSpec.active === true ? 'Enable' : 'Disable'}
                                                    </Badge>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card.Body>
                    </Card>
                </div>
                
                <div className='col-9'>
                    <EditNumberSpecificationForm props={props} dataSource={numLists} reload={(e) => getUpdateStatus(e)}/>
                </div>
            </div>
        </div>
    )
}