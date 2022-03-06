import React from "react";
import BarCode from "react-barcode";
import { Card } from "react-bootstrap";

export const ItemBarCodeComponent = ({ item }) => {
    return(
        <>
            <Card className="mt-3">
                <Card.Header>
                    <Card.Title className="d-md-flex flex-md-row">
                        <span> BarCode </span>
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