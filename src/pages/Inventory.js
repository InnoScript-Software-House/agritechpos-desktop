
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { ItemListTableComponent } from '../components/items/ItemListTableComponent';
import { getItems } from '../services/item.service';
import { t } from '../utilities/translation.utility';
import { messageBoxType } from '../utilities/native.utility';

class InventoryPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            openEdit : false,
            items: [],
            totalItemPriceList: 0,
            totalItemSellList: 0,
            totalProfitList: 0,
            totalQtyList: 0,
            totalSellPriceList: 0,
            outOfStock: 0,
        }
    }

    async loadingItem() {
        const getItemData = await getItems();
        if(getItemData && getItemData.success === false) {
            window.nativeApi.messageBox.open({ title: t('network-error'), message: getItemData.message, type: messageBoxType.info});
            return;
        }

        getItemData.map((value) => {
            value.percentage = parseInt(value.percentage);
            value.price = parseInt(value.price);
            value.total_purchase = value.qty * value.price;
            value.sell_price = ((value.price * value.percentage) / 100) + value.price;
            value.total_sell_price = value.sell_price * value.qty;
            value.profit = value.sell_price - value.price;
            value.total_profit = value.profit * value.qty;
            return value;
        });

        this.setState({
            items: getItemData
        });
    }

    async componentDidMount() { 
        const { history } = this.props;

        window.nativeApi.app.navigateTo((url) => {
        	history.push(url);
        });

        await this.loadingItem();
    }
    
    render() {
        const { items, openCreateItem } = this.state;
        return(
            <>
                <div className='container-fluid'>
                    <div className='row'>
                        <div className="col-md-12">
                            <ItemListTableComponent 
                                props={this.props} 
                                dataSource={items} 
                                reload={(e) => this.loadingItem()} 
                                openCreateItem={openCreateItem} 
                                open={(e) => this.setState({
                                    openCreateItem: e
                                })}
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
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(InventoryPage));
