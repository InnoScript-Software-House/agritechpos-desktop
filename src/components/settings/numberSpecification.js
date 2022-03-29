import React, { useCallback, useEffect, useState } from 'react';
import { Card, Table } from 'react-bootstrap';
import { getNumberSpecList } from '../../services/numberSpecification.service';
import { EditNumberSpecificationForm } from './editNumberSpecificationForm';
import { HistoryLog } from '../general/Historylog';

export const NumberSpecificationComponent = ({ props }) => {
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
        if(e) { fetchApi(); }
    }

    return(
        <div className='row mt-3'>
            <div className='col-md-4'>
                <Card>
                    <Card.Header>
                        <Card.Title> Number Specification </Card.Title>
                    </Card.Header>

                    <Card.Body>
                        <Table striped bordered className='table-wrapper'>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th> Number </th>
                                    <th> Character </th>
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
            </div>

            <div className='col-md-4'>
                <EditNumberSpecificationForm props={props} dataSource={numLists} reload={(e) => getUpdateStatus(e)} />
            </div>

            <div className='col-md-4'>
                <HistoryLog props={props} title="Number Specification History Log" />
            </div>
        </div>
    )
}