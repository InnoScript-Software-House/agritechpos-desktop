import React, { Component } from 'react';
import { Button, FormControl, InputGroup } from 'react-bootstrap';
import { HeaderComponent } from '../components/header';
import { trans } from '../assets/i18n/mm.json';
import '../assets/css/register.css';



export default class RegisterPage extends Component {

    constructor(props) {
        super(props);
    }
    register() {
        console.log(this.props);
        const { history } = this.props;
        history.goBack();
    }

    render() {
        return (
            <>
                <HeaderComponent />
                <div className='container'>
                    <div className='row justify-content-center'>
                        <div className='col-4 align-self-center'>
                            <h3 className='register-title'> { trans.app.register_title } </h3>

                            <InputGroup>
                                <FormControl
                                    className='form-group-input mt-3' 
                                    type='text'
                                    placeholder={trans.register.user_name}
                                />
                            </InputGroup>

                            <InputGroup>
                                <FormControl
                                    className='form-group-input' 
                                    type='text'
                                    placeholder={trans.register.user_phone}
                                />
                            </InputGroup>

                            <InputGroup>
                                <FormControl
                                    className='form-group-input' 
                                    type='email'
                                    placeholder={trans.register.user_email}
                                />
                            </InputGroup>

                            <InputGroup>
                                <FormControl
                                    className='form-group-input' 
                                    type='text'
                                    placeholder={trans.register.user_address}
                                />
                            </InputGroup>

                            <InputGroup>
                                <FormControl
                                    className='form-group-input' 
                                    type='text'
                                    placeholder={trans.register.shop_name}
                                />
                            </InputGroup>

                            <Button
                                className='btn-register'
                                onClick={() => this.register()}
                            > 
                            {trans.register.ok}
                            </Button>
                        </div>
                    </div>
                </div>
            </>

        )
    }
}