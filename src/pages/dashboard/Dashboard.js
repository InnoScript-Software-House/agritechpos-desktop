import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { CountCard } from '../../Charts/CountCard';
import { Navigation } from '../../components/general/Navigation';
import { setOpenToastAction } from '../../redux/actions/toast.action';
import { getInvoice } from '../../services/invoice.service';
import moment from 'moment';
import numeral from 'numeral';
import { getItems } from '../../services/item.service';
import WeeklyTable from '../../Charts/WeeklyTable';

class DashboardPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            count: {
                customer: 0,
            },
            totalSellAmount: 0,
            qty: 0
        };
    }

    async loadingData() {

        const { openToast } = this.props;

        const customerResponse = await getInvoice();
        if (customerResponse && customerResponse.success === false) {
            openToast('Customer', customerResponse.message, 'danger');
            return;
        }

        const customerFilter = customerResponse.filter(value => value.customer_name !== null);
        // console.log(customerFilter);
        console.log(customerResponse);

        customerResponse.map((value) => {
            value.created_at = moment(value.created_at).format('DD-MM-Y');
        });
        const todayDate = moment().format('DD-MM-Y');
        const todayFilter = customerResponse.filter(value => value.created_at === todayDate);
        const totalSellAmountArray = todayFilter.map((value) => {
            return Number(value.total_amount);
        });

        const itemResponse = await getItems();
        // console.log(itemResponse)
        if (itemResponse && itemResponse.success === false) {

            openToast('Customer', itemResponse.message, 'danger');
            return;
        }

        const itemFilter = itemResponse.filter(value => value.qty !== null);
        const qtylist = itemFilter.map(value => value.qty);
        const totalqty = qtylist.reduce((a, b) => a + b, 0)
        // console.log(totalqty)

        this.setState({
            count: customerFilter.length,
            totalSellAmount: totalSellAmountArray.reduce((a, b) => a + b, 0),
            qty: totalqty,
        });
    }


    async componentDidMount() {
        this.loadingData();
    }

    render() {
        const { count, totalSellAmount , qty } = this.state;
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
                                count={count.customer? count.customer: 0}
                                url={'/customer'}
                                urlLabel={'View More Customer List'}
                            />
                        </div>
                        <div className='col-md-3'>
                            <CountCard
                                props={this.props}
                                label="Today Sell Amount"
                                color="rgba(255,69,70,1)"
                                count={`${numeral(totalSellAmount).format('0,0')} MMK`}
                                url={'/invoice'}
                                urlLabel={'Today Sell Amount List'}
                            />
                        </div>
                        <div className='col-md-3'>
                            <CountCard
                                props={this.props}
                                label="Total Quantity"
                                color="rgba(255,69,70,1)"
                                count={qty ? qty: 0}
                                url={'/inventory'}
                                urlLabel={'Quantity'}
                            />
                        </div>
                    </div>
                    <div className='row mt-3'>
                        <div className='col-md-6'>
                            <WeeklyTable
                            title='Weekly Table' 
                            dataSource={qty}
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