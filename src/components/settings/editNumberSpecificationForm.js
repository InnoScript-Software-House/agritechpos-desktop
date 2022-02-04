import React, { useCallback, useEffect, useState } from 'react';
import { Badge, Card, FormControl, InputGroup, Table } from 'react-bootstrap';
import { t, zawgyi } from '../../utilities/translation.utility';
import { getNumberSpecList, updateChar } from '../../services/numberSpecification.service';

import '../../assets/css/components/number-specification.css';
import moment from 'moment';
import { BsAlarm } from 'react-icons/bs';

export const EditNumberSpecificationForm = ({ props, dataSource, reload }) => {
    const { lang } = props.reducer;
    const [numList, setNumList] = useState([]);
    const [error, setError] = useState(null);
    const [update, setUpdate] = useState(false);
    
    useEffect(() => {
        setNumList(dataSource);
    },[dataSource]);

    useEffect(() => {
        if(update) {
            setUpdate(false);
        }
    },[update]);

    const handleChange = useCallback(async (index, id, e) => {
        numList[index].set_char = e.target.value === '' ? e.target.value : e.target.value.toUpperCase();

        if(e.target.value === '') {
            setUpdate(true);
            return;
        }

        const response = await updateChar(id, {
            set_char: e.target.value
        });

        if(response && response.status === 400) {
            setError(response.message);
            reload(true);
            return;
        }
        
        setError(null);
        reload(true);
    });

    return(
        <div className='d-flex flex-column ms-3'>
            <Card>
                <Card.Title className={`m-3 ${zawgyi(lang)}`}> {t('number-spec-edit-title')} </Card.Title>
                
                <Card.Body>
                    <Card.Text className={`char-error ${zawgyi(lang)}`}> {error} </Card.Text>
                    {numList && numList.map((numSpec, index) => {

                        return(
                            <InputGroup
                                className='mb-3 align-items-center'
                                key={`input_id_${index}`}
                            >
                                <label> {`${t('number-spec-set-number-label')} - (${numSpec.set_number})`} </label>

                                <FormControl 
                                    className={`ms-3 ${zawgyi(lang)}`}
                                    type='text'
                                    placeholder={t('number-spec-input-setchar')}
                                    value={numSpec.set_char || ''}
                                    onChange={(e) => handleChange(index, numSpec.id, e)}
                                    maxLength={1}
                                />

                                <FormControl 
                                    className={`ms-3 ${zawgyi(lang)}`}
                                    as="select"
                                >
                                    <option> Disable </option>
                                    <option> Enable </option>
                                </FormControl>
                            </InputGroup>
                        )
                    })}
                </Card.Body>
            </Card>
        </div>
    )
}