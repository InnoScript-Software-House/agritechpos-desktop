import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Language } from '../components/general/Language';
import { t, zawgyi } from '../utilities/translation.utility';
import { SerialKeyForm } from '../components/license/serialKeyForm';
import { UserInformationForm } from '../components/license/userInformation';
import { PlanForm } from '../components/license/planForm';
import { Footer } from '../components/general/Footer';
import { Activation } from '../components/license/activation';

import '../assets/css/license.css';

class LicensePage extends Component {

  constructor(props){
    super(props);
    this.state = {
      serialNumber: null,
      userInfo: null,
      plan: null
    }
  }

  componentDidMount() {
  }

  getSerialKey(serialKey) {
    this.setState({
      serialNumber: serialKey
    });
  }

  getUserInfo(userData) {
    this.setState({
      userInfo: userData
    });
  }

  getPlan(planData) {
    this.setState({
      plan: planData
    });
  }

  getBackStep(e) {
    
    if(e === 'serial-key') {
      return this.setState({
        userInfo: null,
        serialNumber: null
      });
    }

    if(e === 'user-info') {
      return this.setState({
        userInfo: null,
        plan: null
      })
    }

    if(e === 'plan') {
      return this.setState({
        plan: null
      });
    }
  }

  render() {
    const { serialNumber, userInfo, plan } = this.state;
    const { lang } = this.props.reducer; 

    return(
      <>
        <div className='d-flex flex-row justify-content-end'>
          <Language props={this.props} />
        </div>

        <div className='d-flex flex-row justify-content-between'>
          <div className='col-5 d-flex flex-column justify-content-center'>
            <img src="build/assets/images/side_image.jpeg" className='cover-image align-self-center mt-3' />
          </div>

          <div className='col-7'>
            <h3 className={`title m-3 ${zawgyi(lang)}`}> {t('title')} </h3>

            {!serialNumber && (
              <SerialKeyForm 
                lng={lang} 
                retriveSerialKey={(e) => this.getSerialKey(e)} 
              />
            )}

            {(serialNumber && !userInfo) && (
              <UserInformationForm 
                lng={lang} 
                retriveUserInfo={(e) => this.getUserInfo(e)}
                backStep={(e) => this.getBackStep(e)}
              />
            )}

            {(serialNumber && userInfo && !plan) && (
              <PlanForm 
                lng={lang}
                retrivePlan={(e) => this.getPlan(e)}
                backStep={(e) => this.getBackStep(e)}
              />
            )}

            {(serialNumber && userInfo && plan) && (
              <Activation 
                lng={lang}
                serial={serialNumber}
                user={userInfo}
                plan={plan}
                backStep={(e) => this.getBackStep(e)}
                history={this.props.history}
              />
            )}
          </div>
        </div>

        <Footer />
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
)(withRouter(LicensePage));