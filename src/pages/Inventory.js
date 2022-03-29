
import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { BsEye, BsEyeSlash, BsListTask } from "react-icons/bs";
import { Navigation } from '../components/general/Navigation';
import { ItemCreateComponent } from '../components/items/ItemCreateComponent';
import { getCategories } from '../services/category.service';
import { ItemListTableComponent } from '../components/items/ItemListTableComponent';
import { getItems } from '../services/item.service';
import { DeleteDialog } from '../components/general/deleteDialog';
import { setOpenToastAction } from '../redux/actions/toast.action';
import { CountCard } from '../components/general/CountCard';
import numeral from 'numeral';

class InventoryPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            openEdit : false,
            categories: [],
            items: [],
            totalItemPriceList: 0,
            totalItemSellList: 0,
            totalProfitList: 0,
            totalQtyList: 0,
            totalSellPriceList: 0,
            outOfStock: 0,
        }
    }
    
    async loadingData(type) {
        const { openToast } = this.props;

        if(type === 'category') {
            const categories = await getCategories();
            if(categories && categories.success === false) {
                openToast('Category List', categories.message, 'danger');
                return;
            }
            
            this.setState({ categories: categories });
            return;
        }

        if(type === 'item') {
            const items = await getItems();
            if(items && items.success === false) {
                openToast('Item List', items.message, 'danger');
                return;
            }
            
            let itemList = [];

            items.map((item) => {
                let updateItem = item;
                updateItem.category_title = item.category ? item.category.name : null;
                updateItem.total = Number(item.price) * Number(item.qty);
                updateItem.sell_price = (Number(item.price) * Number(item.percentage)) / 100;
                itemList.push(updateItem);
            });

            const priceTotalList = items.map(e => Number(e.total))
            const totalPrice = priceTotalList.reduce((a , b) => a + b , 0)

            const sellPrice = items.map( e => e = (Number(e.price) + Number(e.sell_price)) * Number(e.qty));
            const sellPriceList = sellPrice.reduce((a, b) => a + b ,0)

            const profitTotal = Number(sellPriceList) - Number(totalPrice);

            const totalItemQty = items.map(e => Number(e.qty) )
            const totalQty = totalItemQty.reduce((a , b) => a + b , 0);

            const getZeroQty = items.map(e => Number(e.qty) === 0);

            this.setState({ 
                items: itemList,
                totalItemPriceList: numeral(totalPrice).format('0,0') + ' MMK',
                totalSellPriceList: numeral(sellPriceList).format('0,0') + ' MMK',
                totalProfitList: numeral(profitTotal).format('0,0') + ' MMK',
                totalQtyList: numeral(totalQty).format('0,0') + ' Items',
                outOfStock: numeral(getZeroQty.reduce((a,b) => a+b, 0)).format('0,0') + ' Items'
            });
            return;
        }
    }

    async componentDidMount() { 
        await this.loadingData('category');
        await this.loadingData('item');
    }
    

    render() {
        const { delModal } = this.props.reducer;
        const { categories, items, openCreateItem , totalItemPriceList, totalProfitList , totalQtyList, totalSellPriceList, outOfStock} = this.state;
        const { history } = this.props;

        return(
            <>
                <Navigation props={this.props} />

                <div className='container-fluid'>
                    <div className='row justify-content-start mt-3'>
                        <div className='col-3'>
                            <CountCard props={this.props} label="Total Amount" color="rgb(255, 218, 108, 1)" count={totalItemPriceList} />
                        </div>

                        <div className='col-3'>
                            <CountCard  props={this.props} label="Total Sell Amount" color="rgb(108, 147, 39, 1)" count={totalSellPriceList} />
                        </div>

                        <div className='col-3'>
                            <CountCard props={this.props} label="Total Qty" color="rgb(23, 162, 184,1)" count={totalQtyList} />
                        </div>

                        <div className='col-3'>
                            <CountCard props={this.props} label="Profit" color="rgba(114, 196, 84,1)" count={totalProfitList} />
                        </div>
                    </div>

                    <div className='row justify-content-start mt-3'>
                        <div className='col-3'>
                            <CountCard props={this.props} label="Out Of Stock" color="rgba(229, 64, 64,1)" count={outOfStock} />
                        </div>
                    </div>

                    <div className='row'>
                        { openCreateItem && (
                        <div className='col-md-2'>
                            <ItemCreateComponent 
                                props={this.props} 
                                categoriesList={categories}
                                reload={() => this.loadingData('item')}
                            />
                        </div>
                        )}

                        <div className={openCreateItem ? 'col-md-10' : 'col-md-12'}>
                            <ItemListTableComponent 
                                props={this.props} 
                                dataSource={items} 
                                reload={(e) => this.loadingData('item')} 
                                openCreateItem={openCreateItem} 
                                open={(e) => this.setState({
                                    openCreateItem: e
                                })}
                            />
                        </div>
                    </div>
                </div>

                {delModal && delModal.open === true && (
                    <DeleteDialog props={this.props} reload={async () => await this.loadingData('item')} />           
                )}
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
)(withRouter(InventoryPage));
