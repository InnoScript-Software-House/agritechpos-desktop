import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button, FormControl, InputGroup } from 'react-bootstrap';
import { Language } from '../../components/general/Language';
import { t, zawgyi } from '../../utilities/translation.utility';
import { createAccount } from '../../services/user.service';
import { ToastContainer } from "react-bootstrap";
import { setOpenToastAction } from '../../redux/actions/toast.action';
import { AppToast } from '../../components/general/toasts'

import '../../assets/css/first-user-register.css';

var pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const checkphone = /^(\+?(95)|[09])\d{10}/g;


class FirstUserRegisterPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            is_loading: false,
            account_name: '',
            email: '',
            phone: '',
            password: '',
            confirm_password: '',
            err_message: null
        }
    }

    componentDidMount() { }

    async createAccount() {
        const { account_name, phone, email, password, confirm_password } = this.state;
        const { history } = this.props;

        if(account_name === '' || phone === '' || email === '' || password === '' || confirm_password === '') {
            return this.props.openToast('First User Account', t('first-user-error-message'), 'danger');
            // this.setState({
            //     err_message: t('first-user-error-message')
            // });
        }

        if(password !== confirm_password) {
            return this.props.openToast('First User Account', t('first-user-error-confirm-password'), 'danger');
            // this.setState({
            //     err_message: t('first-user-error-confirm-password')
            // });
        }

        if(!pattern.test(email)){
            return this.props.openToast('First User Account', t('invalid-email-error'), 'danger');
            // this.setState({
            //     err_message: t('invalid-email-error')
            // });
        }

        if(!checkphone.test(phone)){
            return this.props.openToast('First User Account', 'Invalid phone number', 'danger');
            // this.setState({
            //     err_message: ('Invalid phone number')
            // })
        }

        const resquestBody = {
            name : account_name,
            email: email,
            phone: phone,
            password: password
        }

        this.setState({
            is_loading: true
        });

        const response = await createAccount(resquestBody);

        if(response.success === false) {
            this.props.openToast('First User Account', response.message, 'danger');
            return this.setState({
                // err_message: response.message,
                is_loading: false
            });
        }

        return this.setState({
            is_loading: false,
            err_message: null
        }, () => {
            history.push('/');
        });

    }

    render() {
        const { is_loading, account_name, phone, email, password, confirm_password, err_message } = this.state;
        const { lang } = this.props.reducer; 

        return (
            <>
            <ToastContainer
            className="app-toast-container"
            position={'top-end'}
            >
                <AppToast props={this.props} />
            </ToastContainer>
                <div className='d-md-flex flex-row justify-content-end'>
                    <Language props={this.props} />
                </div>

                <div className='d-md-flex flex-row justify-content-between'>
                    <div className='col-md-5 d-flex flex-column justify-content-center'>
                        <img src="build/assets/images/side_image.jpeg" className='cover-image align-self-center mt-3' />
                    </div>

                    <div className='col-md-7 d-md-flex flex-column justify-content-start'>
                        <h3 className={`title m-3 ${zawgyi(lang)}`}> {t('first-user-title')} </h3>
                        <p className={`m-3 ${zawgyi(lang)}`}> {t('first-user-description')} </p>

                        <InputGroup className="p-3">
                            <FormControl
                                className={`me-3 ${zawgyi(lang)}`}
                                type="text"
                                required={true}
                                placeholder={t('first-user-name')}
                                value={account_name}
                                onChange={(e) => this.setState({
                                    account_name: e.target.value
                                })}
                            />

                            <FormControl
                                className={`me-3 ${zawgyi(lang)}`}
                                type="text"
                                required={true}
                                placeholder={t('first-user-phone')}
                                value={phone}
                                onChange={(e) => this.setState({
                                    phone: e.target.value
                                })}
                            />

                            <FormControl
                                className={`me-3 ${zawgyi(lang)}`}
                                type="text"
                                required={true}
                                placeholder={t('first-user-email')}
                                value={email}
                                onChange={(e) => this.setState({
                                    email: e.target.value
                                })}
                            />
                        </InputGroup>

                        <InputGroup className="p-3">
                            <FormControl
                                className={`me-3 ${zawgyi(lang)}`}
                                type="password"
                                required={true}
                                placeholder={t('first-user-password')}
                                value={password}
                                onChange={(e) => this.setState({
                                    password: e.target.value
                                })}
                            />

                            <FormControl
                                className={`me-3 ${zawgyi(lang)}`}
                                type="password"
                                required={true}
                                placeholder={t('first-user-reenter-password')}
                                value={confirm_password}
                                onChange={(e) => this.setState({
                                    confirm_password: e.target.value
                                })}
                            />
                        </InputGroup>
                        
                        <InputGroup className='p-3'>
                            <Button
                                className={`${zawgyi(lang)}`}
                                disabled={is_loading}
                                onClick={() => this.createAccount()}
                            > 
                                {t('first-user-btn-create')}
                            </Button>
                        </InputGroup>

                        {/* <p className={`ps-3 error-message ${zawgyi(lang)}`}> {err_message} </p> */}
                    </div>
                </div>
            </>
        )
    }
}


const mapStateToProps = (state) => ({
    reducer: state
  });
  
  const mapDispatchToProps = (dispatch) => ({
    openToast: (title, message, theme) => dispatch(setOpenToastAction(title, message, theme))
  });
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(withRouter(FirstUserRegisterPage));