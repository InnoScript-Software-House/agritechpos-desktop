import React, { Component } from "react";
import { Card } from "react-bootstrap";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { t, zawgyi } from "../../utilities/translation.utility";


class GeneralSettingPage extends Component {

    constructor(props) {
        super(props);

        this.state = {

        }
    }

    async componentDidMount() { 
        const { history } = this.props;

        window.nativeApi.app.navigateTo((url) => {
        	history.push(url);
        });
    }

    render() {
        const { lang } = this.props.reducer;

        return(
            <div className="container-fluid">
                <div className="row mt-1">
                    <div className="col-md-4">
                        <Card>
                            <Card.Header> 
                                <Card.Title className={`${zawgyi(lang)}`}> {t('title-tax-setting')} </Card.Title>
                            </Card.Header>
                        </Card>

                        <Card.Body>

                        </Card.Body>
                    </div>

                    <div className="col-md-4">
                        <Card>
                            <Card.Header> 
                                <Card.Title className={`${zawgyi(lang)}`}> {t('title-print-setting')} </Card.Title>
                            </Card.Header>
                        </Card>

                        <Card.Body>
                            
                        </Card.Body>
                    </div>

                    <div className="col-md-4">
                        <Card>
                            <Card.Header> 
                                <Card.Title className={`${zawgyi(lang)}`}> {t('title-shop-setting')} </Card.Title>
                            </Card.Header>
                        </Card>

                        <Card.Body>
                            
                        </Card.Body>
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
  