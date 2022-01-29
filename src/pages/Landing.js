/**
 * Developer                    - Aung Htet Paing
 * Start Date                   - 25 Dec 2021
 * Phone                        - 09421038123, 09758276201
 * Email                        - aunghtetpaing.info@gmail.com
**/

import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { Link, Navigate } from 'react-router-dom';
import { Button, Form, Spinner } from 'react-bootstrap';
import i18next from 'i18next';
import { connect } from 'react-redux';
import { setLangAction } from '../redux/actions/lang.action';
import { getSerialKeyAction } from '../redux/actions/serialkey.action';
import { SERIAL_KEY_VALUE, DBCONNECTION_VALUE } from '../redux/actionTypes';
import { checkLicense } from '../services/license.service';
import '../assets/css/landing/index.css';
import axios from 'axios';

class LandingPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            is_loading: true,
            serialNumber: localStorage.getItem(SERIAL_KEY_VALUE) ? localStorage.getItem(SERIAL_KEY_VALUE) : null,
            dbInfo: localStorage.getItem(DBCONNECTION_VALUE) ? localStorage.getItem(DBCONNECTION_VALUE) : null
        }
    }

    async componentDidMount() {
        const { history } = this.props;
        const response = await checkLicense(this.props);

        if(response === null) {
            history.push('/error/0');
            return;
        }

        if(response && response.message === 'licnese is expired') {
            history.push('/error/expired');
            return;
        }

        if(response && response.length === 0) {
            history.push('/license');
            return;
        }

        if(response && response.length > 0) {
            localStorage.setItem('LICENSE', response[0].token);
            // const token = response[0].token;

            // axios.defaults.headers.get['license'] = token;
            // axios.defaults.headers.post['license'] = token;
            // axios.defaults.headers.delete['license'] = token;
            // axios.defaults.headers.put['license'] = token;

            history.push('/login');
        }
    }

    render() {
        const { is_loading } = this.state;

        return (
            <>
                {is_loading && (
                    <div className='d-flex flex-column full-height justify-content-center align-items-center'>
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden"> Loading... </span>
                        </Spinner>
                    </div>
                )}

                {/* <div className='d-flex flex-row'>
                <div className='col-6'>
                    <img className='side-image' src="build/assets/images/side_image.jpeg" />
                </div>

                <div className='col-6'>
                    <div className='d-flex flex-row justify-content-end'>
                        <Form.Select
                            className={`select-language-box m-1 ${zawgyi(lang_value)}`}
                            value={lang_value}
                            onChange={(e) => this.changeLang(e.target.value)}
                            >
                                { lngData.languages.map((value, index) => {
                                    return(
                                        <option 
                                            key={`language_id_${index}`}
                                            className={zawgyi(lang_value)}
                                            value={value.value} 
                                        > 
                                            {t(value.label)} 
                                        </option>
                                    )
                                })}
                        </Form.Select>
                    </div>

                    <h3 className={`landing-title ${zawgyi(lang_value)}`}> { t('landingPage.title')} </h3>

                    {serialNumber === null && (<SerialKeyForm lng={lang_value} serialKeyHandler={(e) => this.getSerial(e)} />)}

                    {(serialNumber && dbInfo === null) && (<DatabaseConfig lng={lang_value} dbInfoHandler={(e) => this.getDbInfo(e)} />)}

                    <div className=''>
                                    <Link to={'login'}> 
                                        <Button> {t('app.enter_btn')} </Button>
                                    </Link>

                                    <Link to={'/register'}> 
                                        <Button className='btn-primary'> {t('app.register_btn')} </Button>
                                    </Link>
                                </div>  
                </div>
            </div> */}
            </>            
        )
    }
}

const mapStateToProps = (state) => ({
    reducer: state
});
  
const mapDispatchToProps = (dispatch) => ({
    setLang: (value) => dispatch(setLangAction(value)),
    getSerialKey: () => dispatch(getSerialKeyAction())
});
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(LandingPage));
