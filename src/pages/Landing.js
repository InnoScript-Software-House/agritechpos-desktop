/**
 * Developer                    - Aung Htet Paing
 * Start Date                   - 25 Dec 2021
 * Phone                        - 09421038123, 09758276201
 * Email                        - aunghtetpaing.info@gmail.com
**/

import React, { Component } from 'react'
import { Button, Spinner } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { Link, Navigate } from 'react-router-dom';
import { trans } from '../assets/i18n/mm.json';

class LandingPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            is_loading: true
        }
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                is_loading: false
            })
        }, 3000)
    }

    render() {
        const { is_loading } = this.state;

        return (
            <div className='container'>
                <div className='row justify-content-center'>
                    <div className='col-4 align-self-center'>
                        <img className='landing-logo' src='build/assets/images/logo.png' alt="kubota_logo" />
                        <h3 className='landing-title'> POS Management System </h3>
                        {
                            is_loading ? (<Spinner className='landing-spinner' animation="border" role="status" />) : 
                            (
                                <div className=''>
                                    <Link to={'login'}> 
                                        <Button className='btn-primary'> {trans.app.enter_btn} </Button>
                                    </Link>

                                    <Link to={'/register'}> 
                                        <Button className='btn-primary'> {trans.app.register_btn} </Button>
                                    </Link>
                                </div>   
                            )
                        }
                    </div>
                </div>
            </div>

        )
    }
}

export default withRouter(LandingPage)