import { set } from "lodash";
import numeral from "numeral";
import React, { Component} from "react";
import { Button, Card } from "react-bootstrap";
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
            items: [],
            categories: [],
            filter: 'All',
            loading: true,
            preCart: [],
            totalAmount: 0,
            removeItem: null
        };
    };

    async loadingData() {
        const { openToast } = this.props.reducer;

        const categories = await getCategories();

        if(categories && categories.success === false) {
            openToast(t('toast-sell'), categories.message, 'danger');
            this.setState({
                loading: false
            })
            return;
        }

        let mergeItems = [];

        mergeItems = categories.flatMap((category) => {
            return category.items;
        });

        this.setState({
            items: mergeItems,
            categories: categories,
            loading: false
        });
    }

    async componentDidMount(){
        await this.loadingData();
    }

    getPreCart(e) {
        this.setState({
            preCart: e
        });
    }

    payNow() {

    }
    render(){
        const { items, categories, preCart, totalAmount } = this.state;
        return(
            <>
                <Navigation props={this.props} />

                <div className="container-fluid">
                    <div className="row mt-3">
                        <div className="col-md-4">
                            <Card>
                                <Card.Header>
                                   <Card.Title> {t('sell-cart')} </Card.Title>
                                </Card.Header>

                                <Card.Body>
                                   <table>
                                       <thead className="mb-3">
                                       <tr>
                                           <th className="cart-table-with"> Name </th>
                                           <th className="cart-table-with"> Model </th>
                                           <th className="cart-table-with"> Qty </th>
                                           <th className="cart-table-with"> Price </th>
                                           <th className="cart-table-with"> Total </th>
                                           <th className="cart-table-with"> Remove </th>
                                       </tr>
                                       </thead>

                                        <tbody className="mt-3">
                                        {preCart.length > 0 && preCart.map((item, index) => {
                                            return(
                                                <tr key={`cart_item_ids_${index}`}>
                                                    <td className="cart-table-with"> {item.name}</td>
                                                    <td className="cart-table-with"> {item.model} </td>
                                                    <td className="cart-table-with"> {item.qty} </td>
                                                    <td className="cart-table-with"> {numeral(item.price).format('0,0')} </td> 
                                                    <td className="cart-table-with"> {numeral(item.total).format('0,0')} </td>
                                                    <td>
                                                        <BsTrash size={20} className="btn-icon" onClick={() => this.setState({
                                                            removeItem: item
                                                        })} />
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                        </tbody>
                                   </table>
                                </Card.Body>

                                <Card.Footer>
                                    <Button className="btn btn-small" onClick={() => this.payNow()}> Pay Now </Button>
                                </Card.Footer>
                            </Card>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <SaleItemListTableComponent props={this.props} items={items} categories={categories} preCart={(e) => this.getPreCart(e)} remove={this.state.removeItem} />
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