import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { CreditDetailComponent } from "../components/credit/CreditDetailComponent";
import { CreditTableComponent } from "../components/credit/CreditTableComponent";
import { Navigation } from "../components/general/Navigation";
import { setOpenToastAction } from "../redux/actions/toast.action";
import { getCreditList } from "../services/credit.service";

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

    async loadingData() {
        const response = await getCreditList();
        if(response && response.success === false){
            return this.props.openToast('Credit', response.message, 'danger');
        }
        this.setState({
            data: response
        });
        return response;
    }

    async componentDidMount(){
        await this.loadingData();
    }

    render(){
        const {data, creditDetail} = this.state;
        return (
            <>
            <Navigation props={this.props} />
            <div className="container-fluid mt-3">
                <div className="d-md-flex flex-md-row justify-content-between">
                    <div className="col-md-7">
                        <CreditTableComponent props={this.props} detail={e => this.getCreditDetail(e)} data={data} />
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
    openToast: (title,message,theme) => dispatch(setOpenToastAction(title,message,theme))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter (CreditPage));