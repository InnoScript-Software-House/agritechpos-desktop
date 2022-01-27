import React, { Component } from 'react';
import Navigation from '../components/navigation';
import { trans, pages } from '../assets/i18n/mm.json'; 

import '../assets/css/setting.css';
import { ArrowBarDown, ArrowRight, List, ListCheck } from 'react-bootstrap-icons';
import { NetworkConnection } from '../components/settings/NetworkConnection';
import { LanguageComponent } from '../components/general/Language';
import { UpdateComponent } from '../components/settings/Update';
import { LicenseComponent } from '../components/settings/License';

export default class SettingPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            openComponent: pages.setting.sub_menu[2]
        }
    }

    componentDidMount() {

    }

    changeComponent(e) {
        console.log(e);
        this.setState({
            openComponent: e
        })
    }

    render() {
        const { openComponent } = this.state;

        return (
            <>
                <Navigation props={this.props} />
                <div className='container-fluid'>
                    <div className='row'>
                        <div className='col-2 reset-padding'>
                            <div className='side-menu'>
                                <h3 className='sub-title'> { pages.setting.header_title } </h3>

                                <ul className='setting-sub-menu'>
                                    { pages.setting.sub_menu.map((value, index) => {
                                        return(
                                            <li key={`setting_sub_menu_id_${index}`} onClick={() => this.changeComponent(value)}>
                                                <ArrowRight size={15} /> <span> {value.label} </span>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>
                        </div>

                        <div className='col-10'>
                            {
                                openComponent.component === 'network' ? (<NetworkConnection dataSource={openComponent} />) :
                                openComponent.component === 'language' ? (<LanguageComponent dataSource={openComponent} />) :
                                openComponent.component === 'update' ? (<UpdateComponent dataSource={openComponent} />) :
                                openComponent.component === 'license' ? (<LicenseComponent dataSource={openComponent} />) :
                                null
                            }
                            
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
