import React, { useCallback, useState } from 'react';
import { FormSelect, InputGroup } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { t, zawgyi } from '../../utilities/translation.utility';
import { setLangAction } from '../../redux/actions/lang.action';

import '../../assets/css/components/language.css';

const languages = [
    {   
        label: 'unicode',
        value: 'unicode'
    },
    {
        label: 'zawgyi',
        value: 'zawgyi'
    },
    {
        label: 'english',
        value: 'en'
    }
]

export const Language = ({props}) => {
    const { lang } = props.reducer;
    const [lng, setLang] = useState(lang);
    const dispatch = useDispatch();

    const changeLng = useCallback((selectedValue) => {
        dispatch(setLangAction(selectedValue));
        setLang(selectedValue);
    });

    return(
        <div className='lang-wrapper'>
            <h3 className={`lang-title ${zawgyi(lng)}`}> {t('change-language')} </h3>

            <InputGroup className='lang-input-group'>
                <FormSelect 
                    className={zawgyi(lng)}
                    onChange={(e) => changeLng(e.target.value)}
                    defaultValue={lng}
                >
                    {
                        languages.map((value, index) => {
                            return(
                                <option 
                                    className={zawgyi(lng)}
                                    key={`lnag_id_${index}`} 
                                    value={value.value}
                                > 
                                    {t(value.label)} 
                                </option>
                            )
                        })
                    }
                </FormSelect>
            </InputGroup>
        </div>
    )
}

