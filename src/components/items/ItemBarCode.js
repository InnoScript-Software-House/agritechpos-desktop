import React from "react";
import BarCode from "react-barcode";
import { Card } from "react-bootstrap";
import { zawgyi, t } from '../../utilities/translation.utility';

export const ItemBarCodeComponent = ({ item, props }) => {

    const { lang } = props.reducer;

    return(
        <>
            <Card className="mt-3">
                <Card.Header>
                    <Card.Title className="d-md-flex flex-md-row">
                        <span className="title"> BarCode </span>
                    </Card.Title>
                </Card.Header>

                <Card.Body>
                    <div className='d-md-flex flex-md-row justify-content-start align-items-start'>
                        <BarCode
                            format={"CODE128"}
                            displayValue={true}
                            fontSize={16}
                            width={2}
                            height={50}
                            margin={10}
                            textMargin={2}
                            value={`${item.model} - ${item.eng_name}`} 
                        />

                        <div className='d-md-flex flex-md-column ms-3'>
                        <label className={`${zawgyi(lang)}`}> {t('input-item-eng-name')} - <span className="ms-3"> {item.eng_name} </span> </label>
                            <label className={`${zawgyi(lang)}`}> {t('input-item-mm-name')} - <span className="ms-3"> {item.mm_name} </span> </label>
                            <label className={`${zawgyi(lang)}`}> {t('input-item-code')} - <span className="ms-3"> {item.code} </span> </label>
                            <label className={`${zawgyi(lang)}`}> {t('input-item-model')} - <span className="ms-3"> {item.model} </span> </label>
                            <label className={`${zawgyi(lang)}`}> {t('table-col-category')} - <span className="ms-3"> {item.category ? item.category.name : '----'} </span> </label>
                            <label className={`${zawgyi(lang)}`}> {t('input-item-location')} - <span className="ms-3"> {item.location} </span> </label>
                        </div>
                    </div>
                </Card.Body>
            </Card>
        </>
    )
}