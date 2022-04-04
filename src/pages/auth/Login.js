import React, { Component } from 'react';
import { Button, FormControl, InputGroup } from 'react-bootstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { login } from '../../services/auth.service';
import { setTokenAction } from '../../redux/actions/auth.action';
import { setAccountAction } from '../../redux/actions/account.action';
import { setOpenToastAction } from '../../redux/actions/toast.action';
import { AppToast } from '../../components/general/toasts';
import { ToastContainer } from 'react-bootstrap';
import {t} from 'i18next';

import '../../assets/css/login.css';
import { BsFacebook, BsGoogle, BsInstagram, BsLinkedin, BsYoutube } from 'react-icons/bs';

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

    quitDevice(){
        const  quit = window.nativeApi.quit;
        quit.quitApp();
    }

    componentDidMount() {
    }

    async login() {
        const { username, password } = this.state;
        const { history } = this.props;

        if(username === '' || password === '') {
            return this.props.openToast('Login', 'Username and password is required', 'danger');
        }

        const requestBody = {
            name: username,
            password: password
        };

        this.setState({
            is_loading: true
        })

        const response = await login(requestBody);
        if(response.success === false) {
            this.props.openToast('Login', response.message, 'danger');
            this.setState({
                is_loading: false,
            });
            return;
        }

       await this.props.setToken(response.access_token);
       await this.props.setAccount(response.account);
       
       history.push('/sale');
    }

    render() {
        const { username, password, is_loading } = this.state;
        
        return (
            <div className='container-fluid g-0'>
                <div className='row g-0'>
                    <div className='col-md-12'>
                        <ToastContainer
                            className='app-toast-container'
                            position='top-end'
                        >
                            <AppToast props={this.props} />
                        </ToastContainer>
                    </div>
                </div>

                <div className='row g-0'>
                    <div className='col-md-6 login-left-side'>
                        <div className='d-md-flex flex-md-column justify-content-center align-items-center login-opacity'>
                            <div className='login-card'>
                                <h3> Agricultural Equipment POS Software </h3>
                                <p> 
                                    AgriTech is desktop pos software for agriculture machinery equipment businesses.
                                    We are focusing on IoT products for agriculture sector.
                                </p>

                                <Button className='btn btn-learn-more'> Learn More </Button>
                            </div>
                        </div>
                    </div>

                    <div className='col-md-6'>
                        <div className='login-layout-flex-center'>
                            <img className="logo" src="build/assets/images/logo.png" />

                            <div className='col-md-4'>
                                <h3 className="title mt-3"> {t('login-account')} </h3>

                                <InputGroup className='mt-3'>
                                    <FormControl
                                        type="text"
                                        placeholder={t('username')}
                                        value={username}
                                        onChange={e => this.setState({ username: e.target.value})}
                                        autoFocus={true}
                                    />
                                </InputGroup>

                                <InputGroup className='mt-3'>
                                    <FormControl
                                        type="password"
                                        placeholder={t('password')}
                                        value={password}
                                        onChange={e => this.setState({ password: e.target.value})}
                                        onKeyPress={e => e.code === 'Enter' ? this.login() : null}
                                    />
                                </InputGroup>

                                <InputGroup className='mt-3'>
                                    <Button disabled={is_loading} onClick={() => this.login()} className="btn btn-small"> {t('login-btn-enter')} </Button>
                                    <Button onClick={() => this.quitDevice()} className="btn btn-small"> {t('quit-btn-enter')} </Button>
                                </InputGroup>
                            </div>

                            <label className='login-separte-text'> Connect with </label>

                            <div className='social-media-wrapper'>
                                <BsInstagram className="me-3 rounded-circle" size={40} color="#01a3a6" cursor={'pointer'} />
                                <BsFacebook className="me-3" size={40} color="#01a3a6" cursor={'pointer'} />
                                <BsYoutube className='me-3 rounded-circle' size={40} color="#01a3a6"cursor={'pointer'} />
                                <BsGoogle className='me-3 rounded-circle' size={40} color="#01a3a6" cursor={'pointer'} />
                                <BsLinkedin className='me-3 rounded-circle' size={40} color="#01a3a6" cursor={'pointer'} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
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