import moment from "moment";
import React from "react";
import { Toast } from "react-bootstrap";
import { BsClock } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { setCloseToastAction } from "../../redux/actions/toast.action";

export const AppToast = ({props}) => {
    const { toast } = props.reducer;
    const status = toast.status === 'danger' ? 'danger' : toast.status === 'success' ? 'success' : toast.status === 'warning' ? 'warning' : 'info';
    const dispatch = useDispatch();

    const closeToast = () => {
        dispatch(setCloseToastAction());
    }

    return(
        <Toast
            show={toast.open}
            animation={true}
            onClose={closeToast}
            autohide={closeToast}
        >
            <Toast.Header 
                className={`d-md-flex flex-row justify-content-between align-items-center toast-${status}`}
                closeButton={true}
            >
                <strong> {toast.title} </strong>
            </Toast.Header>

            <Toast.Body className="d-md-flex flex-md-column">
                <div className="d-md-flex flex-md-row align-items-center justify-content-end">
                    <BsClock className="me-1"/> 
                    <small> {moment().format('DD-MM-Y HH:mm:ss')} </small>
                </div>
                <p> {toast.message}</p>
            </Toast.Body>
        </Toast>
    )
}