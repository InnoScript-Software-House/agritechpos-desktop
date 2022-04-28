import React, { useState } from 'react'
import { FormControl, InputGroup } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { zawgyi, t } from '../../utilities/translation.utility';

const CategorySearchComponent = ({ categoriesList , reload }) => {

    const state = useSelector(state => state)
    const { lang } = state;

    const [text, setText] = useState('');
    const [items, setItems] = useState([]);

    const suggestionSearch = ( value ) => {

        setText(value);

        if(value === '') {
            reload(categoriesList)
            return;
        }
    }

    return (
        <>
            <InputGroup>
                <FormControl
                    className={`${zawgyi(lang)}`}
                    type="text"
                    placeholder={t('search')} 
                    value={text}
                    onChange={e => setText(e.target.value)}
                    onKeyPress={e => {
                        if(e.code === 'Enter') {
                            suggestionSearch(e.target.value)
                        }
                    }}
                    />
            </InputGroup>
        </>
    )
}

export default CategorySearchComponent