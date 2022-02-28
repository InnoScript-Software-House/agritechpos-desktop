import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Language } from '../components/general/Language';
import { t, zawgyi } from '../utilities/translation.utility';
import { SerialKeyComponent } from '../components/license/SerialKeyComponent';
import { CustomerInformationComponent } from '../components/license/CustomerInformationComponent';
import { PlanComponent } from '../components/license/PlanComponent';
import { Footer } from '../components/general/Footer';
import { Activation } from '../components/license/activation';
import { ToastContainer } from "react-bootstrap";
import { AppToast } from '../components/general/toasts';

class LicensePage extends Component {

  constructor(props){
    super(props);
    this.state = {
      serialNumber: 'AAAA-AAAA-AAAA-AAAA-AAAA-AAAA',
      userInfo: {
        first_name: ""
      },
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
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-md-12'>
            <ToastContainer
              className='app-toast-container'
              position='top-end'
            >
              <AppToast props={this.props} />
            </ToastContainer>

            <div className='d-md-flex flex-md-row justify-content-end align-items-center'>
              <Language props={this.props} />
            </div>
          </div>
        </div>

        <div className='row mt-3'>
          <div className='col-md-4'>
            <img src="build/assets/images/side_image.jpeg" className='img-fluid' />
          </div>

          <div className='col-md-8'>
            <h3 className={`title ${zawgyi(lang)}`}> {t('title')} </h3>

            {!serialNumber && (
              <SerialKeyComponent 
                props={this.props}
                retriveSerialKey={(e) => this.getSerialKey(e)} 
              />
            )}

            {(serialNumber && !userInfo) && (
              <CustomerInformationComponent 
                props={this.props}
                retriveUserInfo={(e) => this.getUserInfo(e)}
                backStep={(e) => this.getBackStep(e)}
              />
            )}

            {(serialNumber && userInfo && !plan) && (
              <PlanComponent 
                props={this.props}
                retrivePlan={(e) => this.getPlan(e)}
                backStep={(e) => this.getBackStep(e)}
              />
            )}

          </div>
        </div>
      </div>
      // <>

      //       {(serialNumber && userInfo && plan) && (
      //         <Activation 
      //           lng={lang}
      //           serial={serialNumber}
      //           user={userInfo}
      //           plan={plan}
      //           backStep={(e) => this.getBackStep(e)}
      //           history={this.props.history}
      //         />
      //       )}
      //     </div>
      //   </div>
      // </>
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