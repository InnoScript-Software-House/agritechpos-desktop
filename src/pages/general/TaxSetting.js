import React, { useEffect, useState } from 'react'
import { Card, FormControl, InputGroup } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { taxAction } from '../../redux/actions/tax.action';
import { messageBoxType } from '../../utilities/native.utility';
import { t, zawgyi } from "../../utilities/translation.utility";

const TaxSetting = () => {

    const state = useSelector(state => state);
    const { lang } = state;
    const dispatch = useDispatch();
    const { nativeApi } = window;

    const [taxAmount, setTaxAmount] = useState('')
    const [messageBoxTitle] = useState('Updated Percentage')

    const saveTax = async (value) => {
        if(!Number(value <= 100)) {
            nativeApi.messageBox.open({
                title: messageBoxTitle,
                message: t('invalid-percentage') , 
                type: messageBoxType.info
            })
        }
        setTaxAmount(value);
        dispatch(taxAction(value));
        return;
    }

    useEffect(() => {
        const getTax = localStorage.getItem('TAX_CHANGE') && localStorage.getItem('TAX_CHANGE');
        setTaxAmount(getTax)
    },[])

    return (
        <>
            <Card>
                <Card.Header>
                    <Card.Title className={`${zawgyi(lang)}`}> {t('title-tax-setting')} </Card.Title>
                </Card.Header>

                <Card.Body>
                    <InputGroup>
                        <FormControl
                            type='amount'
                            placeholder={t('tax-charges')}
                            value={taxAmount}
                            onChange={(e) => {
                                saveTax(e.target.value)
                            }}
                        />
                    </InputGroup>
                </Card.Body>
            </Card>
        </>
    )
}

export default TaxSetting