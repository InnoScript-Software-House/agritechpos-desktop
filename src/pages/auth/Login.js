/**
 * Developer                    - Aung Htet Paing
 * Start Date                   - 25 Dec 2021
 * Phone                        - 09421038123, 09758276201
 * Email                        - aunghtetpaing.info@gmail.com
**/

import React, { Component } from 'react';
import { connect } from 'react-redux';
import translate from '../../assets/i18n/mm.json';
import { loginAction } from '../../redux/actions/auth.action';
import { showWarningDialog } from '../../services/nativeDialog.service';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            screen_loading: true,
            authData: null
        }
    }

    componentDidMount() {
        const { getAuthData } = this.props;
        this.setState({
            screen_loading: false,
            authData: getAuthData
        })
    }

    async login() {
        const { username, password } = this.state;
        const { authLoginAction } = this.props;

        if(username === '' || password === '') {
            return showWarningDialog(translate.auth.login.credential_err_title, translate.auth.login.credential_err)
        }

        const requestBody = {
            username: this.username,
            password: this.password
        };

        const loginStatus = await authLoginAction(requestBody);
        
        return loginStatus;
    }

    render() {
        const { username, password, is_error, is_loading } = this.state;
        
        return (
            <div className='wrapper'>
                <div className='content-header'>
                    {/* <img className='login-logo' src={`file://assets/images/logo.png`} alt='kubota' /> */}
                    <h3 className='login-title'> 
                        {translate.auth.login.title} 
                    </h3>
                </div>

                <div className='content-body'>
                    <div className='form-group'>
                        <input 
                            className='form-control' 
                            type={`text`}
                            placeholder={translate.auth.login.input_username}
                            value={username}
                            onChange={e => this.setState({ username: e.target.value})}
                        />
                    </div>

                    <div className='form-group rm-margin'>
                        <input 
                            className='form-control' 
                            type={`password`}
                            placeholder={translate.auth.login.input_password}
                            value={password}
                            onChange={e => this.setState({ password: e.target.value})}
                        />
                    </div>

                    <div className='form-group rm-margin'>
                        <button 
                            className={`btn btn-default ${is_error ? 'btn-is-error' : is_loading ? 'btn-is-error' : null }`}
                            onClick={() => this.login()}
                            disabled={is_error}
                        > {translate.auth.login.btn_login} 
                        </button>
                    </div>

                    <div className='reset-password-wrapper'>
                        <span> {translate.auth.login.btn_reset} </span> 
                    </div>
                </div>
            </div>
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
)(Login);
