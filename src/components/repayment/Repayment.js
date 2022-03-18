import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Navigation } from "../general/Navigation";

class RepaymentPage extends Component {
    constructor(props){
        super(props);
        
    };

    loadingData(){
        const {id} = this.props.match.params;
        console.log(id);
    }

    componentDidMount(){
        this.loadingData();
    }

    render(){
        return(
            <>
            <Navigation props={this.props} />
            
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    reducer: state
})

const mapDispatchToProps = (dispatch) => ({

})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(RepaymentPage));
