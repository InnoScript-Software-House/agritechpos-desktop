import React, { useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

export const CreditDetailComponent = ({prpos, creditDetail}) => {

    const [detail, setDetail] = useState(null);
    const history = useHistory();

    const setRepayment = (id) => {
        localStorage.setItem('CREDIT', JSON.stringify(detail));
        history.push(`/repayment/:${id}`);
    }

    useEffect(() => {
        if(creditDetail){
            setDetail(creditDetail[0]);
        }
    },[creditDetail])


    console.log(detail)

  return (
    <Card>
        <Card.Header>
            <Card.Title>
                <div className='d-flex flex-row justify-content-between align-items-center'>
                    <span> Credit Detail </span>
                    <Button onClick={(e) => setRepayment(detail.id)}> Repayment </Button>
                </div>
            </Card.Title>
        </Card.Header>
        <Card.Body>
            <div>
                <div className='d-flex flex-row mt-1'>
                    <div className='col'>
                        <span> Credit ID : {detail && detail.id}</span>
                    </div>
                    <div className='col'>
                        <span> Invoice ID : {detail && detail.invoice_no}</span>
                    </div>
                </div>
                <div className='row mt-3'>
                    <span>Customer Name : {detail && detail.customer_name}</span>
                </div>
                <div className='row mt-3'>
                    <span>Credit Amount : {detail && detail.credit_amount}</span>
                </div>
                <div className='row mt-3'>
                    <span>Repayment : {detail && detail.repayment}</span>
                </div>
                <div className='row mt-3'>
                    <span>Amount Left : {detail && detail.amount_left}</span>
                </div>
            </div>
        </Card.Body>
    </Card>
  )
}
