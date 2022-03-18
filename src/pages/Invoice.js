import React, { Component } from 'react';
import { Card, FormControl, FormLabel, InputGroup, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Navigation } from '../components/general/Navigation';
import { setOpenToastAction } from '../redux/actions/toast.action';
import { getInvoice } from '../services/invoice.service';
import DataTable from "react-data-table-component";
import { invoiceColumns } from './invoice/invoiceColumns';
import { TableLoadingComponent } from '../components/table/tableLoading';
import { InvoiceDataComponent } from '../components/invoice/invoiceData';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker } from 'react-date-range';
import moment from 'moment';
import { paginationComponentOptions } from '../components/table/paginationOptions';
import { InvoiceTableHeader } from '../components/table/invoiceTableHeader';

class InvoicePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            start_date: '',
            end_date: '',
            invoices: [],
            tableloading: true,
            invoiceDatas: null,
            searchText: '',
            display: '',
            is_print: false
        }
    }

    print(){
        this.setState({
            is_print: true
        })
        const { print } = window.nativeApi;

        this.setState({
            display: 'display'
        })
        print.invoice();
        print.reload((data) => {
            if(data === true) {
                this.setState({
                    is_print: false,
                })
            }
        });
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

    dateStartRangeHandler(startdate){
        const invoicestart = this.state.invoices.filter(e => moment(e.created_at).format('YYYY,MM,DD') >= moment(startdate).format('YYYY,MM,DD'));
            this.setState({
                invoices: invoicestart
            });
            console.log(moment(startdate).format('YYYY,MM,DD'))
    }

    clear(){
        this.setState({
            start_date: '',
            end_date: '',
            searchText: '',
            invoiceDatas: null
        });
        this.loadingData();
    }

    dateEndRangeHandler(enddate){
        const invoiceEnd = this.state.invoices.filter(e => moment(e.created_at).format('YYYY,MM,DD') <= moment(enddate).format('YYYY,MM,DD'));
            this.setState({
                invoices: invoiceEnd
            });
            console.log(moment(enddate).format('YYYY,MM,DD'))
    }

    handleSelect(ranges){
        console.log(ranges);
    }

    onTextChange(e){
        let resultData = this.state.invoices.filter((result, index) => {
            let filterText = result.invoice_id.toString();
            if(filterText.includes(e)){
                return result;
            };
        })
        this.setState({
            searchText: e,
            invoices: resultData
        })
    }

    invoiceDataHandler(event){
        this.setState({
            invoiceDatas: event
        });
    }

    async componentDidMount(){
        await this.loadingData();
    }

    render() {
        // const selectionRange = {
        //     startDate: new Date(),
        //     endDate: new Date(),
        //     key: 'selection',
        //   }
        const { start_date, end_date, invoices, tableloading, invoiceDatas, searchText, is_print } = this.state; 
        return (
            <>
                {!is_print?(
                    <Navigation props={this.props} />): (<></>)
                    }

                <div className='container-fluid'>
                    <div className='row mt-3'>
                        {!is_print?( 
                        <div className='col-md-5'>
                            <Card>
                                <Card.Header className='d-md-flex flex-md-row justify-content-between align-items-center'>
                                    <div className='d-md-flex flex-md-column'>
                                        <FormLabel> Start Date </FormLabel>
                                        <FormControl
                                            type='date'
                                            placeholder="Choose Start Date"
                                            value={start_date}
                                            onChange={(e) => {this.setState({ start_date: e.target.value });
                                            this.dateStartRangeHandler(e.target.value);
                                            }}
                                        />
                                    </div>

                                    <div className='d-md-flex flex-md-column'>
                                        <FormLabel> End Date </FormLabel>
                                        <FormControl
                                            type='date'
                                            placeholder="Choose End Date"
                                            value={end_date}
                                            onChange={(e) => {this.setState({ end_date: e.target.value });
                                            this.dateEndRangeHandler(e.target.value);
                                            }}
                                        />
                                    </div>
                                    <div className='d-md-flex flex-md-column align-items-center'>
                                        <Button expand='sm'
                                        className='mt-4'
                                        onClick={()=> this.clear()}>
                                            Clear
                                        </Button>
                                    </div>
                                </Card.Header>
                                <Card.Body>
                                    <DataTable
                                        subHeader
                                        subHeaderComponent={
                                            <InputGroup>
                                                <FormControl
                                                type='text'
                                                value={searchText}
                                                placeholder='Search with Material ID'
                                                onChange={e => this.onTextChange(e.target.value)}
                                                />
                                            </InputGroup>
                                            // <InvoiceTableHeader
                                            // filterResult ={e => this.getFilter(e)}
                                            // data={invoices}
                                            //  />
                                        }
                                        pagination={paginationComponentOptions}
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
                        ): (<></>)}
                        <div className='col-md-7'>
                                <InvoiceDataComponent props={this.props} invoiceDetail={this.state.invoiceDatas}/>
                            <div className='d-flex flex-row justify-content-end'>
                                {!is_print? (<Button className='mt-2' onClick={() => this.print()}> Print </Button>) : (<></>)}
                            </div>
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