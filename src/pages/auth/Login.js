
import React, { Component } from 'react';
import translate from '../../assets/i18n/mm.json';

export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            is_error: false
        }
    }

    componentDidMount() {
    }

    login() {
        const { username, password, is_error } = this.state;

        if(username === '' || password === '') {
            this.setState({ is_error: true })
            return electron.dialogApi.sendDialog({
                title: 'Login Fail', 
                message: 'Invalid username and password',
                type: 'warning',
                defaultId: 0,
                buttons: ['OK']
            })
        }
    }

    render() {
        const { username, password, is_error } = this.state;
        
        return (
            <div className='wrapper'>
                <div className='content-header'>
                    <img className='login-logo' src={`file://assets/images/logo.png`} alt='kubota' />
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
                            className={`btn btn-default ${is_error ? 'btn-is-error' : null }`}
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
