import React,{ Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Navigation } from '../../components/general/Navigation';
import { categoryDetail } from '../../services/category.service';
import { setOpenToastAction } from '../../redux/actions/toast.action'
import { BsArrowLeftCircle } from 'react-icons/bs';
import { EditCategoryComponent } from '../../components/items/EditCategoryComponent';

class EditCategoryPage extends Component {

    constructor(props){
        super(props);
        this.state = {
            is_loading: true,
            category: null
        };
    };

    httpHandler (response) {
        if(response && response.success === false){
            this.props.openToast('Edit Category', response.message, 'danger');
            return
        }
        return this.props.openToast('Edit Category', 'Category Update Successful', 'success');
    }

    async loadingData(){
        const { id } = this.props.match.params;
        const response = await categoryDetail(id);
        this.httpHandler(response);

        this.setState({
            is_loading: false,
            category: response
        });
    };

    async componentDidMount(){
        await this.loadingData();
    }


    render(){
        const { category, is_loading } = this.state;
        const { history } = this.props;
        return(
            <>
            <Navigation props={this.props} />
            <div className='container-fluid'>
                <div className='row mt-1'>
                    <div className='col-md-12 d-md-flex flex-md-row justify-content-between align-items-center'>
                        <div className='mb-2 mt-2'>
                            <BsArrowLeftCircle size={30} className="btn-icon" onClick={() => history.push('/categoryList')} />
                        </div>
                    </div>
                </div>
                {
                    !is_loading && (
                        <div className='row mt-1'>
                            <div className='col-md-4'>
                                <EditCategoryComponent props={this.props} category={category} reload={() => this.loadingData()} />
                            </div>
                        </div>
                    )
                }
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
)(withRouter(EditCategoryPage));

