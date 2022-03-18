import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { CreditDetailComponent } from "../components/credit/CreditDetailComponent";
import { CreditTableComponent } from "../components/credit/CreditTableComponent";
import { Navigation } from "../components/general/Navigation";

const columns = ['#', 'Credit ID', 'Invoice ID', 'Customer Name', 'Credit Amount', 'Repayment', 'Amount Left'];

class CreditPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: [],
            creditDetail: null
        }
    };

    getCreditDetail(e){
        this.setState({
            creditDetail: e
        });
    }

    render(){
        const {data, creditDetail} = this.state;
        return (
            <>
            <Navigation props={this.props} />
            <div className="container-fluid mt-3">
                <div className="d-md-flex flex-md-row justify-content-between">
                    <div className="col-md-7">
                        <CreditTableComponent props={this.props} detail={e => this.getCreditDetail(e)} />
                    </div>
                    <div className="col-md-5">
                        <CreditDetailComponent props={this.props} creditDetail={creditDetail}/>
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

});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter (CreditPage));