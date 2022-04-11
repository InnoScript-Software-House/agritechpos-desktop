import React, { Component } from 'react'
import { Button, FormControl, InputGroup, ToastContainer } from 'react-bootstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { SideSection } from '../components/general/sideSection';
import { AppToast } from '../components/general/toasts';
import { setDatabaseUrl } from '../redux/actions/config.action';
import { setOpenToastAction } from '../redux/actions/toast.action';


class ConfigurationPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            url: ""
        }
    }

    saveUrl = () => {
        const { url } = this.state;
        const { setToast, setDatabaseUrl, history } = this.props;

        if(url === '') {
            setToast('Configuration Setting', 'IP address is required', 'danger')
            return;
        }

        setDatabaseUrl(url);
        setToast('Configuration Setting', 'Database url is updated', 'success')
        history.push('/');
        return;
    };

    render() {
        const { url } = this.state;

        return (
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

                        <div className='col-md-7'>
                            <h3 className="title-default mt-3"> Configuration </h3>

                            <InputGroup className="config-input-500">
                                <FormControl 
                                    type="text"
                                    placeholder="Enter database IP address"
                                    value={url}
                                    onChange={e => this.setState({ url: e.target.value })}
                                />

                                <Button className="btn btn-samll" onClick={() => this.saveUrl()}> Submit </Button>
                            </InputGroup>
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
    setToast: (title, message, status) => dispatch(setOpenToastAction(title, message, status)),
    setDatabaseUrl: (url) => dispatch(setDatabaseUrl(url))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(ConfigurationPage));