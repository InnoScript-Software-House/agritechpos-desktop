import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Navigation } from '../../components/general/Navigation';
import { getProfile } from '../../services/user.service';
import { Button, Card, FormControl, InputGroup } from 'react-bootstrap';
import { setOpenToastAction } from '../../redux/actions/toast.action';
import { editUser } from '../../services/user.service';
import { changePassword } from '../../services/user.service';

const checkphone = /^(\+?(95)|[09])\d{9}/g;
const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

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
      password_error: null,
    }
  }

  httpHandler(response){
    if(response && response.success === false) {
      return this.props.openToast('Profile Update', response.message, 'danger');
    }
    return response;
  }

  async loadingData() {
    const {openToast} = this.props;
    const response = await getProfile();

    if(response && response.success === false) {
      return openToast('Profile Update', response.message, 'danger');
    }

    this.setState({
      user: response,
      update_name: response.name,
      update_email: response.email,
      update_phone: response.phone,
      is_loading: false
    });

    return;
  }

  async componentDidMount() {
    this.loadingData();
  }

  async update() {
    const { update_email, update_name, update_phone } = this.state;
    const { openToast } = this.props;

    if(update_email === '' || update_name === '' || update_phone === '') {
      return openToast('Profile Update', 'All fileds are required', 'danger');
    }

    if(!checkphone.test(update_phone)) {
      return openToast('Profile Update', 'Invalid phone number', 'danger');
    }

    if(!pattern.test(update_email)){
      return openToast('Profile Update', 'Invalid email address', 'danger');
  }
    const requestBody = {
      name: update_name, 
      phone: update_phone,
      email: update_email
    }

    if(this.state.user.name === requestBody.name) {
      delete requestBody.name;
    }

    if(this.state.user.phone === requestBody.phone){
      delete requestBody.phone;
    }

    if(this.state.user.email === requestBody.email){
      delete requestBody.email;
    }

    const response = await editUser(this.state.user.id, requestBody);

    if(response && response.success === false) {
      return openToast('Profile Update', response.message, 'danger');
    }

    this.loadingData();
    return this.props.openToast('Profile Update', 'Profile Update Successful', 'success');
  }

  async changePassword() {
    const { current_password, new_password, confirm_password } = this.state;
    const { openToast, history } = this.props;

    if(current_password === '' || new_password === '' || confirm_password === '') {
      return openToast('Change Password', 'All fields are required', 'danger');
    }

    if(confirm_password !== new_password) {
      return openToast('Change Password', 'new password does not match', 'danger');
    }

    this.setState({
      is_loading: true
    });

    const requestBody = {
      password: current_password,
      newPassword: new_password
    }

    const response = await changePassword(this.state.user.id, requestBody);

    if(response && response.success === false) {
      return openToast('Change Password', response.message, 'danger');
    }

    this.setState({
      is_loading: false,
    });

    this.props.openToast('Change Password', 'Password Change Successfully', 'success');
    history.push('/logout');
    return;
  }

  render() {
    const { user, is_loading, update_name, update_email, update_phone, current_password, new_password, confirm_password } = this.state;
    return (
      <>
        <Navigation props={this.props} />

        <div className='container-fluid'>
          <div className='row mt-3'>
            <div className='col-md-4'>
              {user && (
                <Card>
                  <Card.Header>
                    <Card.Title> User Profile </Card.Title>
                  </Card.Header>

                  <Card.Body>
                    <Card.Text className='d-md-flex flex-md-row justify-content-between'>
                      <label> Account Name </label>
                      <label> {user.name} </label>
                    </Card.Text>

                    <Card.Text className='d-md-flex flex-md-row justify-content-between'>
                      <label> Phone </label>
                      <label> {user.phone} </label>
                    </Card.Text>

                    <Card.Text className='d-md-flex flex-md-row justify-content-between'>
                      <label> Email </label>
                      <label> {user.email} </label>
                    </Card.Text>

                    <Card.Text className='d-md-flex flex-md-row justify-content-between'>
                      <label> Status </label>
                      <span className={`active-status ${user.active === true ? 'enable' : 'disable'}`}>
                        {`${user.active === true ? 'Active' : 'Disable'}`}
                      </span>
                    </Card.Text>
                  </Card.Body>
                </Card>
              )}
            </div>

            <div className='col-md-8'>
              <Card>
                  <Card.Header>
                    <Card.Title className="mb-3"> Update Profile </Card.Title>
                  </Card.Header>
                  <Card.Body className='d-md-flex flex-md-column'>
                    <InputGroup className='mb-3'>
                      <FormControl
                        type='text'
                        className="me-3"
                        placeholder="Account Name"
                        value={update_name}
                        onChange={(e) => this.setState({
                          update_name: e.target.value
                        })}
                      />

                      <FormControl 
                          type='text'
                          className="me-3"
                          placeholder="Phone"
                          value={update_phone}
                          onChange={(e) => this.setState({
                            update_phone: e.target.value
                          })}
                        />

                        <FormControl
                          type='email' 
                          placeholder="Email"
                          value={update_email}
                          onChange={(e) => this.setState({
                            update_email: e.target.value
                          })}
                        />

                        <Button onClick={() => this.update()} disabled={is_loading}> Update </Button>
                    </InputGroup>

                    <Card.Title className="mt-3"> Change Password </Card.Title>

                    <InputGroup>
                      <FormControl
                        type='password'
                        className="me-3"
                        placeholder="Current Password"
                        value={current_password}
                        onChange={(e) => this.setState({
                          current_password: e.target.value
                        })}
                      />

                      <FormControl 
                        type='password'
                        className="me-3"
                        placeholder="New Password"
                        value={new_password}
                        onChange={(e) => this.setState({
                          new_password: e.target.value
                        })}
                      />

                      <FormControl
                        type='password' 
                        placeholder="Confirm Password"
                        value={confirm_password}
                        onChange={(e) => this.setState({
                          confirm_password: e.target.value
                        })}
                      />

                      <Button onClick={() => this.changePassword()} disabled={is_loading}> Change Password </Button>
                    </InputGroup>
                  </Card.Body>
                </Card>
            </div>
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
  openToast: (title, message, theme) => dispatch(setOpenToastAction(title, message, theme))
});
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(ProfilePage));