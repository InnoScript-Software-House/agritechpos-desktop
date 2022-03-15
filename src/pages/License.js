import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { SerialKeyComponent } from '../components/license/SerialKeyComponent';
import { CustomerInformationComponent } from '../components/license/CustomerInformationComponent';
import { PlanComponent } from '../components/license/PlanComponent';
import { Activation } from '../components/license/activation';
import { ToastContainer } from "react-bootstrap";
import { AppToast } from '../components/general/toasts';

class LicensePage extends Component {

  constructor(props){
    super(props);
    this.state = {
      serialNumber: null,
      userInfo: null,
      plan: null
    }
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
    console.log(planData);
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
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-md-12'>
            <ToastContainer
              className='app-toast-container'
              position='top-end'
            >
              <AppToast props={this.props} />
            </ToastContainer>
          </div>
        </div>

        <div className='row mt-3'>
          <div className='col-md-4'>
            <img src="build/assets/images/side_image.jpeg" className='img-fluid' />
          </div>

          <div className='col-md-8'>
            <h3 className="title"> Agricultural Equipment POS Software </h3>

            {!serialNumber && (
              <SerialKeyComponent 
                retriveSerialKey={(e) => this.getSerialKey(e)} 
              />
            )}

            {(serialNumber && !userInfo) && (
              <CustomerInformationComponent 
                retriveUserInfo={(e) => this.getUserInfo(e)}
                backStep={(e) => this.getBackStep(e)}
              />
            )}

            {(serialNumber && userInfo && !plan) && (
              <PlanComponent 
                retrivePlan={(e) => this.getPlan(e)}
                backStep={(e) => this.getBackStep(e)}
              />
            )}

            {(serialNumber && userInfo && plan) && (
              <Activation 
                serial={serialNumber}
                user={userInfo}
                plan={plan}
                backStep={(e) => this.getBackStep(e)}
                history={this.props.history}
              />
            )}
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
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(LicensePage));