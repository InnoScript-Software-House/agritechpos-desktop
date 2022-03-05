import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Language } from '../../components/general/Language';
import { t, zawgyi } from '../../utilities/translation.utility';
import { Button, FormControl, InputGroup } from 'react-bootstrap';
import { createFirstDevice } from '../../services/device.service';
import { AppToast } from '../../components/general/toasts';
import { ToastContainer } from "react-bootstrap";
import { setOpenToastAction } from '../../redux/actions/toast.action';
import { checkNetworkConnection } from '../../utilities/networkConnection';
import axios from 'axios';
import { SET_NETWORK_ADDRESS, SET_NETWORK_MAC } from '../../redux/actionTypes';

import '../../assets/css/first-device.css';

class FirstDevice extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      ip: '',
      mac: '',
      note: '',
    }
  }

  loadingData() {
    const device = checkNetworkConnection();

    if(device.wifi) {
      this.setState({
        ip: device.wifi.address,
        mac: device.wifi.mac
      }, () => {
        localStorage.setItem(SET_NETWORK_ADDRESS, device.wifi.address);
        localStorage.setItem(SET_NETWORK_MAC, device.wifi.mac);
      });
      return;
    }

    if(device.localhost) {
      this.setState({
        ip: device.localhost.address,
        mac: device.localhost.mac
      }, () => {
        localStorage.setItem(SET_NETWORK_ADDRESS, device.localhost.address);
        localStorage.setItem(SET_NETWORK_MAC, device.localhost.mac);
      });
    }

    return;
  }

  componentDidMount() {
    this.loadingData();
  }

  async create() {
    const { name, ip, mac, note } = this.state;
    const { history } = this.props;

    if(name === '' || ip === '' || mac === '') {
      this.props.openToast('Device Information',t('first-device-empty'),'danger');
      return;
    }

    const requestBody = {
      name: name,
      ip: ip,
      mac: mac,
      note: note !== '' ? note : null
    }

    const response = await createFirstDevice(requestBody);
    
    if(response.success === false) {
      this.props.openToast('Device Information', response.message, 'danger');
      return;
    }

    axios.defaults.headers.common['ip'] = ip;
    axios.defaults.headers.common['mac'] = mac;
    history.push('/');
  }

  render() {
    const { lang } = this.props.reducer;
    const { name, ip, mac, note } = this.state;
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
          <div className='col-md-12'>
            <div className='d-md-flex flex-md-row justify-content-end'>
              <Language props={this.props} />
            </div>
          </div>
        </div>

        <div className='row'>
          <div className='col-md-4'>
            <img src="build/assets/images/side_image.jpeg" className='img-fluid' />
          </div>

          <div className='col-md-8'>
            <h3 className={`title m-3 ${zawgyi(lang)}`}> {t('first-device-title')} </h3>
            <p className={`m-3 ${zawgyi(lang)}`}> {t('first-device-description')} </p>

            <InputGroup className='p-3'>
            <FormControl
              className={`me-3 ${zawgyi(lang)}`}
              type="text"
              placeholder={t('first-device-name')}
              value={name}
              onChange={(e) => this.setState({
                name: e.target.value
              })}
            />

            <FormControl
              className={`me-3 ${zawgyi(lang)}`}
              type="text"
              placeholder={t('first-device-ip')}
              value={ip}
              onChange={(e) => this.setState({
                ip: e.target.value
              })}
            />

            <FormControl
              className={`me-3 ${zawgyi(lang)}`}
              type="text"
              placeholder={t('first-device-mac')}
              value={mac}
              onChange={(e) => this.setState({
                mac: e.target.value
              })}
            />

            <FormControl
              className={`me-3 ${zawgyi(lang)}`}
              type="text"
              placeholder={t('first-device-note')}
              value={note}
              onChange={(e) => this.setState({
                ip: e.target.value
              })}
            />

            <Button onClick={() => this.create()}> {t('btn-frist-device-create')} </Button>
            </InputGroup>
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
    setLang: (value) => dispatch(setLangAction(value)),
    openToast: (title, message, method) => dispatch(setOpenToastAction(title, message, method))
});
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(FirstDevice));