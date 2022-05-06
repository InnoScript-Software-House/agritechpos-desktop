import React, { useEffect, useState } from 'react'
import { Card, FormControl, InputGroup } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { taxAction } from '../../redux/actions/tax.action';
import { t, zawgyi } from "../../utilities/translation.utility";

const TaxSetting = () => {

    const state = useSelector(state => state);
    const { lang } = state;
    const dispatch = useDispatch();

    const [taxAmount, setTaxAmount] = useState('')

    const saveTax = async () => {
        dispatch(taxAction(taxAmount))
    }

    useEffect(() => {
        dispatch(taxAction(taxAmount))
    })

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
                                setTaxAmount(e.target.value)
                            }}
                        />
                    </InputGroup>
                </Card.Body>
            </Card>
        </>
    )
}

export default TaxSetting