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

const columns = [
  "#",
  "Credit ID",
  "Invoice ID",
  "Customer Name",
  "Credit Amount",
  "Repayment",
  "Amount Left",
];

class CreditPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      creditDetail: null,
      credits: [],
      openAddRepayment: false,
      credit_id: null,
      repayment_amount: "",
      refresh: false,
    };
  }

  getCreditDetail(e) {
    console.log(e);
    this.setState({
      creditDetail: e,
    });
  }

  addRepayment(e) {
    this.setState({
      credit_id: e,
      openAddRepayment: true,
    });
  }

  async save() {
    if (
      this.state.repayment_amount === "" ||
      Number(this.state.repayment_amount) < 0
    ) {
      this.props.openToast("Repayment", "Invalid repayment amount", "danger");
      return;
    }

    const requestBody = {
      pay_amount: this.state.repayment_amount,
    };

    const response = await updateCredit(this.state.credit_id, requestBody);

    if (response && response.success === false) {
      this.props.openToast("Credit", response.message, "danger");
      return;
    }

    await this.loadingData();

    this.setState({
      openAddRepayment: false,
      refresh: true,
    });

    await this.loadingData().then(() => {
      this.setState({ refresh: false });
    });
    return;
  }

  async loadingData() {
    const response = await getCreditList();
    if (response && response.success === false) {
      return this.props.openToast("Credit", response.message, "danger");
    }
    this.setState({
      credits: response,
    });
    return response;
  }

  async componentDidMount() {
    await this.loadingData();
  }

  render() {
    const {
      credits,
      creditDetail,
      credit_id,
      openAddRepayment,
      repayment_amount,
      refresh,
    } = this.state;
    return (
      <>
        <Navigation props={this.props} />

        <div className="container-fluid">
          <div className="row mt-3">
            <div className="col-md-4">
              {!refresh ? (
                <CreditDetailComponent
                  data={creditDetail}
                  addRepayment={(e) => this.addRepayment(e)}
                />
              ) : (
                <>loading</>
              )}
            </div>

            <div className="col-md-8">
              <CreditTableComponent
                data={credits}
                retrive={(e) => this.getCreditDetail(e)}
                refresh={refresh}
              />
            </div>
          </div>
        </div>

        <Modal show={openAddRepayment}>
          <Modal.Header>
            <Modal.Title>Add Repayment </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <InputGroup>
              <FormControl
                type="number"
                value={repayment_amount}
                onChange={(e) =>
                  this.setState({ repayment_amount: Number(e.target.value) })
                }
                placeholder="Enter repayment amount"
              />
            </InputGroup>
          </Modal.Body>

          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => this.setState({ openAddRepayment: false })}
            >
              Close
            </Button>
            <Button variant="primary" onClick={() => this.save()}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  reducer: state,
});

const mapDispatchToProps = (dispatch) => ({
  openToast: (title, message, theme) =>
    dispatch(setOpenToastAction(title, message, theme)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(CreditPage));
