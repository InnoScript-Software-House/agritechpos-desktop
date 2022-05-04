import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Navigation } from '../../components/general/Navigation';
import { CustomerListTableComponent } from '../../components/customer/CustomerListTableComponent';
import { getInvoice } from '../../services/invoice.service';
import { getCustomerList } from '../../services/customer.service';
import CustomerBoughtItemsComponent from '../../components/customer/CustomerBoughtItemsComponent';
import { LoadingComponent } from '../../components/general/Loading';

class CustomerPage extends Component {
 
    constructor(props) {
        super(props);
        this.state = {
            openEdit: false,
            selectedCustomer: null,
            loading: true,
            customers: []
        }
    };

    getSelectCustomerInfo(e) {
        this.setState({
            selectedCustomer: e
        });
    }


    async loadingData() {
        const response = await getCustomerList();

        if(response && response.success === false) {
            window.nativeApi.messageBox({ title: t('response-error'), message: response.message, type: messageBoxType.info});
            this.setState({ loading: false });
            return;
        }

        response.map((value) => {
            value.invoice_count = value.invoice.length;

            if(value.invoice.length > 0) {
                const total_amount = value.invoice.map(data => data.total_amount);
                value.total_amount = total_amount.reduce((a,b) => Number(a)+Number(b));
            } else {
                value.total_amount = 0;
            }

            if(value.credit.length > 0) {
                const total_credit = value.credit.map(data => data.amount);
                value.total_credit_amount = total_credit.reduce((a,b) => Number(a) + Number(b));

                value.credit.map((creditData) => {
                   const getRepayment = JSON.parse(creditData.repayment);
                   value.repayment_time = getRepayment.length;

                   const getPayAmount = getRepayment.map((repaymentData) => repaymentData.pay_amount);
                   value.total_pay_amount = getPayAmount.reduce((a,b) => Number(a) + Number(b));
                   
                   value.total_repayment_remaining = Number(value.total_credit_amount) - Number(value.total_pay_amount);
               });

            } else {
                value.total_credit_amount = 0;
                value.repayment_time = 0;
                value.total_pay_amount = 0;
                value.total_repayment_remaining = 0;
            }

            return value;
        });

        console.log(response);

        this.setState({
            loading: false,
            customers: response
        });

        return;
    }

    async componentDidMount() {
        const { history } = this.props;

        nativeApi.app.navigateTo((url) => {
        	history.push(url);
        });

        await this.loadingData();
    }
 
    render() {
        return (
            <div className='container-fluid'>
                {!this.state.loading && (
                    <div className='row mt-1'>
                                    {/* <div className='col-md-3'>
                                        <CustomerBoughtItemsComponent
                                        props={this.props}
                                        customerInfo={selectedCustomer}
                                        />
                                    </div> */}
                
                        <div className='col-md-12'>
                            <CustomerListTableComponent 
                                dataSource={this.state.customers}
                                reload={() => this.loadingData()}
                                retrive={(e) => this.getSelectCustomerInfo(e)}
                            />
                        </div>
                    </div>
                )}

                {this.state.loading && (
                    <LoadingComponent />
                )}
            </div>
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
)(withRouter(CustomerPage));