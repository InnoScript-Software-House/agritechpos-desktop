/**
 * Developer                    - Aung Htet Paing
 * Start Date                   - 25 Dec 2021
 * Phone                        - 09421038123, 09758276201
 * Email                        - aunghtetpaing.info@gmail.com
**/

import React, { Component } from 'react';
import { Button, FormControl, InputGroup } from 'react-bootstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { trans } from '../../assets/i18n/mm.json';
import { HeaderComponent } from '../../components/header';
import { checkLicense } from '../../services/license.service';

class LoginPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            screen_loading: true,
            authData: null
        }
    }

    async componentDidMount() {
        const { getAuthData } = this.props;
        await checkLicense(this.props);

        this.setState({
            screen_loading: false,
            authData: getAuthData
        });
    }

    async login() {
        const { username, password } = this.state;
        const { history } = this.props;
        // const { authLoginAction } = this.props;

        if(username === '' || password === '') {
            return window.nativeApi.dialog.sendDialog('login-validation');
        }

        const requestBody = {
            username: this.username,
            password: this.password
        };

        // const loginStatus = await authLoginAction(requestBody);
        history.push('/dashboard');
    }

    render() {
        const { username, password, is_error, is_loading } = this.state;
        
        return (
            <>
                <HeaderComponent />
                <div className='container'>
                    <div className='row justify-content-center'>
                        <div className='col-4 align-self-center'>
                            <img className='login-logo' src='build/assets/images/logo.png' alt='kubota' />
                            <h3 className='login-title'>{trans.auth.login.title} </h3>

                            <InputGroup className='mb-3'>
                                <FormControl
                                    className='form-group-input'
                                    type="text"
                                    placeholder={trans.auth.login.input_username}
                                    value={username}
                                    onChange={e => this.setState({ username: e.target.value})}
                                />
                            </InputGroup>

                            <InputGroup>
                                <FormControl
                                    className='form-group-input'
                                    type="password"
                                    placeholder={trans.auth.login.input_password}
                                    value={password}
                                    onChange={e => this.setState({ password: e.target.value})}
                                />
                            </InputGroup>

                            <Button
                                onClick={() => this.login()}
                            > 
                                {trans.auth.login.btn_login}  
                            </Button>

                            <div className='forget-password-wrapper'>
                                <label> {trans.auth.login.btn_reset} </label>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    getAuthData: state.authReducer
});
  
const mapDispatchToProps = (dispatch) => ({
    authLoginAction: (credential) => dispatch(loginAction(credential))
});
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginPage);
