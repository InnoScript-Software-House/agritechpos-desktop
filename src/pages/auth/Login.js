import React, { Component } from 'react';
import { Button, FormControl, InputGroup } from 'react-bootstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Language } from '../../components/general/Language';
import { t, zawgyi } from '../../utilities/translation.utility';
import { login } from '../../services/auth.service';
import { setTokenAction } from '../../redux/actions/auth.action';
import { setAccountAction } from '../../redux/actions/account.action';
import { setOpenToastAction } from '../../redux/actions/toast.action';
import { AppToast } from '../../components/general/toasts';
import { ToastContainer } from 'react-bootstrap';

import '../../assets/css/login.css';

class LoginPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            is_loading: false,
            err_message: null
        }
    }

    componentDidMount() {
    }

    async login() {
        const { username, password } = this.state;
        const { history } = this.props;

        if(username === '' || password === '') {
            return this.props.openToast('Login', t('login-required'), 'danger');
            // this.setState({
            //     err_message: t('login-required')
            // });
        }

        const requestBody = {
            name: username,
            password: password
        };

        this.setState({
            is_loading: true
        });

        const response = await login(requestBody);
        console.log(response);

        if(response.success === false) {
            return this.props.openToast('Login', response.message, 'danger');
            // this.setState({
            //     err_message: response.message,
            //     is_loading: false
            // });
        }

       await this.props.setToken(response.access_token);
       await this.props.setAccount(response.account);
    
       history.push('/dashboard');
       
    }

    render() {
        const { username, password, is_loading, err_message } = this.state;
        const { lang } = this.props.reducer;
        
        return (
            <>
                <ToastContainer
                className= 'app-toast-container'
                position={'top-end'}
                >
                    <AppToast props={this.props} />
                </ToastContainer>
                <div className='d-flex flex-row justify-content-end'>
                    <Language props={this.props} />
                </div>

                <div className='d-flex flex-column'>
                    <img className='login-logo align-self-center' src='build/assets/images/logo.png' alt='kubota' />

                    <div className='col-3 align-self-center'>
                        <h3 className={`login-title mt-3 ${zawgyi(lang)}`}> {t('login-title')} </h3>
                        <InputGroup className='mt-3'>
                            <FormControl
                                className={`${zawgyi(lang)}`}
                                type="text"
                                placeholder={t('login-input-username')}
                                value={username}
                                onChange={e => this.setState({ username: e.target.value})}
                            />
                        </InputGroup>

                        <InputGroup className='mt-3'>
                            <FormControl
                                className={`${zawgyi(lang)}`}
                                type="password"
                                placeholder={t('login-input-password')}
                                value={password}
                                onChange={e => this.setState({ password: e.target.value})}
                            />
                        </InputGroup>

                        <Button
                            className={`mt-3 ${zawgyi(lang)}`}
                            disabled={is_loading}
                            onClick={() => this.login()}
                        > 
                            {t('login-btn-enter')}  
                        </Button>

                        <p className={`login-error mt-3 ${zawgyi(lang)}`}> {err_message} </p>
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
    setToken: (accessToken) => dispatch(setTokenAction(accessToken)),
    setAccount: (account) => dispatch(setAccountAction(account)),
    openToast: (title, message, theme) => dispatch(setOpenToastAction(title, message, theme)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(LoginPage));