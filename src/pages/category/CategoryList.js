import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { BsArrowLeftCircle } from "react-icons/bs";
import { Navigation } from "../../components/general/Navigation";
import { getCategories } from '../../services/category.service';
import { CategoryListTableComponent } from '../../components/category/CategoryListTableComponent';
import { t } from '../../utilities/translation.utility';
import { setOpenToastAction } from '../../redux/actions/toast.action';
import { CreateCategoryComponent } from '../../components/category/CreateCategoryComponent';

class CategoryListPage extends Component{
    constructor(props){
        super(props);
        this.state = {
            categoryList: [],
            loading: false
        };
    };

    async loadingData() {
        const { setToast } = this.props;

        const response = await getCategories();

        if(response && response.success === false) {
            setToast(t('toast-category'), response.message, 'danger');
            return;
        }

        this.setState({
            categoryList: response
        });
        return;
    }

    async componentDidMount() { 
        this.setState({
            loading: true
        });

        await this.loadingData();

        this.setState({
            loading: false
        });
    }

    
    render() {
        const { categoryList } = this.state;
        const { history } = this.props;

        return( 
            <>
                <Navigation props={this.props} />

                <div className='container-fluid'>
                    <div className='row mt-1'>
                        <div className='col-md-12 d-md-flex flex-md-row justify-content-between align-items-center'>
                            <div className='mb-2 mt-2'>
                                <BsArrowLeftCircle size={30} className="btn-icon" onClick={() => history.push('/inventory')} />
                            </div>
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col-md-3'>
                            <CreateCategoryComponent props={this.props} reload={() => this.loadingData()} />
                        </div>

                        <div className='col-md-9'>
                            <CategoryListTableComponent props={this.props} dataSource={categoryList} />
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
    setToast: (title, message, status) => dispatch(setOpenToastAction(title, message, status))
});
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(CategoryListPage));