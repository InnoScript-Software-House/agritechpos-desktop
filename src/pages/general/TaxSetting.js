import React from 'react'
import { Card } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { t, zawgyi } from "../../utilities/translation.utility";

const TaxSetting = () => {

    const state = useSelector(state => state);
    const { lang } = state;

    return (
        <>
            <Card>
                <Card.Header>
                    <Card.Title className={`${zawgyi(lang)}`}> {t('title-tax-setting')} </Card.Title>
                </Card.Header>

                <Card.Body>

                </Card.Body>
            </Card>
        </>
    )
}

export default TaxSetting