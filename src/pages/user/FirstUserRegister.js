import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button, FormControl, InputGroup } from 'react-bootstrap';
import { Language } from '../../components/general/Language';
import { t, zawgyi } from '../../utilities/translation.utility';
import { createAccount } from '../../services/user.service';

import '../../assets/css/first-user-register.css';

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
            return this.setState({
                err_message: t('first-user-error-message')
            });
        }

        if(password !== confirm_password) {
            return this.setState({
                err_message: t('first-user-error-confirm-password')
            });
        }

        if(!Number(phone)) {
            return this.setState({
                err_message: t('first-user-error-invalid-phone')
            });
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
            return this.setState({
                err_message: response.message,
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

                        <p className={`ps-3 error-message ${zawgyi(lang)}`}> {err_message} </p>
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
  });
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(withRouter(FirstUserRegisterPage));