import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button, FormControl, InputGroup } from 'react-bootstrap';
import { createAccount } from '../../services/user.service';
import { ToastContainer } from "react-bootstrap";
import { setOpenToastAction } from '../../redux/actions/toast.action';
import { AppToast } from '../../components/general/toasts'

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
            return this.props.openToast('User Account', 'All fields are required', 'danger');
        }

        if(password !== confirm_password) {
            return this.props.openToast('User Account', 'Password does not match', 'danger');
        }

        if(!pattern.test(email)){
            return this.props.openToast('User Account', 'Invalid email address', 'danger');
        }

        if(!checkphone.test(phone)){
            return this.props.openToast('User Account', 'Invalid phone number', 'danger');
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
            this.props.openToast('User Account', response.message, 'danger');
            return this.setState({
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
        const { is_loading, account_name, phone, email, password, confirm_password } = this.state;

        return (
            <div className='container-fluid'>
                <div className='row'>
                    <ToastContainer
                        className="app-toast-container"
                        position={'top-end'}
                    >
                        <AppToast props={this.props} />
                    </ToastContainer>
                </div>

                <div className='row'>
                    <div className='col-md-4 mt-3'>
                        <img src="build/assets/images/side_image.jpeg" className='img-fluid' />
                    </div>

                    <div className='col-md-8'>
                        <h3 className="title m-3"> Create User Account </h3>
                        <p className="m-3"> create user account for first times user. This account can login into software. </p>

                        <div className='d-md-flex flex-md-row justify-content-between'>
                            <div className='col-md-12 d-flex flex-column justify-content-center'>
                                <InputGroup className="p-3">
                                    <FormControl
                                        className="me-3"
                                        type="text"
                                        required={true}
                                        placeholder="Account Name"
                                        value={account_name}
                                        onChange={(e) => this.setState({
                                            account_name: e.target.value
                                        })}
                                    />

                                    <FormControl
                                        className="me-3"
                                        type="text"
                                        required={true}
                                        placeholder="Phone"
                                        value={phone}
                                        onChange={(e) => this.setState({
                                            phone: e.target.value
                                        })}
                                    />

                                    <FormControl
                                        className="me-3"
                                        type="text"
                                        required={true}
                                        placeholder="Email"
                                        value={email}
                                        onChange={(e) => this.setState({
                                            email: e.target.value
                                        })}
                                    />
                                </InputGroup>

                                <InputGroup className="p-3">
                                    <FormControl
                                        className="me-3"
                                        type="password"
                                        required={true}
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => this.setState({
                                            password: e.target.value
                                        })}
                                    />

                                    <FormControl
                                        className="me-3"
                                        type="password"
                                        required={true}
                                        placeholder="Confirm password"
                                        value={confirm_password}
                                        onChange={(e) => this.setState({
                                            confirm_password: e.target.value
                                        })}
                                    />
                                </InputGroup>
                                
                                <InputGroup className='p-3'>
                                    <Button disabled={is_loading} onClick={() => this.createAccount()}> Create Account </Button>
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
    openToast: (title, message, theme) => dispatch(setOpenToastAction(title, message, theme))
  });
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(withRouter(FirstUserRegisterPage));