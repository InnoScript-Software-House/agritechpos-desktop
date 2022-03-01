import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Navigation } from '../../components/general/Navigation';
import { getProfile } from '../../services/user.service';
import { t, zawgyi } from '../../utilities/translation.utility';
import { Button, Card, FormControl, InputGroup } from 'react-bootstrap';
import { setOpenToastAction } from '../../redux/actions/toast.action';

import '../../assets/css/profile.css';

const checkphone = /^(\+?(95)|[09])\d{10}/g;

var pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

class ProfilePage extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      user: null,
      is_loading: true,
      update_name: '',
      update_phone: '',
      update_email: '',
      current_password: '',
      new_password: '',
      confirm_password: '',
      error: null,
      password_error: null
    }
  }

  async componentDidMount() {
    const response = await getProfile();

    this.setState({
      user: response,
      update_name: response.name,
      update_email: response.email,
      update_phone: response.phone,
      is_loading: false
    });
  }

  async update() {
    const {update_email, update_name, update_phone} = this.state;

    if(update_email === '' || update_name === '' || update_phone === '') {
      return this.props.openToast('Profile Update', t('profile-update-empty-error'), 'danger');
      // this.setState({
      //   error: t('profile-update-empty-error')
      // })
    }

    if(!checkphone.test(update_phone)) {
      return this.props.openToast('Profile Update', t('profile-update-phone-error'), 'danger');
      // this.setState({
      //   error: t('profile-update-phone-error')
      // });
    }

    if(!pattern.test(update_email)){
      return this.props.openToast('Profile Update', t('invalid-email-error'), 'danger');
      // this.setState({
      //   error: t('invalid-email-error')
      // });
  }
  return this.props.openToast('Profile Update', t('profile-update-successful'), 'success')

    this.setState({
      is_loading: true
    });

    const response = await getProfile();

    this.setState({
      user: response,
      update_name: response.name,
      update_email: response.email,
      update_phone: response.phone,
      is_loading: false,
      error: null
    });
  }

  async changePassword() {
    const {current_password, new_password, confirm_password} = this.state;

    if(current_password === '' || new_password === '' || confirm_password === '') {
      return this.props.openToast('Change Password', t('profile-password-change-empty-error'), 'danger');
      // this.setState({
      //   password_error: t('profile-password-change-empty-error')
      // });
    }

    if(confirm_password !== new_password) {
      return this.props.openToast('Change Password', t('profile-password-not-match'), 'danger');
      // this.setState({
      //   password_error: t('profile-password-not-match')
      // });
    }
    this.props.openToast('Change Password', t('password-change-successfully'), 'success');

    this.setState({
      is_loading: true
    });

    //** Change API call process */

    this.setState({
      is_loading: false,
      password_error: null
    })
  }

  render() {
    const { user, is_loading, update_name, update_email, update_phone, error, current_password, new_password, confirm_password, password_error } = this.state;
    const { lang } = this.props.reducer;

    return (
      <>
        <Navigation props={this.props} />

        {user && (
          <div className='d-flex flex-row'>
            <div className='col-3'>
              <Card className='m-3'>
                <Card.Body>
                  <Card.Title className={`mb-3 ${zawgyi(lang)}`}> {t('profile-title')} </Card.Title>

                  <Card.Text className='d-flex flex-row justify-content-between'>
                    <label className={`${zawgyi(lang)}`}> {t('profile-name')} </label>
                    <label className={`${zawgyi(lang)}`}> {user.name} </label>
                  </Card.Text>

                  <Card.Text className='d-flex flex-row justify-content-between'>
                    <label className={`${zawgyi(lang)}`}> {t('profile-phone')} </label>
                    <label className={`${zawgyi(lang)}`}> {user.phone} </label>
                  </Card.Text>

                  <Card.Text className='d-flex flex-row justify-content-between'>
                    <label className={`${zawgyi(lang)}`}> {t('profile-email')} </label>
                    <label className={`${zawgyi(lang)}`}> {user.email} </label>
                  </Card.Text>

                  <Card.Text className='d-flex flex-row justify-content-between'>
                    <label className={`${zawgyi(lang)}`}> {t('profile-status')} </label>
                    <span className={`active-status ${user.active === true ? 'enable' : 'disable'}`}>
                      {`${user.active === true ? 'Active' : 'Disable'}`}
                    </span>
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>

            <div className='col-9'>
              <Card className='m-3'>
                <Card.Body className='d-flex flex-column'>
                  <Card.Title className={`mb-3 ${zawgyi(lang)}`}> {t('profile-update-title')} </Card.Title>

                  <div className='d-flex flex-row'>
                    <InputGroup>
                      <FormControl
                        type='text'
                        className={`me-3 ${zawgyi(lang)}`}
                        placeholder={t('profile-update-name')}
                        value={update_name}
                        onChange={(e) => this.setState({
                          update_name: e.target.value
                        })}
                      />
                    </InputGroup>

                    <InputGroup>
                      <FormControl 
                        type='text'
                        className={`me-3 ${zawgyi(lang)}`}
                        placeholder={t('profile-update-phone')}
                        value={update_phone}
                        onChange={(e) => this.setState({
                          update_phone: e.target.value
                        })}
                      />
                    </InputGroup>

                    <InputGroup>
                      <FormControl
                        type='email' 
                        className={`${zawgyi(lang)}`}
                        placeholder={t('profile-update-email')}
                        value={update_email}
                        onChange={(e) => this.setState({
                          update_email: e.target.value
                        })}
                      />
                    </InputGroup>
                  </div>

                  <div className='d-flex flex-row justify-content-between'>
                    <div>
                      {/* {error && (
                        <label className={`mt-3 profile-update-error ${zawgyi(lang)}`}> {error} </label>
                      )} */}
                    </div>

                    <Button
                      className={`mt-3 ${zawgyi(lang)}`}
                      onClick={() => this.update()}
                      disabled={is_loading}
                    >
                      {t('profile-update-btn')}
                    </Button>
                  </div>

                  <Card.Title className={`mb-3 ${zawgyi(lang)}`}> {t('profile-change-password-title')} </Card.Title>

                  <div className='d-flex flex-row'>
                    <InputGroup>
                      <FormControl
                        type='password'
                        className={`me-3 ${zawgyi(lang)}`}
                        placeholder={t('profile-password-current_password')}
                        value={current_password}
                        onChange={(e) => this.setState({
                          current_password: e.target.value
                        })}
                      />
                    </InputGroup>

                    <InputGroup>
                      <FormControl 
                        type='password'
                        className={`me-3 ${zawgyi(lang)}`}
                        placeholder={t('profile-password-new_password')}
                        value={new_password}
                        onChange={(e) => this.setState({
                          new_password: e.target.value
                        })}
                      />
                    </InputGroup>

                    <InputGroup>
                      <FormControl
                        type='password' 
                        className={`${zawgyi(lang)}`}
                        placeholder={t('profile-password-confirm_password')}
                        value={confirm_password}
                        onChange={(e) => this.setState({
                          confirm_password: e.target.value
                        })}
                      />
                    </InputGroup>
                  </div>

                  <div className='d-flex flex-row justify-content-between'>
                    <div>
                      {/* {password_error && (
                        <label className={`mt-3 profile-update-error ${zawgyi(lang)}`}> {password_error} </label>
                      )} */}
                    </div>

                    <Button
                      className={`mt-3 ${zawgyi(lang)}`}
                      onClick={() => this.changePassword()}
                      disabled={is_loading}
                    >
                      {t('profile-password-change-btn')}
                    </Button>
                  </div>
                </Card.Body>
              </Card>
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
  openToast: (title, message, theme) => dispatch(setOpenToastAction(title, message, theme))
});
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(ProfilePage));