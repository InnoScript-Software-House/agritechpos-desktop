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
import { defineMacAndIP } from '../services/utility.service';
import { setOpenToastAction } from '../redux/actions/toast.action';

class LandingPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            is_loading: true
        }
    }

    checkConfig() {
        const { history } = this.props;
        const { config } = this.props.reducer;

        if(config.device_type === null) {
            history.push('/configuration');
            return;
        }
    }

    async checkLicenseData () {
        const { history } = this.props;
        const { setToast } = this.props.reducer;

        const response = await checkLicense();

        if(response && response.success === false) {
            setToast('License Error', 'Invalid License', 'danger');
            return null;
        }

        if(response && response.length === 0) {
            history.push('/license');
            return;
        }

        return;
    }

    componentDidMount() {
        const isConfig = this.checkConfig();
        //this.checkLicenseData();
    }

    // async componentDidMount() {
    //     this.loadingData();

    //     const { history } = this.props;
    //     const response = await checkLicense(this.props);

    //     if (response === null) {
    //         history.push('/error/0');
    //         return;
    //     }

    //     if (response && response.message === 'licnese is expired') {
    //         history.push('/error/expired');
    //         return;
    //     }

    //     if (response && response.message === 'unknown error') {
    //         history.push('/error/unknown');
    //         return;
    //     }

    //     if (response && response.length === 0) {
    //         history.push('/license');
    //         return;
    //     }

    //     if (response && response.length > 0) {
    //         localStorage.setItem(LICENSE, response[0].token);
    //         axios.defaults.headers.common["license"] = response[0].token;
    //     }

    //     const firstDevice = await getFirstDevice();

    //     if (firstDevice.length === 0) {
    //         history.push('/device/first');
    //         return;
    //     }

    //     const { device } = window.nativeApi;
    //     device.get((result) => {
    //         const networkInterfaces = result.networkInterfaces();
    //         const getMacAndIp = defineMacAndIP(networkInterfaces);
    //         axios.defaults.headers.common['ip'] = getMacAndIp.address;
    //         axios.defaults.headers.common['mac'] = getMacAndIp.mac;
    //         localStorage.setItem(DEVICE_VALUE, JSON.stringify(getMacAndIp));
    //     });

    //     const firstUser = await checkFirstUser();

    //     if (firstUser && firstUser.status === 404) {
    //         history.push('/user/first');
    //         return;
    //     } else {
    //         history.push('/login');
    //         return;
    //     }
    // }

    render() {
        const { is_loading } = this.state;
        const { config } = this.props.reducer;

        console.log(config);
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
    setLang: (value) => dispatch(setLangAction(value)),
    setToast: (title, message, status) => dispatch(setOpenToastAction(title, message, status))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(LandingPage));
