import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Navigation } from '../../components/general/Navigation';
import { EditItemComponent } from '../../components/items/EditItemComponent';
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
        return (
            <>
                <Navigation props={this.props} />

                <div className='container-fluid'>
                    {!is_loading && (
                        <div className='row mt-3'>
                            <div className='col-md-2'>
                                <EditItemComponent props={this.props} item={item} />
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
