import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { BsArrowLeftCircle } from 'react-icons/bs';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Navigation } from '../../components/general/Navigation';
import { EditItemComponent } from '../../components/items/EditItemComponent';
import { EditItemSellPriceComponent } from '../../components/items/EditItemSellPriceComponent';
import { itemDetail } from '../../services/item.service';

class EditItemPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            is_loading: true,
            item: null
        }
    }

    httpHandler (response) {
        if(response && response.success === false) {
            this.setState({
                error: response.message,
                is_loading: false
            });
            return;
        }
    }

    async loadingData() {
        const { id } = this.props.match.params;

        const response = await itemDetail(id);
        this.httpHandler(response);

        this.setState({
            is_loading: false,
            item: response
        });
    }

    async componentDidMount() {
        await this.loadingData();
    }

    render() {
        const { item, is_loading } = this.state;
        const { history } = this.props;

        return (
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

                    {!is_loading && (
                        <div className='row mt-1'>
                            <div className='col-md-2'>
                                <EditItemComponent props={this.props} item={item} reload={() => this.loadingData()} />
                            </div>

                            <div className='col-md-4'> 
                                <EditItemSellPriceComponent props={this.props} item={item} reload={() => this.loadingData()} />
                            </div>
                        </div>
                    )}
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
)(withRouter(EditItemPage));
