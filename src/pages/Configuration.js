import React, { Component } from 'react'
import { Button, ToastContainer } from 'react-bootstrap';
import { BsArrowClockwise, BsCheck2Square } from 'react-icons/bs';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { DatabaseURLComponent } from '../components/configurations/DatabaseURLComponent';
import { DeviceTypeComponent } from '../components/configurations/DeviceTypeComponent';
import { NetworkTypeComponent } from '../components/configurations/NetworkTypeComponent';
import { Language } from '../components/general/Language';
import { AppToast } from '../components/general/toasts';
import { t, zawgyi } from '../utilities/translation.utility';

const configNavigations = [
    // {
    //     title: t('config-nav-device'),
    //     component: 'DeviceTypeComponent'
    // },
    // {
    //     title: t('config-nav-network'),
    //     component: 'NetworkTypeComponent'
    // },
    {
        title: t('config-nav-database-url'),
        component: 'DatabaseURLComponent'
    }
]

class ConfigurationPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            openComponent: 'DatabaseURLComponent'
        }
    }

    restart() {
        const { app } = window.nativeApi;
        app.restart();
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
                        <h3 className={`title mb-3 pb-3 ${zawgyi(lang)}`}> {t('title')} </h3>

                        {/* <Button
                            className='btn btn-small'
                            onClick={() => this.restart()}
                        >
                            <BsArrowClockwise size={30} /> Restart
                        </Button> */}

                        <div className='row mt-3 pt-3'>
                            {/* <div className='col-md-4'>
                                <ul className='config-nav-list'>
                                    {configNavigations.map((value, index) => {
                                        return(
                                            <li 
                                                key={`config_nav_id_${index}`}  
                                                onClick={() => this.setState({
                                                    openComponent: value.component
                                                })}
                                            > 
                                                <BsCheck2Square size={20} />
                                                <span className={`${zawgyi(lang)}`}> {value.title} </span>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div> */}

                            <div className='col-md-8'>
                                {openComponent === 'DeviceTypeComponent' && (
                                    <DeviceTypeComponent props={this.props} />
                                )}

                                {openComponent === 'NetworkTypeComponent' && (
                                    <NetworkTypeComponent props={this.props} />
                                )}

                                {openComponent === 'DatabaseURLComponent' && (
                                    <DatabaseURLComponent props={this.props} />
                                )}
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
    setLang: (value) => dispatch(setLangAction(value)),
    setToast: (title, message, status) => dispatch(setOpenToastAction(title, message, status))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(ConfigurationPage));