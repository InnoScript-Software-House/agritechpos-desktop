import React, { Component } from 'react'
import { ToastContainer } from 'react-bootstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { DatabaseURLComponent } from '../components/configurations/DatabaseURLComponent';
import { AppToast } from '../components/general/toasts';


class ConfigurationPage extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
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
                        <h3 className="title mb-3 pb-3"> Agricultural Equipment POS Software </h3>
                        <div className='row mt-3 pt-3'>
                            <div className='col-md-8'>
                                <DatabaseURLComponent />
                            </div>
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
    setToast: (title, message, status) => dispatch(setOpenToastAction(title, message, status))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(ConfigurationPage));