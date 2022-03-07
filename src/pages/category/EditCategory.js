import React,{ Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Navigation } from '../../components/general/Navigation';
import { categoryDetail } from '../../services/category.service';
import { setOpenToastAction } from '../../redux/actions/toast.action'
import { BsArrowLeftCircle } from 'react-icons/bs';
import { EditCategoryComponent } from '../../components/category/EditCategoryComponent';
import { CategoryDetailItemListTableComponent } from '../../components/category/CategoryDetailItemListTableComponent';
import { DeleteDialog } from '../../components/general/deleteDialog';
import { Alert } from 'react-bootstrap';
import { t, zawgyi } from '../../utilities/translation.utility';

class EditCategoryPage extends Component {

    constructor(props){
        super(props);
        this.state = {
            loading: true,
            category: null
        };
    };

    async loadingData(){
        const { id } = this.props.match.params;

        const response = await categoryDetail(id);

        if(response && response.success === false){
            this.props.openToast(t('toast-category'), response.message, 'danger');
            this.setState({
                loading: false
            })
            return;
        }

        this.setState({
            loading: false,
            category: response
        });
    };

    async componentDidMount(){
        await this.loadingData();
    }

    render(){
        const { category, loading } = this.state;
        const { history } = this.props;
        const { delModal, lang } = this.props.reducer;
        return(
            <>
                <Navigation props={this.props} />

                <div className='container-fluid'>
                    <div className='row mt-1'>
                        <div className='col-md-12 d-md-flex flex-md-row justify-content-between align-items-center'>
                            <div className='mb-2 mt-2'>
                                <BsArrowLeftCircle size={30} className="btn-icon" onClick={() => history.push('/category')} />
                            </div>
                        </div>
                    </div>

                    <div className='row mt-1'>
                        <div className='col-md-12'>
                            <Alert
                                variant="warning"
                            >
                                <Alert.Heading className={`${zawgyi(lang)}`}> {t('alert-category-delete-title')} </Alert.Heading>
                                <p className={`${zawgyi(lang)}`}> {t('alert-category-delete')} </p>
                            </Alert>
                        </div>
                    </div>

                    {!loading && (
                            <div className='row mt-1'>
                                <div className='col-md-3'>
                                    <EditCategoryComponent props={this.props} category={category} reload={() => this.loadingData()} />
                                </div>

                                <div className='col-md-9'>
                                    <CategoryDetailItemListTableComponent props={this.props} category={category} />
                                </div>
                            </div>
                        )
                    }
                </div>

                {delModal && delModal.open === true && (
                    <DeleteDialog props={this.props} reload={async () => this.props.history.push('/category')} />           
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
)(withRouter(EditCategoryPage));

