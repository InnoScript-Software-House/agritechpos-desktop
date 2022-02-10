

import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Language } from '../../components/general/Language';

import '../../assets/css/first-device.css';
import { t, zawgyi } from '../../utilities/translation.utility';
import { Button, FormControl, InputGroup } from 'react-bootstrap';
import { createFirstDevice } from '../../services/device.service';

class FirstDevice extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      ip: '',
      mac: '',
      note: '',
      error: ''
    }
  }

  componentDidMount() {
    const { get } = window.nativeApi.device;
    get((device) => {
      console.log(device);
      const networkInterface = device.networkInterfaces();

      if(networkInterface.wlp2s0) {
        const info = networkInterface.wlp2s0[0];
        this.setState({
          ip: info.address,
          mac: info.mac,
          name: device.userInfo().username
        })
      }
    })
  }

  async create() {
    const { name, ip, mac, note } = this.state;
    const { history } = this.props;

    if(name === '' || ip === '' || mac === '') {
      this.setState({
        error: t('first-device-empty')
      });
    }

    const requestBody = {
      name: name,
      ip: ip,
      mac: mac,
      note: note !== '' ? note : null
    }

    const response = await createFirstDevice(requestBody);
    
    if(response.success === false) {
      this.setState({
        error: response.message
      });

      return;
    }

    this.setState({
      error: null
    });

    history.push('/');
  }

  render() {
    const { lang } = this.props.reducer;
    const { name, ip, mac, note, error } = this.state;
    return (
     <>
      <div className='d-md-flex flex-row justify-content-end'>
        <Language props={this.props} />
      </div>

      <div className='d-md-flex flex-row justify-content-between'>
        <div className='col-md-5 d-md-flex flex-column justify-content-center'>
          <img src="build/assets/images/side_image.jpeg" className='cover-image align-self-center mt-3' />
        </div>

        <div className='col-md-7 d-md-flex flex-column justify-content-start'>
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

          {error && (<span className='error-message ms-3'> {error}</span>)}
        </div>
      </div>
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
)(withRouter(FirstDevice));