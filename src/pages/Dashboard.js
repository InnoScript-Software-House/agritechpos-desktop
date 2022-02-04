import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { DashboardNotiCompoment } from '../components/dashboard/notification';
import { Navigation } from '../components/general/Navigation';
import { getShop } from '../services/shop.service';

class DashboardPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            notification: {
                shop: false
            }
        }
    }

    async checkApp() {
        const { notification } = this.state;
        const shop = await getShop();

        let updateNotification = notification;
        updateNotification.shop = shop === null ? true : false

        this.setState({
            notification: updateNotification
        });
    }

    async componentDidMount() {
        this.checkApp();
        
    }

    render() {
        const { notification } = this.state;
        return (
            <>
                <Navigation props={this.props} />
                <DashboardNotiCompoment props={this.props} notification={notification} />
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
)(withRouter(DashboardPage));