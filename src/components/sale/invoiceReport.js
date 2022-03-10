import React from "react";
import { Card, Button } from "react-bootstrap";
import { BsArrowLeftCircle } from 'react-icons/bs';
import { useHistory } from "react-router-dom";


export const InvoiceReportPage = ({props}) => {
    const history = useHistory();

    console.log(props);

    const handleClick = () => {
        history.push('/sale');
    }


    return (
        <>
        <div className='mb-2 mt-2'>
            <BsArrowLeftCircle size={30} className="btn-icon" onClick={() => handleClick()} />
        </div>
        <Card>
            <Card.Header>
                <Card.Title>
                    <span> Invoice Report</span>
                </Card.Title>
            </Card.Header>
            <Card.Body>
                    <div className="d-md-flex flex-md-row justify-content-center align-items-center">
                            <div className="col-md-6 mb-3">
                                    <h5>Customer Name - U Ba</h5>
                            </div>
                            <div className="col-md-6 mb-3">
                                    <h5>Phone No - 0988998989</h5>
                            </div>
                    </div>
                    <div className="d-flex flex-col justify-content-start align-items-center mb-3">
                        <h5>Address - No.9 koko street, south-okkalapa township, yangon</h5>
                    </div>

                    <div className="d-flex flex-row justify-content-center align-items-center mb-3 table-responsive">
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Item Model</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="cart-item-table-hash-width"> 1 </td>
                                    <td className="cart-item-table-with"> abc </td> 
                                    <td className="cart-item-table-with"> abc12 </td>
                                    <td className="cart-item-table-with"> 200 </td>
                                    <td className="cart-item-table-with"> 2 </td>
                                    <td className="cart-item-table-with"> 400 </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
            </Card.Body>
            <Card.Footer>
            <div className="d-flex flex-row justify-content-end mt-3">
                <table>
                    <tbody>
                        <tr>
                            <td> <h3 className="me-3"> TOTAL </h3> </td>
                            <td> <h3 className="me-3 ms-3"> 100 </h3></td>
                            <td> <h3 className="ms-3"> MMK </h3> </td>
                        </tr>

                        <tr>
                            <td> <h3 className="me-3"> DISCOUNT </h3> </td>
                            <td> <h3 className="me-3 ms-3"> 20 </h3> </td>
                            <td> <h3 className="ms-3"> MMK </h3> </td>
                        </tr>

                        <tr>
                            <td> <h3 className="me-3"> NET AMOUNT </h3> </td>
                            <td> <h3 className="me-3 ms-3"> 80 </h3> </td>
                            <td> <h3 className="ms-3"> MMK </h3> </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            </Card.Footer>
        </Card>
        <div className="d-flex flex-row justify-content-center mt-3">
            <Button
                onClick={e => e}>
                Print
             </Button>
        </div>
        </>
    )
}