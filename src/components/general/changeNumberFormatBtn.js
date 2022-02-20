import React, { useState } from "react";
import { FormSelect, InputGroup } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { setNumberFormatAction } from "../../redux/actions/numberFormat.action";
import { setOpenToastAction } from "../../redux/actions/toast.action";
import { getNumberSpecList } from "../../services/numberSpecification.service";
import { setCharAction } from '../../redux/actions/charaster.action';
import { t, zawgyi } from "../../utilities/translation.utility";

export const ChangeNumberFormatBtn = ({ props }) => {
    const { lang, numberFormat } = props.reducer;

    const [format, setFormat] = useState(numberFormat);
    const dispatch = useDispatch();

    const httpHandler = (response) => {
        if(response && response.success === false) {
            dispatch(setOpenToastAction('Number Specification', response.message));
        }

        return response;
    }

    const fetchData = async () => {
        const numberList = await getNumberSpecList();
        return httpHandler(numberList);
    }

    const changeNumberFormat = async (value) => {
        if(value === 'character') {
            const data = await fetchData();
            const nullValue = data.filter(value => value.set_char === null);

            if(nullValue.length !== 0) {
               dispatch(setOpenToastAction('Number Specification', t('num-spec-use-error'), 'danger'));
               setFormat(numberFormat);
               return;
            }

            if(nullValue.length === 0) {
                console.log(nullValue);
                dispatch(setCharAction(data));            
            }
        }

        setFormat(value);
    }

    return(
        <div className="d-md-flex flex-md-column justify-content-start align-items-center">
            <label className={`${lang} me-3`}> {t('btn-change-number-format-label')} </label>
            <InputGroup className='select-input-group'>
                <FormSelect 
                    className={zawgyi(lang)}
                    onChange={(e) => changeNumberFormat(e.target.value)}
                    defaultValue={format}
                >
                    <option value='number'> Number </option>
                    <option value='character'> Character </option>
                </FormSelect>
            </InputGroup>
        </div>
    )
}

