import React from 'react'
import { Button, Card } from 'react-bootstrap'
import { FaArrowCircleRight } from "react-icons/fa";

export const CountCard = ({ props}) => {

    const { history } = props
    return (
        <>
            <div className='container-fluid mt-3 me-auto'>
                <div className='row'>
                    <div className='col-md-3'>
                        <Card>
                            <Card.Body className='countcardbody'>
                                <div className='d-md-flex flex-md-row justify-content-start align-items-start'>
                                    <div className='col-md mb-1'>
                                        <h3 className='mb-1 text-white'>150</h3>
                                        <span className='mb-1 text-white'>Total</span>
                                    </div>
                                </div>
                            </Card.Body>
                            <Card.Footer className='countcardfooter'>
                                <div className='d-md-flex flex-md-row justify-content-center align-items-center'>
                                    <Button onClick={() => history.push('/customer')} className='countcardbtn'>
                                        <span className='me-1 text-white'>View Customer Detail</span>
                                        <FaArrowCircleRight size={20}
                                            color={'white'} />
                                    </Button>
                                </div>
                            </Card.Footer>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    )
}
