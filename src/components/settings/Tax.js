import React, { Component } from 'react'
import { connect, useSelector } from 'react-redux';
import {withRouter} from 'react-router-dom';
import { taxAction } from '../../redux/actions/tax.action';

class TaxComponent extends Component {

    constructor(props) {
        super(props);
    }

    async loadingData () {
        const { changeTax } = this.props;

        changeTax('amount')
    }

    async componentDidMount() {
        const { history } = this.props;
        nativeApi.app.navigateTo(url => {
            history.push(url);
        });
        await this.loadingData()
    }
    render() {
        return (
            <div> Tax</div >
        )
    }
}

const mapStateToProps = state => ({
	reducer: state
});

const mapDispatchToProps = dispatch => ({
    changeTax: ( tax )=>dispatch(taxAction(tax))
});
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(TaxComponent))