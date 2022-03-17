import moment from "moment";
import numeral from "numeral";
import React, { Component} from "react";
import { Button, Card, FormControl, FormLabel, InputGroup } from "react-bootstrap";
import { BsTrash } from "react-icons/bs";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { AutoCompleteDropDown } from "../components/general/autoCompleteDropDown";
import { Navigation } from "../components/general/Navigation";
import { setOpenToastAction } from "../redux/actions/toast.action";
import { getCustomerList } from "../services/customer.service";
import { createInvoice } from "../services/invoice.service";
import { getItems } from "../services/item.service";
import { setInvoiceAction } from "../redux/actions/invoice.action";
import { CustomerComponent } from "../components/sale/customerComponent";
import { SaleVoucherInputComponent } from "../components/sale/saleVoucherInputComponent";
import { SaleVoucherComponent } from "../components/sale/saleVocherComponent";
import { Language } from "../components/general/Language";
import { t, zawgyi } from "../utilities/translation.utility";
  
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
            }
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

    // async saveInvoice() {
    //     const { customerAddress, customerName, customerPhone, total, discount, cartItems } = this.state;
    //     const { openToast } = this.props;

    //     const requestBody = {
    //         customer_name: customerName !== '' ? customerName : null,
    //         customer_phone: customerPhone !== '' ? customerPhone : null,
    //         customer_address: customerAddress !== '' ? customerAddress : null,
    //         customer_email : null,
    //         total_amount: total,
    //         discount: discount,
    //         invoice_data: cartItems,
    //         cash_back: 0,
    //     }
    //     const response = await createInvoice(requestBody);

    //     if(response && response.success === false) {
    //         openToast('Customer', response.message, 'danger');
    //         return;
    //     }
    // }

    // payNow(){
    //     const { history } = this.props;
    //     if(this.state.cartItems.length > 0){
    //         this.setState({
    //             payBtn: true
    //         });
    //         let iData = {
    //             invoice_id: this.state.invoice_id,
    //             customer_name: this.state.customerName,
    //             customer_phone: this.state.customerPhone,
    //             customer_address: this.state.customerAddress,
    //             bought_items: this.state.cartItems.map(e => e),
    //             total: this.state.total,
    //             discount: this.state.discount,
    //             netAmount: this.state.total - this.state.discount
    //         };
    //         this.props.setInvoice(iData);
    //         history.push('/invoiceReport');
    //     };
    //     this.setState({
    //         payBtn: false
    //     });
    //     return;
    // }
    
    async componentDidMount(){
        await this.loadingData();
    }

    render(){
        const { customer, customers, items, requestItems, totalAmount } = this.state;
        const { lang } = this.props.reducer;

        return(
            <>
                <Navigation props={this.props} />

                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <Card className="mt-3">
                                <Card.Header>
                                    <Card.Title className="title">
                                        <div className="d-md-flex flex-md-row justify-content-between align-item-center">
                                            <AutoCompleteDropDown 
                                                dataSource={customers} 
                                                inputOption={
                                                    {
                                                        type: "text",
                                                        placeholder: t('input-customer-name-search'),
                                                        search_name: 'name'
                                                    }} 
                                                chooseItem={(e) => this.getCustomer(e)}
                                            />

                                            <Language props={this.props} />
                                        </div>
                                    </Card.Title>
                                </Card.Header>

                                <Card.Body>
                                    <div className="d-md-flex flex-column mb-3">
                                        <h3 className={`${zawgyi(lang)} mt-3`}> {t('invoice')} </h3>
                                        <CustomerComponent className="mt-3" input={customer} retrive={(e) => this.setState({ customer: e })} />
                                    </div>  

                                    <SaleVoucherComponent dataSource={requestItems} total={totalAmount} retrive={(e) => {this.updateItem(e)}} />
              
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