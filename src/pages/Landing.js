/**
 * Developer                    - Aung Htet Paing
 * Start Date                   - 25 Dec 2021
 * Phone                        - 09421038123, 09758276201
 * Email                        - aunghtetpaing.info@gmail.com
**/

// ** Framework Libraries
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Link, Navigate } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import i18next from 'i18next';
import { connect } from 'react-redux';

// ** Redux 
import { setLangAction } from '../redux/actions/lang.action';

// ** Implimentation Libraries
import { t, zawgyi } from '../utilities/translation.utility';
import { getSerialKeyAction } from '../redux/actions/serialkey.action';
import { LANG_VALUE, SERIAL_KEY_VALUE } from '../redux/actionTypes';

// ** Import Data Source
import lngData from '../assets/i18n/language.json';
import { SerialKeyForm } from '../components/serialKeyForm';

class LandingPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            is_loading: true,
            lang_value: localStorage.getItem(LANG_VALUE) ? localStorage.getItem(LANG_VALUE) : 'unicode',
            serialNumber: localStorage.getItem(SERIAL_KEY_VALUE) ? localStorage.getItem(SERIAL_KEY_VALUE) : null
        }
    }

    async componentDidMount() {
        const { lang_value } = this.state;
        i18next.changeLanguage(lang_value);
    }

    async changeLang(value) {
        const getLang = await this.props.setLang(value);
        i18next.changeLanguage(getLang.payload);

        this.setState({
            lang_value: getLang.payload
        })
    }

    async getSerial(value) {
        this.setState({
            serialNumber: value
        })
    }

    render() {
        const { lang_value, serialNumber } = this.state;

        return (
            <>
            <div className='d-flex flex-row'>
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

                    {serialNumber === null && (<SerialKeyForm lng={lang_value} serialKeyHandler={(e) => this.getSerial(e)}/>)}

                    {/* <div className=''>
                                    <Link to={'login'}> 
                                        <Button> {t('app.enter_btn')} </Button>
                                    </Link>

                                    <Link to={'/register'}> 
                                        <Button className='btn-primary'> {t('app.register_btn')} </Button>
                                    </Link>
                                </div>   */}
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
    setLang: (value) => dispatch(setLangAction(value)),
    getSerialKey: () => dispatch(getSerialKeyAction())
});
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(LandingPage));
