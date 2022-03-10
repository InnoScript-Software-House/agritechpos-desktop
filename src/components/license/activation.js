import React, { useCallback, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { ArrowLeft } from "react-bootstrap-icons";
import { useDispatch } from "react-redux";
import { activatedLicense, storeLicense } from "../../services/license.service.js";
import axios from "axios";
import { setOpenToastAction } from "../../redux/actions/toast.action";
import { LICENSE } from "../../redux/actionTypes";

export const Activation = ({ serial, user, plan, backStep, history }) => {

    const dispatch = useDispatch();

    const [reginfo, setReginfo] = useState(null);
    const [encKey, setEncKey] = useState(null);
    const [loading, setLoading] = useState(false);

    const requestBody = {
        serial_key: serial,
        first_name: user.first_name,
        last_name: user.last_name,
        phone: user.phone,
        email: user.email,
        address: user.address,
        activation_date: plan.activated_at,
        duration: plan.duration,
        num_device: plan.device
    }

    const save = async () => {
        setLoading(true);

        const requestBody = {
            token: encKey,
            serial: serial
        }

        const response = await storeLicense(requestBody);

        if(response && response.success === false) {
            dispatch(setOpenToastAction('Activation', response.message, 'danger'));
            return;
        }
        axios.defaults.headers.common['license'] = response.token;
        localStorage.setItem(LICENSE, response.token);
        
        setLoading(false);
        history.push('/device/first');
    }

    const checkActivated = useCallback(async() => {
        const response = await activatedLicense(requestBody);

        if(response && response.success === false) {
            dispatch(setOpenToastAction('Activation', 'Invalid license key', 'danger'));
            return;
        }
        setEncKey(response.license_token);
        setReginfo(response.register);
    },[]);
    
    useEffect(() => {
        checkActivated();
    },[]);

    return (
        <div className="d-md-md-flex flex-md-row m-2">
            <div className="d-md-md-flex flex-md-column">
                <ArrowLeft className="back-arrow me-3" size={40} onClick={() => backStep('plan')} />
                <label className="user-label mb-3 mt-3"> License Activiation </label>
            </div>
            
            <div className="d-md-md-flex flex-md-column">
            {(serial && plan && user) && (
                <div className="d-md-flex flex-md-row justify-content-between mb-3">
                    <div className="col-md-6">
                        <div className="d-md-flex">
                            <label className="info-label"> Serial Number </label>
                            <span className="info-text me-3"> {serial} </span>
                        </div>

                        <div className="d-md-flex mt-3">
                            <label className="info-label"> Register Name </label>
                            <span className="info-text me-3"> {user.display_name} </span>
                        </div>

                        <div className="d-md-flex">
                            <label className="info-label"> Phone </label>
                            <span className="info-text me-3"> {user.phone} </span>
                        </div>

                        <div className="d-md-flex">
                            <label className="info-label"> Email </label>
                            <span className="info-text me-3"> {user.email} </span>
                        </div>

                        <div className="d-md-flex">
                            <label className="info-label"> Address </label>
                            <span className="info-text me-3"> {user.address} </span>
                        </div>

                        <div className="d-md-flex mt-3">
                            <label className="info-label"> Activation Date </label>
                            <span className="info-text me-3"> {plan.activated_at} </span>
                        </div>

                        <div className="d-md-flex">
                            <label className="info-label"> Plan Duration </label>
                            <span className="info-text me-3"> {plan.duration} Year </span>
                        </div>

                        <div className="d-md-flex">
                            <label className="info-label"> Devices </label>
                            <span className="info-text me-3"> {plan.device} </span>
                        </div>
                    </div>

                    {encKey && (
                        <div className="col-md-6"> 
                            <div className="d-md-flex flex-column">
                                <code className="text-break"> {encKey} </code>
                                <Button className="mt-3" onClick={() => save()} disabled={loading}> Save </Button>
                            </div>
                        </div>
                    )}
                </div>
            )}
            </div>
        </div>
    )
}