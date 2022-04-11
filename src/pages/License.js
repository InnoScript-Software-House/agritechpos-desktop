import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { SerialKeyComponent } from '../components/license/SerialKeyComponent';
import { CustomerInformationComponent } from '../components/license/CustomerInformationComponent';
import { PlanComponent } from '../components/license/PlanComponent';
import { Activation } from '../components/license/activation';
import { Button, ToastContainer } from "react-bootstrap";
import { AppToast } from '../components/general/toasts';
import { SideSection } from '../components/general/sideSection';

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
      <div className='container-fluid g-0'>
        <div className='row g-0'>
          <div className='col-md-12'>
            <ToastContainer
              className='app-toast-container'
              position='top-end'
            >
              <AppToast props={this.props} />
            </ToastContainer>
          </div>
        </div>

        <div className='row g-0'>
          <div className='col-md-6 background-image-layout'>
            <SideSection />
          </div>

          <div className='col-md-6'>
            <div className='flex-col-center-layout'>
              <img className="logo" src="build/assets/images/logo.png" />
              
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