/**
 * Developer                    - Aung Htet Paing
 * Start Date                   - 25 Dec 2021
 * Phone                        - 09421038123, 09758276201
 * Email                        - aunghtetpaing.info@gmail.com
**/

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { trans } from '../../assets/i18n/mm.json';

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
            this.setState({ is_error: true })
            // return electron.dialogApi.sendDialog({
            //     title: 'Login Fail', 
            //     message: 'Invalid username and password',
            //     type: 'warning',
            //     defaultId: 0,
            //     buttons: ['OK']
            // })
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
                        {trans.auth.login.title} 
                    </h3>
                </div>

                <div className='content-body'>
                    <div className='form-group'>
                        <input 
                            className='form-control' 
                            type={`text`}
                            placeholder={trans.auth.login.input_username}
                            value={username}
                            onChange={e => this.setState({ username: e.target.value})}
                        />
                    </div>

                    <div className='form-group rm-margin'>
                        <input 
                            className='form-control' 
                            type={`password`}
                            placeholder={trans.auth.login.input_password}
                            value={password}
                            onChange={e => this.setState({ password: e.target.value})}
                        />
                    </div>

                    <div className='form-group rm-margin'>
                        <button 
                            className={`btn btn-default ${is_error ? 'btn-is-error' : is_loading ? 'btn-is-error' : null }`}
                            onClick={() => this.login()}
                            disabled={is_error}
                        > {trans.auth.login.btn_login} 
                        </button>
                    </div>

                    <div className='reset-password-wrapper'>
                        <span> {trans.auth.login.btn_reset} </span> 
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
)(LoginPage);
