import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { trans, pages } from '../assets/i18n/mm.json'; 
import { ArrowBarDown, ArrowRight, List, ListCheck } from 'react-bootstrap-icons';
import { NetworkConnection } from '../components/settings/NetworkConnection';
import { LanguageComponent } from '../components/general/Language';
import { UpdateComponent } from '../components/settings/Update';
import { LicenseComponent } from '../components/settings/License';
import { SideBarComponent } from '../components/settings/sidebar';
import { ShopComponent } from '../components/settings/shop';
import { Navigation } from '../components/general/Navigation';

import '../assets/css/setting.css';
import { NumberSpecificationComponent } from '../components/settings/numberSpecification';

class SettingPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            openComponent: 'NumberSpecificationComponent'
        }
    }

    componentDidMount() {
        console.log(this.props);
        const { search } = this.props.location;

        if(search) {
            const getComponentName = search.split('=')[1];
            this.changeComponent(getComponentName);
            return;
        }
    }

    changeComponent(e) {
        this.setState({
            openComponent: e
        })
    }

    selectedComponent(e) {
        this.setState({
            openComponent: e
        });
    }
    render() {
        const { openComponent } = this.state;

        return (
            <>
                <Navigation props={this.props} />

                <div className='d-flex flex-row'>
                    <div className='col-2'>
                        <SideBarComponent props={this.props} getComponent={e => this.selectedComponent(e) }/>
                    </div>

                    {openComponent && openComponent === 'ShopComponent' && (<ShopComponent props={this.props} />)}

                    {openComponent && openComponent === 'NumberSpecificationComponent' && (<NumberSpecificationComponent props={this.props} />)}
                </div>
            </>
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
)(withRouter(SettingPage));