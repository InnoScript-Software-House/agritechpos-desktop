import numeral from "numeral";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { useHistory } from "react-router-dom";

export const CreditDetailComponent = ({ data, addRepayment }) => {
  const [detail, setDetail] = useState(null);
  const [repayments, setRepayments] = useState([]);
  const [isRepayment, setIsRepayment] = useState(false);

  const history = useHistory();

  useEffect(() => {
    if (data && data.length > 0) {
      // console.log(data)
      const repayments = JSON.parse(data[0].repayment);

      setDetail(data[0]);
      setRepayments(repayments);


            const repaymentAmounts = repayments.map((value) => value.pay_amount);
            const totalPayAmount = repaymentAmounts.reduce((a, b) => a + b, 0);
            // const repaymentAmounts = repayments.map(value => value.pay_amount);
    //         const totalPayAmount = repaymentAmounts.reduce((a,b) => a+b, 0);
    //         //const reduceAmount = Number(data[0].invoice.discount) + Number(totalPayAmount) + Number(data[0].amount);
    //         const balance = totalPayAmount + Number(data[0].invoice.discount);
            
    //         if(Number(balance) !== Number(data[0].invoice.total_amount)) {
    //             setIsRepayment(true);
    //             return;
    //         } else {
    //             setIsRepayment(false);
    //             return;
    //         }

    //         // setIsRepayment(false);
    //     }
    // },[data]);

      if (totalPayAmount >= data[0].invoice.total_amount) {
        setIsRepayment(true);
      } else setIsRepayment(false);
    }
  }, [data]);

  return (
    <Card>
      <Card.Header>
        <Card.Title>
          <h4>
            {" "}
            {detail ? (
              <span> Credit ID - {detail.id} </span>
            ) : (
              <span> Credit Information</span>
            )}{" "}
          </h4>
          {detail && <span> Invoice ID - {detail.invoice_no} </span>}
        </Card.Title>
      </Card.Header>

      <Card.Body>
        {detail && (
          <div>
            {detail &&
              detail.invoice.customer_name &&
              detail.invoice.customer_name && (
                <div className="row mt-3">
                  <span>
                    {" "}
                    Customer Name : {detail && detail.invoice.customer_name}
                  </span>
                </div>
              )}

            {detail &&
              detail.invoice.customer_phone &&
              detail.invoice.customer_phone && (
                <div className="row mt-3">
                  <span>
                    {" "}
                    Customer Phone : {detail && detail.invoice.customer_phone}
                  </span>
                </div>
              )}

            {detail &&
              detail.invoice.customer_email &&
              detail.invoice.customer_email && (
                <div className="row mt-3">
                  <span>
                    {" "}
                    Customer Email : {detail && detail.invoice.customer_email}
                  </span>
                </div>
              )}

            {detail &&
              detail.invoice.customer_address &&
              detail.invoice.customer_address && (
                <div className="row mt-3">
                  <span>
                    {" "}
                    Customer Address :{" "}
                    {detail && detail.invoice.customer_address}{" "}
                  </span>
                </div>
              )}

            <div className="table-responsive mt-3">
              <table className="table">
                <thead>
                  <tr>
                    <th> Pay Amount </th>
                    <th> Pay Date </th>
                  </tr>
                </thead>

                <tbody>
                  {repayments.length > 0 &&
                    repayments.map((repayment, index) => {
                      return (
                        <tr key={`repayment_id_${index}`}>
                          <td>
                            {" "}
                            {numeral(repayment.pay_amount).format(
                              "0,0"
                            )} MMK{" "}
                          </td>
                          <td>
                            {" "}
                            {moment(repayment.pay_date).format("Y-MM-DD")}{" "}
                          </td>
                        </tr>
                      );
                    })}

                  {!isRepayment ? (
                    <tr>
                      <td colSpan={2}>
                        <Button
                          className="btn w-full"
                          onClick={() => addRepayment(data[0].id)}
                        >
                          {" "}
                          Add Repayment{" "}
                        </Button>
                      </td>
                    </tr>
                  ) : (
                    <></>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {!detail && (
          <div className="d-flex flex-column justify-content-center align-items-center">
            <span> No Preview </span>
          </div>
        )}
      </Card.Body>
    </Card>
  );
};
