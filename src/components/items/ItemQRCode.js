import React from 'react';
import QRCode from 'qrcode.react';
import { Card } from 'react-bootstrap';
import { zawgyi, t } from '../../utilities/translation.utility';

export const ItemQRComponent = ({ item, props }) => {
    
    const { lang } = props.reducer;
    return(
        <>
            <Card>
                <Card.Header>
                    <Card.Title className="d-md-flex flex-md-row">
                        <span className='title'> QR Code </span>
                    </Card.Title>
                </Card.Header>

                <Card.Body>
                    <div className='d-md-flex flex-md-row justify-content-start align-items-start'>
                        <QRCode 
                            className='me-3'
                            id={item.id}
                            value={`Model- ${item.model}, Name- ${item.eng_name}`} 
                            size={140}
                            includeMargin
                            level='Q'
                        />

                        <div className='d-md-flex flex-md-column'>
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