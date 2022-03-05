import React, { Component} from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Navigation } from "../components/general/Navigation";
import { SaleTableComponent } from "../components/sale/saleTable" ;
import { getItems } from "../services/item.service";
import { getCategories } from "../services/category.service";
import { setOpenToastAction } from "../redux/actions/toast.action";

class SalePage extends Component {
    constructor(props){
        super(props);
        this.state = {
            itemsList: [],
            categoriesList: []
        };
    };

    httpHandler(response){
        if(response && response.success === false){
            this.props.openToast('Sale', response.message, 'danger');
        }
        return response;
    }

    async loadingData(){
        const items = await getItems();
        this.httpHandler(items);
        const categories = await getCategories();
        this.httpHandler(categories);
        this.setState({
            itemsList: items,
            categoriesList: categories
        })
        return;
    }
    async componentDidMount(){
        await this.loadingData();
    }



    render(){
        const { itemsList, categoriesList } = this.state;
        return(
            <>
            <Navigation props={this.props} />
                <div>
                    <SaleTableComponent props={this.props} itemsData={itemsList} categoriesData={categoriesList} />
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