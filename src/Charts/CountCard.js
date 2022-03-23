import React from 'react'
import { Button, Card } from 'react-bootstrap'
import { FaArrowCircleRight } from "react-icons/fa";

export const CountCard = ({ props, count, label, url, urlLabel }) => {
    const { history } = props;

    return (
        <Card>
            <Card.Body className='countcardbody'>
                <div className='d-md-flex flex-md-row justify-content-start align-items-start'>
                    <div className='col-md mb-1'>
                        <h1 className='mb-1 text-white'> {count} </h1>
                        <span className='mb-1 text-white'> {label} </span>
                    </div>
                </div>
            </Card.Body>

            <Card.Footer className='countcardfooter'>
                <div className='d-md-flex flex-md-row justify-content-center align-items-center'>
                    <Button onClick={() => history.push(url)} className='countcardbtn'>
                        <span className='me-1 text-white'> { urlLabel } </span>
                        <FaArrowCircleRight size={20}
                            color={'white'} />
                    </Button>
                </div>
            </Card.Footer>
        </Card>
    )
}
