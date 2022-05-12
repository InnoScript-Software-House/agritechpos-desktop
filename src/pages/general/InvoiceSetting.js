import React from 'react'
import {Card, FormControl, FormLabel, InputGroup} from 'react-bootstrap';
import { t, zawgyi } from "../../utilities/translation.utility";

const InvoiceSetting = () => {
  return (
    <>
        <Card>
           <Card.Header>
                <Card.Title> {t('invoice-setting')} </Card.Title>   
            </Card.Header> 

            <Card.Body>
                <div className='row'>
                    <div className='col-md-3 mb-3'>
                        <FormLabel className='w-100'> {t('invoice-prefix-name')} </FormLabel>

                        <InputGroup>
                            <FormControl
                            />
                        </InputGroup>
                    </div>
                </div>
            </Card.Body>
        </Card>
    </>
  )
}

export default InvoiceSetting