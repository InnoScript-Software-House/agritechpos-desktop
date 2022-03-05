import React, { useCallback, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { t, zawgyi } from "../../utilities/translation.utility";
import { ArrowLeft } from "react-bootstrap-icons";
import { useDispatch } from "react-redux";
import { activatedLicense, storeLicense } from "../../services/license.service.js";
import axios from "axios";
import { setOpenToastAction } from "../../redux/actions/toast.action";

import '../../assets/css/components/activation.css';

export const Activation = ({ lng, serial, user, plan, backStep, history }) => {

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

    console.log(requestBody);

    const save = async () => {
        setLoading(true);

        const requestBody = {
            token: encKey,
            serial: serial
        }

        const response = await storeLicense(requestBody);

        if(response && response.success === false) {
            dispatch(setOpenToastAction(t('toast-license-key'), response.message, 'danger'));
            return;
        }

        axios.defaults.headers.common['license'] = response.token;
        setLoading(false);
        history.push('/device/first');
    }

    const checkActivated = useCallback(async() => {
        const response = await activatedLicense(requestBody);

        if(response && response.success === false) {
            dispatch(setOpenToastAction(t('toast-license-key'), t('license-active-invalid'), 'danger'));
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
                <ArrowLeft className="back-arrow me-3" size={40} onClick={(e) => backStep('plan')} />
                <label className={`user-label mb-3 mt-3 ${zawgyi(lng)}`}> {t('license-active-title')} </label>
            </div>
            
            <div className="d-md-md-flex flex-md-column">
            {(serial && plan && user) && (
                <div className="d-md-flex flex-md-row justify-content-between mb-3">
                    <div className="col-md-6">
                        <div className="d-md-flex">
                            <label className={`info-label ${zawgyi(lng)}`}> {t('label-serial-number')} </label>
                            <span className="info-text me-3"> {serial} </span>
                        </div>

                        <div className="d-md-flex mt-3">
                            <label className={`info-label ${zawgyi(lng)}`}> Register Name </label>
                            <span className="info-text me-3"> {user.display_name} </span>
                        </div>

                        <div className="d-md-flex">
                            <label className={`info-label ${zawgyi(lng)}`}> Phone </label>
                            <span className="info-text me-3"> {user.phone} </span>
                        </div>

                        <div className="d-md-flex">
                            <label className={`info-label ${zawgyi(lng)}`}> Email </label>
                            <span className="info-text me-3"> {user.email} </span>
                        </div>

                        <div className="d-md-flex">
                            <label className={`info-label ${zawgyi(lng)}`}> Address </label>
                            <span className="info-text me-3"> {user.address} </span>
                        </div>

                        <div className="d-md-flex mt-3">
                            <label className={`info-label ${zawgyi(lng)}`}> {t('license-plan-activation-date')} </label>
                            <span className="info-text me-3"> {plan.activated_at} </span>
                        </div>

                        <div className="d-md-flex">
                            <label className={`info-label ${zawgyi(lng)}`}> {t('license-plan-duration')} </label>
                            <span className="info-text me-3"> {plan.duration} {t('unit-year')} </span>
                        </div>

                        <div className="d-md-flex">
                            <label className={`info-label ${zawgyi(lng)}`}> {t('license-plan-device')} </label>
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