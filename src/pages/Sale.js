import React, { Component} from "react";
import {  Card } from "react-bootstrap";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Navigation } from "../components/general/Navigation";
import { setOpenToastAction } from "../redux/actions/toast.action";
import { getCustomerList } from "../services/customer.service";
import { getItems } from "../services/item.service";
import { setInvoiceAction } from "../redux/actions/invoice.action";
import { CustomerComponent } from "../components/sale/customerComponent";
import { SaleVoucherInputComponent } from "../components/sale/saleVoucherInputComponent";
import { SaleVoucherComponent } from "../components/sale/saleVocherComponent";
import { t, zawgyi } from "../utilities/translation.utility";
import { RecentInvoice } from "../components/sale/RecentInvoice";
  
class SalePage extends Component {
    constructor(props){
        super(props);
        this.state = {
            customer: null,
            customers: [],
            suggestions: [],
            requestItems: [],
            totalAmount: {
                sell: 0,
                buy: 0
            },
            saveInvoice: null
        };
    };

    async loadingData() {
        const { openToast } = this.props;
        const response = await getItems();

        if(response && response.success === false) {
            openToast('Add to card', response.message, 'danger');
            return;
        }
        
        const customers = await getCustomerList();
        if(customers && customers.success === false) {
            openToast('Customer', customers.message, 'danger');
            return;
        }

        this.setState({
            items: response,
            customers: customers
        });
    }

    addItem(item) {
        const { requestItems } = this.state;
        const existItem = requestItems.filter(value => value.code === item.code);

        if(existItem.length > 0) {
            return;
        }

        const updateItems = requestItems;
        updateItems.push(item);

        let totalSellAmount = 0;
        let totalPriceAmount = 0;

        updateItems.map((value) => {
            totalSellAmount += value.totalAmount
            totalPriceAmount += value.totalOriginAmount
        });

        this.setState({
            requestItems: updateItems,
            totalAmount: {
                sell: totalSellAmount,
                buy: totalPriceAmount
            }
        });

        return;
    }

    updateItem(e) {
        const updateItems = e;

        let totalSellAmount = 0;
        let totalPriceAmount = 0;

        updateItems.map((value) => {
            totalSellAmount += value.totalAmount
            totalPriceAmount += value.totalOriginAmount
        });

        this.setState({
            requestItems: updateItems,
            totalAmount: {
                sell: totalSellAmount,
                buy: totalPriceAmount
            }
        });
    }

    getCustomer(e) {
        const customer = {
            name: e.name,
            phone: e.phone,
            email: e.email,
            address: e.address
        }
        this.setState({ customer: customer });
    }

    getSaveInvoice(e) {
        this.setState({
            saveInvoice: e
        })
    }
    
    async componentDidMount(){
        await this.loadingData();
    }

    render(){
        const { customer, customers, items, requestItems, totalAmount, saveInvoice } = this.state;
        const { lang } = this.props.reducer;

        return(
            <>
                <Navigation props={this.props} />

                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-3 mt-3">
                            <RecentInvoice dataSource={saveInvoice} retrive={(e) => {
                                this.setState({
                                    requestItems: []
                                }, () => {
                                    for(let x=0; x<e.bought_items.length; x++) {
                                        this.addItem(e.bought_items[x]);
                                    }
                                });
                            }} />
                        </div>

                        <div className="col-md-9">
                            <Card className="mt-3">
                                <Card.Header>
                                    <Card.Title className={`${zawgyi(lang)} title`}>
                                        {t('open-invoice')}
                                    </Card.Title>
                                </Card.Header>

                                <Card.Body>
                                    <div className="d-md-flex flex-column mb-3">
                                        <h3 className={`${zawgyi(lang)} mt-3 mb-3`}> {t('invoice-label')} </h3>
                                        <CustomerComponent className="mt-3" input={customer} retrive={(e) => this.setState({ customer: e })} />
                                    </div>  

                                    <SaleVoucherComponent 
                                        dataSource={requestItems} 
                                        total={totalAmount} 
                                        retrive={(e) => {this.updateItem(e)}} 
                                        getcustomer={this.state.customer} 
                                        save={(e) => this.getSaveInvoice(e)}
                                    />
                                </Card.Body>

                                <Card.Footer>
                                    <SaleVoucherInputComponent dataSource={items} retrive={e => { this.addItem(e)}} />
                                </Card.Footer>
                            </Card>
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
    setInvoice: (data) => dispatch(setInvoiceAction(data))
});


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(SalePage));