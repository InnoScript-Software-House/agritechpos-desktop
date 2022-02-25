
import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { BsPlusCircle } from "react-icons/bs";
import { Navigation } from '../components/general/Navigation';
import { ItemCreateComponent } from '../components/items/ItemCreateComponent';
import { CreateCategoryComponent } from '../components/items/CreateCategoryComponent';
import { getCategories } from '../services/category.service';
import { ItemListTableComponent } from '../components/items/ItemListTableComponent';
import { getItems } from '../services/item.service';
import { CategoryChartComponent } from '../components/charts/categoryChart';
import { ItemActiveChartComponent } from '../components/charts/itemsActiveChart';
import { ItemsChart } from '../utilities/items.chart';

class InventoryPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            openEdit : false,
            categories: [],
            items: [],
        }
    }

    httpHandler (response) {
        if(response && response.success === false) {
            this.setState({
                error: response.message
            });
            return;
        }
    }

    async loadingData(type) {
        if(type === 'category') {
            const categories = await getCategories();
            this.httpHandler(categories);
            this.setState({
                categories: categories
            });
            return;
        }

        if(type === 'item') {
            const items = await getItems();
            this.httpHandler(items);
            
            let itemList = [];

            items.map((item) => {
                let updateItem = item;

                if(item.category) {
                    updateItem.category_title = item.category.name;
                    updateItem.category_id = item.category.id;
                } else {
                    updateItem.category_title = 'Unknown Category';
                    updateItem.category_id = null;
                }

                updateItem.total = item.price * item.qty;
                updateItem.editable = false;

                itemList.push(updateItem);
            });

            this.setState({
                items: itemList
            });
            
            return;
        }
    }

    async componentDidMount() { 
        await this.loadingData('category');
        await this.loadingData('item');
    }
    

    render() {
        const { lang } = this.props.reducer;
        const { openEdit, categories, items } = this.state;
        return(
            <>
                <Navigation props={this.props} />

                <CreateCategoryComponent 
                    props={this.props} 
                    open={openEdit} 
                    handler={(e) => this.setState({ 
                        openEdit: e
                    })}
                    reload={() => this.loadingData('category')}
                />

                <div className='container-fluid'>
                    <div className='row'>
                        <div className='col-md-12'>
                            <div className='d-md-flex flex-row justify-content-start align-items-center'>
                                <Button 
                                    className='btn-small mt-3' 
                                    onClick={() => this.setState({
                                        openEdit: true
                                    })}
                                >
                                    <BsPlusCircle size={20} />
                                    <span className='me-3'> Create Category </span>
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col-md-2'>
                            <ItemCreateComponent 
                                props={this.props} 
                                categoriesList={categories}
                                reload={() => this.loadingData('item')}
                            />
                        </div>

                        <div className='col-md-10'>
                            <ItemListTableComponent props={this.props} dataSource={items} />

                            <div className='row  mt-3'>
                                <div className='col-md-3'>
                                    <CategoryChartComponent props={this.props} dataSource={items} />
                                </div>

                                <div className='col-md-3'>
                                    <ItemActiveChartComponent props={this.props} dataSource={items} />
                                </div>

                                <div className='col-md-3'>
                                    <ItemsChart props={this.props} dataSource={items.map(e => e.category_title)} />
                                </div>
                            </div>
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
