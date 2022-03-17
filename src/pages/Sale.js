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
  
class SalePage extends Component {
    constructor(props){
        super(props);
        this.state = {
            customer: null,
            customers: [],
            suggestions: [],
            name: '',
            model: '',
            code: '',
            qty: '',
            price: '',
            totalQty: 0,
            discount: 0,
            pay_amount: 0,
            cartItems: [],
            total: '',
            items: [],
            payBtn: false,
            percentage: 0,
            sell_price: 0
        };
    };

    reset() {
        this.setState({
            name: '',
            model: '',
            code: '',
            qty: '',
            price: ''
        })
    }

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

    autoSearch(e) {
        const { customers } = this.state;
        const suggestionResult = customers.filter((customer) => customer.name.toLowerCase().startsWith(e.toLowerCase()));
        this.setState({
            suggestions: suggestionResult,
            customerName: e
        });
    }

    removeItem(item) {
        const { cartItems } = this.state;

        let updateItems = cartItems.filter((value) => {
            if(value.code !== item.code || value.model !== item.model) {
                return value;
            }
        });

        let total = 0;

        updateItems.map((item) => {
            total =+ item.total + total;
        });

        this.setState({
            cartItems: updateItems,
            total: total
        });
        
        return;
    }

    getSelectedItem(e) {
    }

    addCart(key) {
        if( key === 'Enter') {
            const { name, model, code, qty, price, cartItems, totalQty, percentage, sell_price } = this.state;
            const { openToast } = this.props;

            if(name === '' || model === '' || code === '') {
                openToast('Add to card', 'All fields are required', 'danger');
                return;
            }
    
            if(Number(qty) === 0 || Number(qty) < 0) {
                openToast('Add to card', 'Invalid item qty', 'danger');
                return;
            }

            const isExistItem = cartItems.filter((item) => {
                if(item.code === code) {
                    return item;
                }
            });

            if(isExistItem.length > 0) {
                openToast('Add to card', 'Item is already exist', 'danger');
                return;
            }

            if(qty > totalQty) {
                openToast('Add to card', 'Item is not enough', 'danger');
                return;
            }

            const item = {
                name: name,
                model: model,
                code: code,
                qty: qty,
                price: price,
                percentage: percentage,
                sell_price: sell_price,
                total: Number(qty) * Number(sell_price)
            }

            let addItem = cartItems;

            addItem.push(item);
    
            let total = 0;
    
            addItem.map((item) => {
                total =+ Number(item.total) + Number(total);
            });

            this.reset();
    
            this.setState({
                cartItem: addItem,
                total: total
            });
        }

        return;
    }

    getDiscount(e) {
        const { cartItems } = this.state;

        if(cartItems.length > 0) {
            this.setState({
                discount: e
            });
        }

        return;
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

    async saveInvoice() {
        const { customerAddress, customerName, customerPhone, total, discount, cartItems } = this.state;
        const { openToast } = this.props;

        const requestBody = {
            customer_name: customerName !== '' ? customerName : null,
            customer_phone: customerPhone !== '' ? customerPhone : null,
            customer_address: customerAddress !== '' ? customerAddress : null,
            customer_email : null,
            total_amount: total,
            discount: discount,
            invoice_data: cartItems,
            cash_back: 0,
        }
        const response = await createInvoice(requestBody);

        if(response && response.success === false) {
            openToast('Customer', response.message, 'danger');
            return;
        }
    }

    payNow(){
        const { history } = this.props;
        if(this.state.cartItems.length > 0){
            this.setState({
                payBtn: true
            });
            let iData = {
                invoice_id: this.state.invoice_id,
                customer_name: this.state.customerName,
                customer_phone: this.state.customerPhone,
                customer_address: this.state.customerAddress,
                bought_items: this.state.cartItems.map(e => e),
                total: this.state.total,
                discount: this.state.discount,
                netAmount: this.state.total - this.state.discount
            };
            this.props.setInvoice(iData);
            history.push('/invoiceReport');
        };
        this.setState({
            payBtn: false
        });
        return;
    }
    
    async componentDidMount(){
        await this.loadingData();
    }

    render(){
        const { customer, customers, name, model, code, qty, cartItems, items, total, price, discount, pay_amount, percentage } = this.state;

        return(
            <>
                <Navigation props={this.props} />

                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">customer
                            <Card className="mt-3">
                                <Card.Header>
                                    <Card.Title className="title">
                                        <div className="d-md-flex flex-md-row justify-content-between align-item-center">
                                            <span>  INVOICE  </span>
                                            <AutoCompleteDropDown 
                                                dataSource={customers} 
                                                inputOption={
                                                    {
                                                        type: "text",
                                                        placeholder: 'Enter Customer Name',
                                                        search_name: 'name'
                                                    }} 
                                                chooseItem={(e) => this.getCustomer(e)}
                                            />
                                        </div>
                                    </Card.Title>
                                </Card.Header>

                                <Card.Body>
                                    <div className="d-md-flex flex-column mb-3">
                                        <h3 className="mb-3"> INVOICE </h3>
                                        <CustomerComponent input={customer} retrive={(e) => this.setState({ customer: e })} />
                                    </div>  

                                    <div className="table-responsive">
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th className="cart-item-table-hash-width"> # </th>
                                                    <th className="cart-item-table-with"> Name </th>
                                                    <th className="cart-item-table-with"> Model </th>
                                                    <th className="cart-item-table-with"> Material Code </th>
                                                    <th className="cart-item-table-with"> Qty </th>
                                                    <th className="cart-item-table-with"> Price </th>
                                                    <th className="cart-item-table-with"> Total </th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {cartItems.length > 0 && cartItems.map((item, index) => {
                                                    return(
                                                        <tr key={`cart_item_id_${index}`}>
                                                            <td className="cart-item-table-hash-width"> {index + 1} </td>
                                                            <td className="cart-item-table-with"> {item.name} </td> 
                                                            <td className="cart-item-table-with"> {item.model} </td>
                                                            <td className="cart-item-table-with"> {item.code} </td>
                                                            <td className="cart-item-table-with"> {item.qty} </td>
                                                            <td className="cart-item-table-with"> {numeral(item.sell_price).format('0,0')} MMK </td>
                                                            <td className="cart-item-table-with"> 
                                                                <div className="d-md-flex flex-md-row justify-content-between align-items-center">
                                                                    <span className="me-3"> { numeral(Number(item.sell_price) * Number(item.qty)).format('0,0')} MMK</span>
                                                                    <BsTrash className="btn-icon" size={20} onClick={() => this.removeItem(item)} />
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    )
                                                })}
                                            </tbody>
                                        </table>
                                    </div>

                                    <div className="d-md-flex flex-md-row justify-content-between align-items-center mb-3">
                                        <div className="">
                                            <FormLabel> Discount </FormLabel>
                                            <InputGroup>
                                                <FormControl 
                                                    type="number"
                                                    placeholder="Discount Amount"
                                                    value={discount}
                                                    onChange={(e) => this.getDiscount(e.target.value)}
                                                />
                                            </InputGroup>
                                        </div>

                                        <div className="mt-3 mb-3">
                                                <table>
                                                    <tbody>
                                                        <tr>
                                                            <td> <h4 className="me-3"> TOTAL </h4> </td>
                                                            <td> <h4 className="me-3 ms-3"> {numeral(total).format('0,0')} </h4></td>
                                                            <td> <h4 className="ms-3"> MMK </h4> </td>
                                                        </tr>

                                                        <tr>
                                                            <td> <h4 className="me-3"> DISCOUNT </h4> </td>
                                                            <td> <h4 className="me-3 ms-3"> {numeral(discount).format('0,0')} </h4> </td>
                                                            <td> <h4 className="ms-3"> MMK </h4> </td>
                                                        </tr>

                                                        <tr>
                                                            <td> <h4 className="me-3"> NET AMOUNT </h4> </td>
                                                            <td> <h4 className="me-3 ms-3"> {numeral((total - discount)).format('0,0')} </h4> </td>
                                                            <td> <h4 className="ms-3"> MMK </h4> </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                                <div className="d-flex flex-row justify-content-end align-items-center">
                                                    <Button onClick={() => this.payNow()} disabled={this.state.payBtn}>
                                                        Pay Now
                                                    </Button>
                                                </div>
                                        </div>
                                    </div>              
                                </Card.Body>

                                <Card.Footer>
                                    <SaleVoucherInputComponent dataSource={items} />
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