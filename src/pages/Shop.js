import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Navigation } from '../components/general/Navigation';

class ShopPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            is_loading: true
        }
    }

    render() {
        const { lang } = this.props.reducer;

        return(
            <>
                <Navigation props={this.props} />

                <h3> Shop Info Page </h3>
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
)(withRouter(ShopPage));