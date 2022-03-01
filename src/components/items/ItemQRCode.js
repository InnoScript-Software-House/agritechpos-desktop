import React from 'react';
import QRCode from 'qrcode.react';
import { t, zawgyi } from "../../utilities/translation.utility";
import { LoadingComponent } from "../general/Loading";
import { useDispatch } from 'react-redux';
import { Card, Button } from 'react-bootstrap';

export const ItemQRComponent = ({ props, item, reload }) => {

    const { lang } = props.reducer;
    const dispatch = useDispatch();

    const downloadQr = (e) => {
        
    }
    

    return(
        <>
        <Card>
            <Card.Header>
                <Card.Title className="d-md-flex flex-md-row justify-content-between align-items-center">
                    <span>QR Code for {item.model}</span>
                </Card.Title>
            </Card.Header>
            <Card.Body>
                <div>
                    <QRCode 
                    className=''
                    id={item.id}
                    className=''
                    value={`Model- ${item.model}, Name- ${item.eng_name}`} 
                    size={172}
                    includeMargin
                    level='Q'
                    /> 
                </div>
            </Card.Body>
            <Card.Footer>
                <Button className='btn-small w-full' onClick={() => downloadQr()}>
                    Print 
                </Button>
            </Card.Footer>
        </Card>
        </>
    )
}