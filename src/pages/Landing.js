import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { Spinner } from 'react-bootstrap';
import { connect } from 'react-redux';
import { setLangAction } from '../redux/actions/lang.action';
import { DEVICE_VALUE, LICENSE } from '../redux/actionTypes';
import { checkLicense } from '../services/license.service.js';
import { checkFirstUser } from '../services/user.service';
import axios from 'axios';

import '../assets/css/landing/index.css';
import { getFirstDevice } from '../services/device.service';

class LandingPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            is_loading: true
        }
    }

    async componentDidMount() {
        const { history } = this.props;
        const response = await checkLicense(this.props);

        if(response === null) {
            history.push('/error/0');
            return;
        }

        if(response && response.message === 'licnese is expired') {
            history.push('/error/expired');
            return;
        }

        if(response && response.message === 'unknown error') {
            history.push('/error/unknown');
            return;
        }

        if(response && response.length === 0) {
            history.push('/license');
            return;
        }

        if(response && response.length > 0) {
            localStorage.setItem(LICENSE, response[0].token);
            axios.defaults.headers.common["license"] = response[0].token;
        }

        const firstDevice = await getFirstDevice();

        if(firstDevice.length === 0) {
            history.push('/device/first');
            return;
        }

        const { device } = window.nativeApi;
        
        device.get((result) => {
            const networkInterfaces = result.networkInterfaces();

            if(networkInterfaces.wlp2s0) {
                axios.defaults.headers.common['ip'] = networkInterfaces.wlp2s0[0].address;
                axios.defaults.headers.common['mac'] = networkInterfaces.wlp2s0[0].mac;
                localStorage.setItem(DEVICE_VALUE, JSON.stringify(networkInterfaces.wlp2s0[0]));
            }
        });

        const firstUser = await checkFirstUser();

        if(firstUser && firstUser.success === false) {
            history.push('/error/device')
        }

        if(firstUser && firstUser.status === 404) {
            history.push('/user/first');
            return;
        } else {
            history.push('/login');
            return;
        }
    }

    render() {
        const { is_loading } = this.state;

        return (
            <>
                {is_loading && (
                    <div className='d-flex flex-column full-height justify-content-center align-items-center'>
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden"> Loading... </span>
                        </Spinner>
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
    setLang: (value) => dispatch(setLangAction(value))
});
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(LandingPage));
