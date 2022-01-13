import React from 'react';
import { Button, FormControl, FormSelect, InputGroup } from 'react-bootstrap';
import { pages } from '../../assets/i18n/mm.json';

const languages = [
    {   id: 1,
        label_mm: 'Myanmar (Unocide)',
        translate: 'mm.json',
    },
    {
        id: 2,
        label_mm: 'Myanmar (Zawgyi)',
        translate: 'zawgyi.json'
    },
    {
        id: 3,
        label_mm: 'English',
        translate: 'en.json'
    }
]

export const LanguageComponent = ({ dataSource }) => {

    return(
        <>
            <div className='setting-content-wrapper'>
                <h3 className='language-header'> {`${pages.setting.header_title} - ${dataSource.label}`} </h3>

                <div className='language-wrapper'>
                    <InputGroup className='language-input-group'>
                        <FormSelect>
                            {
                                languages.map((value, index) => {
                                    return(
                                        <option key={`language_id_${index}`} value={value.id}> {value.label_mm} </option>
                                    )
                                })
                            }
                        </FormSelect>
                        <Button className='btn-ok'> Save </Button>
                    </InputGroup>
                </div>
            </div>
        </>
    )

}