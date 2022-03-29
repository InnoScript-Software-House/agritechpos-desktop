import React, { useState } from "react";
import { FormSelect, InputGroup } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { setNumberFormatAction } from "../../redux/actions/numberFormat.action";
import { setOpenToastAction } from "../../redux/actions/toast.action";
import { getNumberSpecList } from "../../services/numberSpecification.service";
import { setCharAction } from '../../redux/actions/charaster.action';

export const ChangeNumberFormatBtn = ({ props }) => {
    const { numberFormat } = props.reducer;

    const [format, setFormat] = useState(numberFormat);
    const dispatch = useDispatch();

    const fetchData = async () => {
        const response = await getNumberSpecList();
        if(response && response.success === false) {
            dispatch(setOpenToastAction('Number Specification', response.message));
            return;
        }

        return response;
    }

    const changeNumberFormat = async (value) => {
        if(value === 'character') {
            const data = await fetchData();

            const nullValue = data.filter(value => value.set_char === null);

            if(nullValue.length !== 0) {
               dispatch(setOpenToastAction('Number Specification', "Number charaster set can't be used, Please check number specification setting", 'danger'));
               setFormat(numberFormat);
               return;
            }

            if(nullValue.length === 0) {
                dispatch(setCharAction(data));          
            }
        }

        dispatch(setNumberFormatAction(value)); 
        setFormat(value);
    }

    return(
        <div className="d-md-flex flex-md-column justify-content-start align-items-center">
            <label className="me-3"> Change Number Format </label>
            <InputGroup className='select-input-group'>
                <FormSelect 
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

