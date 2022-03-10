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
       
       history.push('/dashboard');
    }

    render() {
        const { username, password, is_loading } = this.state;
        
        return (
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-md-12'>
                        <ToastContainer
                            className='app-toast-container'
                            position='top-end'
                        >
                            <AppToast props={this.props} />
                        </ToastContainer>
                    </div>
                </div>

                <div className='row mt-3'>
                    <div className='col-md-4'>
                        <img src="build/assets/images/side_image.jpeg" className='img-fluid' />
                    </div>

                <div className='col-md-8'>
                        <h3 className="title mb-3 pb-3"> Agricultural Equipment POS Software </h3>
                        <div className='row mt-3 pt-3'>
                            <div className='col-md-8'>
                                <h3 className="title mt-3"> Login Account </h3>

                                <InputGroup className='mt-3'>
                                    <FormControl
                                        type="text"
                                        placeholder="username"
                                        value={username}
                                        onChange={e => this.setState({ username: e.target.value})}
                                    />
                                </InputGroup>

                                <InputGroup className='mt-3'>
                                    <FormControl
                                        type="password"
                                        placeholder="password"
                                        value={password}
                                        onChange={e => this.setState({ password: e.target.value})}
                                    />
                                </InputGroup>

                                <InputGroup className='mt-3'>
                                    <Button disabled={is_loading} onClick={() => this.login()}> Login </Button>
                                    <Button onClick={() => this.quitDevice()} className="ms-3"> Quit </Button>
                                </InputGroup>
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