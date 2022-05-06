import React, { Component } from "react";
import { connect } from "react-redux";
import { Card } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { Language } from "../../components/general/Language";
import { getShop } from "../../services/shop.service";
import PrintSetting from "./PrintSetting";
import { ShopSettingCreate } from "./ShopSettingCreate";
import { ShopSettingEdit } from "./ShopSettingEdit";
import TaxSetting from "./TaxSetting";


class GeneralSettingPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            shop: null
        }
    }

    getShopInfo(e) {
        this.setState({
            shop: e
        });
    }

    async loadingData() {
        const response = await getShop();
        if (response) {
            this.setState({
                shop: response
            });
        }
    }

    async componentDidMount() {
        const { history } = this.props;
        await this.loadingData();

        window.nativeApi.app.navigateTo((url) => {
            history.push(url);
        });
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row mt-1">
                    <div className="col-md-4">
                        <TaxSetting />
                        <Card className="mt-3">
                            <Language />
                        </Card>
                    </div>

                    <div className="col-md-4">
                        <PrintSetting />
                    </div>

                    <div className="col-md-4">
                        {
                            this.state.shop === null
                                ? (<ShopSettingCreate props={this.props} retrive={e => this.getShopInfo(e)} />)
                                : (<ShopSettingEdit props={this.props} dataSource={this.state.shop} retrive={e => this.getShopInfo(e)} />)
                        }
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
