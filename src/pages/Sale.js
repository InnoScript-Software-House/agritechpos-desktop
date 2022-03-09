import { remove, set } from "lodash";
import moment from "moment";
import numeral from "numeral";
import React, { Component} from "react";
import { Button, Card, FormControl, InputGroup } from "react-bootstrap";
import { BsTrash } from "react-icons/bs";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
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
            qty: 0,
            cartItems: [],
            total: 0
        };
    };

    async loadingData() {
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

    itemSearch(e, type) {
    }

    addCart() {
        const {name, model, code, qty, cartItems } = this.state;
        if(name === '' || model === '' || code === '' || qty === '') {
            return;
        }
        
        const price = 3000;

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

        this.setState({
            cartItem: addItem,
            total: total
        });
    }
    

    async componentDidMount(){
        await this.loadingData();
    }

    render(){
        const { customerSearch, customerName, customerPhone, customerAddress, name, model, code, qty, cartItems, total } = this.state;
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
                                                            <td className="cart-item-table-with"> {numeral(item.price).format('0,0')} </td>
                                                            <td className="cart-item-table-with"> 
                                                                <span className="me-3"> {numeral(item.total).format('0,0')}  </span>
                                                                <BsTrash className="btn-icon" size={20} onClick={() => this.removeItem(item)} />
                                                            </td>
                                                        </tr>
                                                    )
                                                })}
                                                <tr>
                                                    <td className="cart-item-table-hash-width"> # </td>
                                                    <td className="cart-item-table-with"> 
                                                        <InputGroup>
                                                            <FormControl 
                                                                type="text"
                                                                placeholder="Search Item Name"
                                                                value={name}
                                                                onChange={(e) => this.setState({ name: e.target.value})}
                                                            />
                                                        </InputGroup>
                                                    </td>

                                                    <td className="cart-item-table-with"> 
                                                        <InputGroup>
                                                            <FormControl 
                                                                type="text"
                                                                placeholder="Search Item Model"
                                                                value={model}
                                                                onChange={(e) => this.setState({ model: e.target.value})}
                                                            />
                                                        </InputGroup>
                                                    </td>

                                                    <td className="cart-item-table-with"> 
                                                        <InputGroup>
                                                            <FormControl 
                                                                type="text"
                                                                placeholder="Search Item code"
                                                                value={code}
                                                                onChange={(e) => this.setState({ code: e.target.value})}
                                                            />
                                                        </InputGroup>
                                                    </td>

                                                    <td className="cart-item-table-with"> 
                                                        <InputGroup>
                                                            <FormControl 
                                                                type="text"
                                                                placeholder="Qty"
                                                                value={qty}
                                                                onChange={(e) => this.setState({ qty: e.target.value})}
                                                            />
                                                        </InputGroup>
                                                    </td>

                                                    <td colSpan="2" className="cart-item-table-with">
                                                        <Button 
                                                            className="btn btn-small"
                                                            onClick={() => this.addCart()}
                                                        > Add Item 
                                                        </Button>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </Card.Body>

                                <Card.Footer>
                                    <h3> Total - {numeral(total).format('0,0')} </h3>
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