import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { BsEye, BsEyeSlash, BsListTask, BsPlusCircle } from "react-icons/bs";
import { Navigation } from "../components/general/Navigation";
import { getCategories } from '../services/category.service';
import { CategoryListTableComponent } from '../components/items/CategoryListTableComponent';
import { CreateCategoryComponent2 } from '../components/items/CreateCategory2';
import { DeleteDialog } from '../components/general/deleteDialog';

class CategoryListPage extends Component{
    constructor(props){
        super(props);
        this.state = {
        categoryList: [],
        openCreateCategory: false,
        };
    };

    httpHandler (response) {
        if(response && response.success === false) {
            this.setState({
                error: response.message
            });
            return;
        }
    }

    async loadingData() {
            const categories = await getCategories();
            this.httpHandler(categories);
            this.setState({
                categoryList: categories
            });
            console.log(this.state.categoryList);
            return;
    }

    async componentDidMount() { 
        await this.loadingData();
    }

    
    render() {
        const { categoryList, openCreateCategory } = this.state;
        const { delModal, lang } = this.props.reducer;
        return( 
            <>
            <Navigation props={this.props} />

            <div className='container-fluid'>
                <div className='row'>
                     <div className='col-md-12'>
                        <Button 
                        className='btn-small mt-3 me-3' 
                        onClick={() => this.setState({
                        openCreateCategory: !openCreateCategory
                        })}
                        >
                        <BsPlusCircle size={20} />
                        <span className='me-3'> Create Category </span>
                         </Button>
                    </div>
                </div>
                <div className='row'>
                { openCreateCategory && (
                    <div className='col-md-3 mt-3'>
                            <CreateCategoryComponent2 
                            props={this.props} 
                            reload={() => this.loadingData()}
                    />
                    </div>
                        )}
                     <div className={openCreateCategory ? 'col-md-9' : 'col-md-12'}>
                     <CategoryListTableComponent props={this.props} dataSource={categoryList}/>
                    </div>
                </div>
            </div>
            {
                delModal && delModal.open === true && (
                    <DeleteDialog props={this.props} reload={async () => await this.loadingData()} />
                )
            }
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
)(withRouter(CategoryListPage));