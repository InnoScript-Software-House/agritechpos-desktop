import React from 'react';
import QRCode from 'qrcode.react';
import { Card } from 'react-bootstrap';

export const ItemQRComponent = ({ item }) => {
 
    return(
        <>
            <Card>
                <Card.Header>
                    <Card.Title className="d-md-flex flex-md-row">
                        <span> QR Code </span>
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
                            <label> Item Name (English) - {item.eng_name} </label>
                            <label> Item Name (Myanmar) - {item.mm_name} </label>
                            <label> Code - {item.code} </label>
                            <label> Model - {item.model} </label>
                            <label> Category - {item.category ? item.category.name : '----'} </label>
                            <label> Location - {item.location} </label>
                        </div>
                    </div>
                </Card.Body>
            </Card>
        </>
    )
}