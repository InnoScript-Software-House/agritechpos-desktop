import React, { useCallback, useEffect, useState } from 'react';
import { Card, Table } from 'react-bootstrap';
import { t, zawgyi } from '../../utilities/translation.utility';
import { getNumberSpecList } from '../../services/numberSpecification.service';
import { EditNumberSpecificationForm } from './editNumberSpecificationForm';
import { HistoryLog } from '../general/Historylog';

import '../../assets/css/components/number-specification.css';

export const NumberSpecificationComponent = ({ props }) => {
    const { lang } = props.reducer;

    const [numLists, setNumLists] = useState([]);

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
            fetchApi();
        }
    }

    return(
        <div className='col-md-10'>
            <div className='number-spec-component p-1'>
                <div className='d-md-flex flex-row justify-content-start'>
                    <Card className='col-md-3'>
                        <Card.Title className="number-spec-info-title p-2"> 
                            <span className={`${zawgyi(lang)}`}> {t('number-spec-info-title')} </span> 
                        </Card.Title>

                        <Card.Body className='p-1'>
                            <Table striped bordered className='table-wrapper'>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th className={`${zawgyi(lang)}`}> {t('number-spec-table-number')} </th>
                                        <th className={`${zawgyi(lang)}`}>  {t('number-spec-table-char')} </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {numLists.map((numSpec, index) => {
                                        return(
                                            <tr key={`number_id_${index}`}>
                                                <td> {index + 1} </td>
                                                <td> {numSpec.set_number} </td>
                                                <td> {numSpec.set_char} </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                    
                    <div className='col-md-4'>
                        <EditNumberSpecificationForm props={props} dataSource={numLists} reload={(e) => getUpdateStatus(e)} />
                    </div>

                    <div className='col-md-5'>
                        <HistoryLog props={props} title="log-number-spec-title" />
                    </div>
                </div>
            </div>
        </div>
    )
}