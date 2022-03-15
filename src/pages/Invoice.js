import React, { Component } from 'react';
import { Card, FormControl, FormLabel, InputGroup } from 'react-bootstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Navigation } from '../components/general/Navigation';
import { setOpenToastAction } from '../redux/actions/toast.action';
import { getInvoice } from '../services/invoice.service';
import DataTable from "react-data-table-component";
import { invoiceColumns } from './invoice/invoiceColumns';
import { TableLoadingComponent } from '../components/table/tableLoading';
import { InvoiceDataComponent } from '../components/invoice/invoiceData';

class InvoicePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            start_date: '',
            end_date: '',
            invoices: [],
            tableloading: true,
            invoiceDatas: null,
        }
    }

    async loadingData() {
        const response = await getInvoice();
        if(response && response.success === false){
           return this.props.openToast('Invoice', response.message, 'danger');
        }
        console.log(response);
        this.setState({
            invoices: response,
            tableloading: false
        });
    }

    invoiceDataHandler(event){
        this.setState({
            invoiceDatas: event
        })
        console.log(event)
    }

    async componentDidMount(){
        await this.loadingData();
    }

    render() {
        const { start_date, end_date, invoices, tableloading, invoiceDatas } = this.state; 
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
                                <Card.Body>
                                    <DataTable
                                        dense
                                        progressPending={tableloading}
                                        progressComponent={<TableLoadingComponent />}
                                        data = {invoices}
                                        columns={invoiceColumns(this.props)}
                                        highlightOnHover
                                        pointerOnHover
                                        selectableRows={true}
                                        selectableRowsHighlight={true}
                                        onSelectedRowsChange={(e) => 
                                            this.invoiceDataHandler(e.selectedRows)
                                        }
                                        selectableRowsSingle={true}
                                    />
                                </Card.Body>
                            </Card>
                        </div>
                        <div className='col-md-7'>
                            <InvoiceDataComponent props={this.props} invoiceDetail={this.state.invoiceDatas}/>
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
      openToast: (title, message, theme) => dispatch(setOpenToastAction(title, message, theme))
  });
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(withRouter(InvoicePage));