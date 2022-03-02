import React from "react";
import BarCode from "react-barcode";
import { Card, Button } from "react-bootstrap";

export const ItemBarCodeComponent = ({ props, item, reload}) => {
    const { lang } = props.reducer;

    const downloadBarcode = () => {

    }


    return(
        <>
        <Card>
            <Card.Header>
                <Card.Title className="d-md-flex flex-md-row justify-content-between align-items-center">
                    <span>Bar Code For {item.model}</span>
                </Card.Title>
            </Card.Header>
                <Card.Body>
                    <div className="className='d-md-flex flex-md-column justify-content-between align-items-center'">
                    <BarCode
                    format={"CODE128"}
                    displayValue={true}
                    fontSize={10}
                    width={1}
                    height={50}
                    margin={10}
                    textMargin={2}
                    value={`${item.model} - ${item.price}`} />
                    </div>
                </Card.Body>
                <Card.Footer>
                <Button className='btn-small w-full' onClick={() => downloadBarcode()}>
                    Print 
                </Button>
                </Card.Footer>
        </Card>
        </>
    )
}