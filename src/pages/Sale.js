import { remove, set } from "lodash";
import moment from "moment";
import numeral from "numeral";
import React, { Component, useState} from "react";
import { Button, Card, Dropdown, Form, FormControl, InputGroup } from "react-bootstrap";
import { BsTrash } from "react-icons/bs";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { AutoCompleteDropDown } from "../components/general/autoCompleteDropDown";
import { Navigation } from "../components/general/Navigation";
import { SaleItemListTableComponent } from "../components/sale/SaleItemListTableComponent";
import { setOpenToastAction } from "../redux/actions/toast.action";
import { categoryDetail, getCategories } from "../services/category.service";
import { getItems } from "../services/item.service";
import { t } from "../utilities/translation.utility";
  
class SalePage extends Component {
    constructor(props){
        super(props);
        this.state = {
            invoice_id: moment().unix(),
            customerName: '',
            customerAddress: '',
            customerSearch: '',
            name: '',
            model: '',
            code: '',
            qty: '',
            price: '',
            discount: 0,
            pay_amount: 0,
            cartItems: [],
            total: '',
            items: []
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

        this.setState({
            items: response
        });
    }

    autoSearch(e) {
        this.setState({
            customerSearch: e
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
        this.setState({
            name: e.eng_name,
            model: e.model,
            code: e.code,
            price: e.price
        });
    }

    addCart(key) {
        if( key === 'Enter') {
            const { name, model, code, qty, price, cartItems } = this.state;
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
                if(item.name === name || item.code === code || item.model === model) {
                    return item;
                }
            });

            if(isExistItem.length > 0) {
                openToast('Add to card', 'Item is already exist', 'danger');
                return;
            }

            const item = {
                name: name,
                model: model,
                code: code,
                qty: qty,
                price: price,
                total: Number(qty) * Number(price)
            }

            let addItem = cartItems;

            addItem.push(item);
    
            let total = 0;
    
            addItem.map((item) => {
                total =+ item.total + total;
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
    

    async componentDidMount(){
        await this.loadingData();
    }

    render(){
        const { customerSearch, customerName, customerPhone, customerAddress, name, model, code, qty, cartItems, items, total, price, discount, pay_amount } = this.state;
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
                                            <span>  INVOICE  </span>
                                            <InputGroup className="card-header-search">
                                                <FormControl 
                                                    type="text"
                                                    placeholder="Search Customer By Name"
                                                    value={customerSearch}
                                                    onChange={(e) => this.autoSearch(e.target.value)}
                                                />
                                                <Button className="btn btn-samll"> Choose Customer </Button>
                                            </InputGroup>
                                        </div>
                                    </Card.Title>
                                </Card.Header>

                                <Card.Body>
                                    <div className="d-md-flex flex-column mb-3">
                                        <h3 className="mb-3"> INVOICE </h3>

                                        <InputGroup>
                                            <FormControl 
                                                className="me-3"
                                                type="text"
                                                placeholder="Enter Customer Name"
                                                value={customerName}
                                                onChange={(e) => this.setState({
                                                    customerName: e.target.value
                                                })}
                                            />

                                            <FormControl 
                                                className="me-3"
                                                type="text"
                                                placeholder="Enter Customer Phone Number"
                                                value={customerPhone}
                                                onChange={(e) => this.setState({
                                                    customerPhone: e.target.value
                                                })}
                                            />
                                        </InputGroup>

                                        <InputGroup className="mt-3">
                                            <FormControl
                                                as={'textarea'}
                                                placeholder="Enter Customer Address"
                                                value={customerAddress}
                                                onChange={(e) => this.setState({
                                                    customerAddress: e.target.value
                                                })}
                                            />
                                        </InputGroup>
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
                                                            <td className="cart-item-table-with"> {numeral(item.price).format('0,0')} MMK </td>
                                                            <td className="cart-item-table-with"> 
                                                                <div className="d-md-flex flex-md-row justify-content-between align-items-center">
                                                                    <span className="me-3"> {numeral(item.total).format('0,0')}  MMK </span>
                                                                    <BsTrash className="btn-icon" size={20} onClick={() => this.removeItem(item)} />
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    )
                                                })}
                                            </tbody>
                                        </table>
                                    </div>

                                    <div className="d-md-flex flex-md-row justify-content-between align-items-center">
                                        <div className="">
                                            <InputGroup>
                                                <FormControl 
                                                    type="number"
                                                    placeholder="Discount Amount"
                                                    value={discount}
                                                    onChange={(e) => this.getDiscount(e.target.value)}
                                                />
                                            </InputGroup>

                                            <InputGroup>
                                                <FormControl 
                                                    type="number"
                                                    placeholder="Pay Amount"
                                                    value={pay_amount}
                                                    onChange={(e) => this.getDiscount(e.target.value)}
                                                />
                                            </InputGroup>
                                        </div>

                                        <div className="mt-3">
                                                <table>
                                                    <tbody>
                                                        <tr>
                                                            <td> <h3 className="me-3"> TOTAL </h3> </td>
                                                            <td> <h3 className="me-3 ms-3"> {numeral(total).format('0,0')} </h3></td>
                                                            <td> <h3 className="ms-3"> MMK </h3> </td>
                                                        </tr>

                                                        <tr>
                                                            <td> <h3 className="me-3"> DISCOUNT </h3> </td>
                                                            <td> <h3 className="me-3 ms-3"> {numeral(discount).format('0,0')} </h3> </td>
                                                            <td> <h3 className="ms-3"> MMK </h3> </td>
                                                        </tr>

                                                        <tr>
                                                            <td> <h3 className="me-3"> NET AMOUNT </h3> </td>
                                                            <td> <h3 className="me-3 ms-3"> {numeral((total - discount)).format('0,0')} </h3> </td>
                                                            <td> <h3 className="ms-3"> MMK </h3> </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                        </div>
                                    </div>              
                                </Card.Body>

                                <Card.Footer>
                                    <div className="d-md-flex flex-md-row align-items-start">
                                            <AutoCompleteDropDown 
                                                dataSource={items} 
                                                inputOption={
                                                    {
                                                        type: "text",
                                                        placeholder: 'Enter item code',
                                                        search_name: 'code'
                                                    }} 
                                                chooseItem={(e) => this.getSelectedItem(e)}
                                            />

                                            <InputGroup>
                                                <FormControl 
                                                    type="number" 
                                                    placeholder="qty" 
                                                    value={qty} 
                                                    onChange={(e) => this.setState({ qty: e.target.value})}
                                                    onKeyPress={(e) => this.addCart(e.code)}
                                                />

                                                <FormControl placeholder="Name" value={name} disabled={true} />
                                                <FormControl placeholder="Model" value={model} disabled={true} />
                                                <FormControl placeholder="Code" value={code} disabled={true} />
                                                <FormControl placeholder="Qty" value={qty} disabled={true} />
                                                <FormControl placeholder="Price" value={price} disabled={true} />
                                            </InputGroup>
                                    </div>
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
    openToast: (title, message, theme) => dispatch(setOpenToastAction(title, message, theme))
});


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(SalePage));