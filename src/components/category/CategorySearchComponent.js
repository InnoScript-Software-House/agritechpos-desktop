import React, { useEffect, useState } from 'react'
import { FormControl, InputGroup } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { zawgyi, t } from '../../utilities/translation.utility';

export const CategorySearchComponent = ({ categoriesList , retrive }) => {

    const state = useSelector(state => state)
    const { lang } = state;

    const [text, setText] = useState('');
    const [items, setItems] = useState([]);

    const suggestionSearch = ( value ) => {

        setText(value);

        if(value === '') {
            retrive(categoriesList)
            return;
        }

        const suggestionResultForName = items.filter((item) => item.name !== null && item.name.toLowerCase().includes(text.toLowerCase()))
        const suggestionResultForDescription = items.filter((item) => item.description !== null && item.description.toLowerCase().includes(text.toLowerCase()))

        const suggestionResult = suggestionResultForName.concat(suggestionResultForDescription)

        reload(suggestionResult)
        return;
    }

    useEffect(() => {
        if(categoriesList) {
            setItems(categoriesList)
        }
    },[categoriesList])
    

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