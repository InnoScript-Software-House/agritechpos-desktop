
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { ItemCreateComponent } from '../components/items/ItemCreateComponent';
import { ItemListTableComponent } from '../components/items/ItemListTableComponent';
import { getItems } from '../services/item.service';
import { DeleteDialog } from '../components/general/deleteDialog';
import { setOpenToastAction } from '../redux/actions/toast.action';
import { t } from '../utilities/translation.utility';
import { messageBoxType } from '../utilities/native.utility';

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
        const { delModal } = this.props.reducer;
        const { categories, items, openCreateItem , totalItemPriceList, totalProfitList , totalQtyList, totalSellPriceList, outOfStock} = this.state;
        const { history } = this.props;

        return(
            <>
                <div className='container-fluid'>
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
