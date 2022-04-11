import React, { Component } from 'react';
import { Button, FormControl, InputGroup } from 'react-bootstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { login } from '../../services/auth.service';
import { setTokenAction } from '../../redux/actions/auth.action';
import { setAccountAction } from '../../redux/actions/account.action';
import { setOpenToastAction } from '../../redux/actions/toast.action';
import { AppToast } from '../../components/general/toasts';
import { t } from 'i18next';
import { BsFacebook, BsGoogle, BsInstagram, BsLinkedin, BsYoutube } from 'react-icons/bs';
import { SideSection } from '../../components/general/sideSection';

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
                        <AppToast props={this.props} />
                    </div>
                </div>

                <div className='row g-0'>
                    <div className='col-md-6 background-image-layout'>
                        <SideSection />
                    </div>

                    <div className='col-md-6'>
                        <div className='flex-col-center-layout'>
                            <img className="logo" src="build/assets/images/logo.png" />

                            <div className='col-md-4'>
                                <h3 className="title-default mt-3"> {t('login-account')} </h3>

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
                                    <Button disabled={is_loading} onClick={() => this.login()} className="btn-primary me-3"> {t('login-btn-enter')} </Button>
                                    <Button onClick={() => this.quitDevice()} className="btn-primary"> {t('quit-btn-enter')} </Button>
                                </InputGroup>
                            </div>

                            <label className='login-separte-text'> Connect with </label>

                            <div className='social-media-wrapper'>
                                <BsInstagram className="me-3" size={40} color="#2759D4" cursor={'pointer'} />
                                <BsFacebook className="me-3" size={40} color="#2759D4" cursor={'pointer'} />
                                <BsYoutube className='me-3' size={40} color="#2759D4"cursor={'pointer'} />
                                <BsGoogle className='me-3' size={40} color="#2759D4" cursor={'pointer'} />
                                <BsLinkedin className='me-3' size={40} color="#2759D4" cursor={'pointer'} />
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