import React, { Component } from 'react'
import { ToastContainer } from 'react-bootstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { DeviceTypeComponent } from '../components/configurations/DeviceTypeComponent';
import { NetworkTypeComponent } from '../components/configurations/NetworkTypeComponent';
import { Language } from '../components/general/Language';
import { AppToast } from '../components/general/toasts';
import { t, zawgyi } from '../utilities/translation.utility';

class ConfigurationPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            openComponent: null
        }
    }

    updateState(componentName) {
        this.setState({
            openComponent: componentName
        });
    }

    checkConfig() {
        const { config } = this.props.reducer;
        console.log('Configuration', config);

        if(config && config.device_type === null) {
            return this.updateState('DeviceTypeComponent');
        }

        if(config && config.network_type === null) {
            return this.updateState('NetworkTypeComponent');
        }
    }

    refresh() {
        this.checkConfig();
    }

    componentDidMount() {
        this.checkConfig();
    }

    render() {
        const { lang } = this.props.reducer;
        const { openComponent } = this.state;

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

                        {openComponent === 'DeviceTypeComponent' && (
                            <DeviceTypeComponent props={this.props} reload={() => this.checkConfig()} />
                        )}

                        {openComponent === 'NetworkTypeComponent' && (
                            <NetworkTypeComponent props={this.props} reload={() => this.checkConfig()} />
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
    setLang: (value) => dispatch(setLangAction(value)),
    setToast: (title, message, status) => dispatch(setOpenToastAction(title, message, status))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(ConfigurationPage));