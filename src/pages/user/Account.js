import React, { Component } from 'react'
import { Button, Card, FormControl } from 'react-bootstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Navigation } from '../../components/general/Navigation';
import { t, zawgyi } from '../../utilities/translation.utility';
import { createAccount, getUsers } from '../../services/user.service';
import { AccountList } from '../../components/account/accountList';

import '../../assets/css/account.css';

class AccountPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      phone: '',
      email: '',
      password: '',
      confirm_password: '',
      error: null,
      loading: false,
      userList: []
    }
  }


  async create() {
    const { name, phone, email, password, confirm_password } = this.state;

    if(name === '' || phone === '' || email === '' || password === '' || confirm_password === '') {
      this.setState({
        error: t('account-create-empty-error')
      });
      return;
    }

    if(password !== confirm_password) {
      this.setState({
        error: t('account-does-not-match-error')
      });
      return;
    }

    const resquestBody = {
      name: name,
      phone: phone,
      email: email,
      password: password
    }

    this.setState({
      loading: true
    });

    const response = await createAccount(resquestBody);

    if(response && response.success === false) {
      this.setState({
        error: response.message,
        loading: false
      });
      return;
    }

    const users = await getUsers();

    if(response && response.success === false) {
      this.setState({
        error: response.message,
        loading: false
      });
      return;
    }

    this.setState({
      error: null,
      userList: users,
      loading: false
    });
  }

  render() {
    const { lang } = this.props.reducer;
    const { error, userList } = this.state;
    return (
      <>
        <Navigation props={this.props} />

        <div className='d-md-flex flex-row justify-content-between'>
          <div className='col-md-3 p-1'>
            <Card>
              <Card.Title className='p-3'> 
                <span className={`${zawgyi(lang)}`}> {t('account-create-title')} </span>
              </Card.Title>

              <Card.Body>
                <FormControl 
                  className={`mb-2 ${zawgyi(lang)}`}
                  type='text'
                  placeholder={t('input-account-name')}
                  value={this.state.name}
                  onChange={(e) => this.setState({
                    name: e.target.value
                  })}
                />

                <FormControl 
                  className={`mb-2 ${zawgyi(lang)}`}
                  type='email'
                  placeholder={t('input-account-email')}
                  value={this.state.email}
                  onChange={(e) => this.setState({
                    email: e.target.value
                  })}
                />

                <FormControl 
                  className={`mb-2 ${zawgyi(lang)}`}
                  type='text'
                  placeholder={t('input-account-phone')}
                  value={this.state.phone}
                  onChange={(e) => this.setState({
                    phone: e.target.value
                  })}
                />

                <FormControl 
                  className={`mb-2 ${zawgyi(lang)}`}
                  type='password'
                  placeholder={t('input-account-password')}
                  value={this.state.password}
                  onChange={(e) => this.setState({
                    password: e.target.value
                  })}
                />

                <FormControl 
                  className={`mb-2 ${zawgyi(lang)}`}
                  type='password'
                  placeholder={t('input-account-confirm-password')}
                  value={this.state.confirm_password}
                  onChange={(e) => this.setState({
                    confirm_password: e.target.value
                  })}
                />

                <div className='d-md-flex flex-row justify-content-start align-items-center'>
                  <Button 
                    className='btn-account-create'
                    onClick={() => this.create()}
                    disabled={this.state.loading}
                  > 
                    {t('btn-account-create')} 
                  </Button>
                    {error && (<span className='account-create-error ms-3'> {error} </span>)}
                </div>
              </Card.Body>
            </Card>
          </div>

          <div className='col-md-9'>
            <AccountList props={this.props} dataSource={userList} />
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
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AccountPage));