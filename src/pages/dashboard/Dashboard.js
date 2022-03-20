import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { CountCard } from '../../components/general/CountCard';
import { Navigation } from '../../components/general/Navigation';
import { setOpenToastAction } from '../../redux/actions/toast.action';
import { getInvoice } from '../../services/invoice.service';
import { changeNumberFormat } from '../../utilities/number.utility';

class DashboardPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            count: {
                customer: 0
            }
        }
    }

    async loadingData() {
        const { count } = this.state;
        const { openToast } = this.props;

        const customerResponse = await getInvoice();

        if(customerResponse && customerResponse.success === false) {
            openToast('Customer', customerResponse.message, 'danger');
            return;
        }

        const updateCount = count;
        updateCount.customer = customerResponse.length;

        this.setState({
            count : updateCount
        });
    }

    async componentDidMount() {
        this.loadingData();
    }

    render() {
        const { count } = this.state;
        return (
            <>
                <Navigation props={this.props} />

                <div className='container-fluid'>
                    <div className='row mt-3'>
                        <div className='col-md-3'>
                        <CountCard 
                            props={this.props}
                            label="Total Customer"
                            color="rgba(255,69,70,1)"
                            count={count.customer}
                            url={'/customer'}
                            urlLabel={'View More Customer List'}
                        />
                        </div>
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
    openToast: (title, message, theme) => dispatch(setOpenToastAction(title, message, theme)),
});
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(DashboardPage));