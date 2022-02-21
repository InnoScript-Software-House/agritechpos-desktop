import moment from 'moment';
import React, { useCallback, useEffect, useState } from 'react';
import { Badge, Button, Card, FormControl, InputGroup, Table } from 'react-bootstrap';
import { t, zawgyi } from '../../utilities/translation.utility';
import { getNumberSpecList, updateChar } from '../../services/numberSpecification.service';
import { BsArrowCounterclockwise } from "react-icons/bs";

import '../../assets/css/components/number-specification.css';

export const EditNumberSpecificationForm = ({ props, dataSource, reload }) => {
    const { lang } = props.reducer;
    const [numList, setNumList] = useState([]);
    const [error, setError] = useState(null);
    const [update, setUpdate] = useState(false);

    const reloadApi = () => {
        setError(null);
        reload(true);
    }

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
        setUpdate(true);
        reload(true);
    });

    useEffect(() => {
        setNumList(dataSource);
    },[dataSource]);

    useEffect(() => {
        if(update) {
            setUpdate(false);
        }
    },[update]);

    return(
        <div className='d-md-flex flex-column ms-1'>
            <Card>
                <Card.Title 
                    className='p-2 d-md-flex flex-row justify-content-between number-spec-info-title'
                > 
                    <span className={`${zawgyi(lang)}`}> {t('number-spec-edit-title')} </span>
                    <div className='icon-btn' onClick={() => reloadApi()}>
                        <BsArrowCounterclockwise size={20} />
                    </div>
                </Card.Title>
                
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
                                        className={`ms-1 ${zawgyi(lang)}`}
                                        type='text'
                                        placeholder={t('number-spec-input-setchar')}
                                        value={numSpec.set_char || ''}
                                        onChange={(e) => handleChange(index, numSpec.id, e)}
                                        maxLength={1}
                                    />
                                </InputGroup>
                            )
                        })}
                </Card.Body>
            </Card>
        </div>
    )
}