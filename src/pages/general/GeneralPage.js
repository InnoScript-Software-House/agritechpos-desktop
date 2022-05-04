import React, { Component } from "react";
import { Button, FormControl, InputGroup, Modal } from "react-bootstrap";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { CreditDetailComponent } from "../components/credit/CreditDetailComponent";
import { CreditTableComponent } from "../components/credit/CreditTableComponent";
import { Navigation } from "../components/general/Navigation";
import { setOpenToastAction } from "../redux/actions/toast.action";
import { getCreditList, updateCredit } from "../services/credit.service";
import moment from "moment";
import { t } from 'i18next';


class GeneralSettingPage extends Component {

    constructor(props) {
        super(props);

        this.state = {

        }
    }

    render() {
        return(
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <h3> General Setting </h3>
                    </div>
                </div>
            </div>
        )
    }
}


const mapStateToProps = (state) => ({
    reducer: state,
  });
  
  const mapDispatchToProps = (dispatch) => ({

  });
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(withRouter(GeneralSettingPage));
  