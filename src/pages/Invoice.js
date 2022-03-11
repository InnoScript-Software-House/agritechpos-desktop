import React, { Component } from 'react';
import { Card, FormControl, FormLabel, InputGroup } from 'react-bootstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Navigation } from '../components/general/Navigation';

class InvoicePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            start_date: '',
            end_date: ''
        }
    }

    render() {
        const { start_date, end_date } = this.state; 
        return (
            <>
                <Navigation props={this.props} />

                <div className='container-fluid'>
                    <div className='row mt-3'>
                        <div className='col-md-4'>
                            <Card>
                                <Card.Header className='d-md-flex flex-md-row justify-content-between align-items-center'>
                                    <div className='d-md-flex flex-md-column'>
                                        <FormLabel> Start Date </FormLabel>
                                        <FormControl
                                            type='date'
                                            placeholder="Choose Start Date"
                                            value={start_date}
                                            onChange={(e) => this.setState({ start_date: e.target.value })}
                                        />
                                    </div>

                                    <div className='d-md-flex flex-md-column'>
                                        <FormLabel> End Date </FormLabel>
                                        <FormControl
                                            type='date'
                                            placeholder="Choose End Date"
                                            value={end_date}
                                            onChange={(e) => this.setState({ end_date: e.target.value })}
                                        />
                                    </div>
                                </Card.Header>
                            </Card>
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
  )(withRouter(InvoicePage));