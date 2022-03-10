import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { Button, Card, Spinner } from 'react-bootstrap';
import { connect } from 'react-redux';
import { setLangAction } from '../redux/actions/lang.action';
import { LICENSE, SET_NETWORK_ADDRESS, SET_NETWORK_MAC } from '../redux/actionTypes';
import { checkLicense } from '../services/license.service.js';
import { checkFirstUser } from '../services/user.service';
import axios from 'axios';
import { getFirstDevice } from '../services/device.service';
import { setOpenToastAction } from '../redux/actions/toast.action';
import { t } from '../utilities/translation.utility';
import { checkNetworkConnection } from '../utilities/networkConnection';

import '../assets/css/landing/index.css';

class LandingPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            is_loading: true,
            is_message: null
        }
    }

    checkConfig() {
        const { history } = this.props;
        const { config } = this.props.reducer;

        if(config.api_url === null) {
            history.push('/configuration');
            return;
        }

        axios.defaults.baseURL = `http://${config.api_url}/api`;
        return true;
    }

    async checkLicenseData () {

        const { history } = this.props;
        const { setToast } = this.props.reducer;

        const response = await checkLicense();

        if(response && response.success === false) {
            setToast('License', response.message, 'danger');
            return null;
        }

        if (response === null) {
            history.push('/error/0');
            return;
        }

        if (response && response.message === 'licnese is expired') {
            history.push('/error/expired');
            return;
        }

        if (response && response.message === 'unknown error') {
            history.push('/error/unknown');
            return;
        }

        if(response && response.length === 0) {
            history.push('/license');
            return;
        }

        localStorage.setItem(LICENSE, response.token);
        axios.defaults.headers.common["license"] = response.token;

        const firstDevice = await getFirstDevice();

        if (firstDevice.length === 0) {
            history.push('/device/first');
            return;
        }

        localStorage.setItem(SET_NETWORK_ADDRESS, firstDevice.ip);
        localStorage.setItem(SET_NETWORK_MAC, firstDevice.mac);

        const checkNetwork = checkNetworkConnection();

        if(checkNetwork.wifi && checkNetwork.wifi.address !== firstDevice.ip) {
            this.setState({
                is_message: {
                    title: 'Network Error [Wifi]',
                    message: "Incorrect IP address. Please check your wifi connection to connect database",
                },
                is_loading: false
            });
            return;
        }

        if(!checkNetwork.wifi && checkNetwork.localhost && checkNetwork.localhost.address !== firstDevice.ip) {
            this.setState({
                is_message: {
                    title: 'Network Connection Error [Localhost]',
                    message: "Incorrect IP address. Please check your localhost network connection to connect database",
                },
                is_loading: false
            });
            return;
        }

        axios.defaults.headers.common["ip"] = firstDevice.ip;
        axios.defaults.headers.common['mac'] = firstDevice.mac;

        const firstUser = await checkFirstUser();

        if (firstUser && firstUser.status === 404) {
            history.push('/user/first');
            return;
        } else {
            history.push('/login');
            return;
        }
    }

    quitDevice() {
        const  quit = window.nativeApi.quit;
        quit.quitApp();
    }

    componentDidMount() {
        const isConfig = this.checkConfig();

        if(isConfig) {
            this.checkLicenseData();
        }

    }

    render() {
        const { is_loading, is_message } = this.state;

        return (
            <>
                {is_loading && (
                    <div className='d-flex flex-column full-height justify-content-center align-items-center'>
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden"> Loading... </span>
                        </Spinner>
                    </div>
                )}

                {is_message && (
                    <div className='container-fluid'>
                        <div className='container'>
                            <div className='col-md-12 mt-3'>
                                <Card>
                                    <Card.Header>
                                        <Card.Title> { is_message.title } </Card.Title>
                                    </Card.Header>

                                    <Card.Body>
                                        <p> { is_message.message } </p>
                                    </Card.Body>

                                    <Card.Footer>
                                        <Button onClick={() => this.quitDevice()}> Quit </Button>
                                    </Card.Footer>
                                </Card>
                            </div>
                        </div>
                    </div>
                )}
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    reducer: state
});

const mapDispatchToProps = (dispatch) => ({
    setLang: (value) => dispatch(setLangAction(value)),
    setToast: (title, message, status) => dispatch(setOpenToastAction(title, message, status))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(LandingPage));
