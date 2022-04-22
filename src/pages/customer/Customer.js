import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Navigation } from '../../components/general/Navigation';
import { CustomerListTableComponent } from '../../components/customer/CustomerListTableComponent';
import { getInvoice } from '../../services/invoice.service';
import { getCustomerList } from '../../services/customer.service';

class CustomerPage extends Component {
 
    constructor(props) {
        super(props);
        this.state = {
            openEdit: false,
            customerLists: []
        }
    };


    async loadingData() {
        const { openToast } = this.props; 
        const response = await getCustomerList();

        if(response && response.success === false) {
            openToast('Customer', response.message, 'danger');
            return;
        }

        this.setState({
            customerLists: response
        });

        return;
    }

    async componentDidMount() {
        const {history} = this.props;
        await this.loadingData();
        nativeApi.app.navigateTo((url) => {
        	history.push(url);
        });
    }
 
    render() {

        const { customerLists } = this.state;

        return (
        <>
            {/* <Navigation props={this.props} /> */}

            <div className='container-fluid'>
                <div className='row'>
                    {/* <div className='col-md-12'>
                        <div className='d-md-flex flex-md-row justify-content-start align-items-center'>
                            <Button className='btn-small mt-3 me-3'
                            onClick={() => this.setState({
                                openCreateItem: !openCreateItem
                            })}
                            >
                            {openCreateItem ? (<BsEyeSlash size={20}/>) : <BsEye size={20}/>}
                            <span className='me-3'> {openCreateItem ? 'Hide Create Item Form' : 'Show Create Item Form'}</span>
                            </Button>
                        </div>
                    </div> */}
                </div>
                <div className='row'>
                    {/* {openCreateItem && (
                        <div className='col-md-2'>
                            <CustomerCreateComponent
                                reload={(e) => {
                                    if(e === true) {
                                        this.loadingData();
                                    }
                                }}
                            />
                        </div>
                    )} */}
                    <div className='col-md-12'>
                        <CustomerListTableComponent 
                            props={this.props}
                            dataSource={customerLists}
                            reload={(e) => this.loadingData()}
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
    openToast: (title, message, theme) => dispatch(setOpenToastAction(title, message, theme))
});


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(CustomerPage));