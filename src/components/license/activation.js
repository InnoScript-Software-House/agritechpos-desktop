/**
 * Developer                    - Aung Htet Paing
 * Start Date                   - 25 Dec 2021
 * Phone                        - 09421038123, 09758276201
 * Email                        - aunghtetpaing.info@gmail.com
**/

import React, { useCallback, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { t, zawgyi } from "../../utilities/translation.utility";
import { ArrowLeft } from "react-bootstrap-icons";
import { activatedLicense, storeLicense } from "../../services/license.service.js";

import '../../assets/css/components/activation.css';

export const Activation = ({ lng, serial, user, plan, backStep, history }) => {

    const [reginfo, setReginfo] = useState(null);
    const [encKey, setEncKey] = useState(null);
    const [loading, setLoading] = useState(false);

    const requestBody = {
        serial: serial,
        user: user,
        plan: plan
    }

    const save = async () => {
        setLoading(true);

        const requestBody = {
            key: encKey
        }

        await storeLicense(requestBody);
        setLoading(false);
        history.push('/user/first');
    }

    const checkActivated = useCallback(async() => {
        const response = await activatedLicense(requestBody);

        if(response.success === false) {
            history.push(`/error/${response.status}`)
        }

        setEncKey(response.encrypt_code);
        setReginfo(response.register);
    },[]);
    
    useEffect(() => {
        checkActivated();
    },[checkActivated]);

    return (
        <div className="flex-row m-2">
            <p className={`${zawgyi(lng)}`}> {t('demo-text')} </p>

            <div className="d-flex flex-column">
                <ArrowLeft className="back-arrow" size={40} onClick={(e) => backStep('plan')} />
                <label className={`user-label mb-3 mt-3 ${zawgyi(lng)}`}> {t('activation-title')} </label>
            </div>
            
            <div className="d-flex flex-column">
                {reginfo && encKey && (
                <div className="d-flex flex-row justify-content-between mb-3">
                    <div className="col-6">
                        <div className="d-flex">
                            <label className="info-label"> Serial Number </label>
                            <span className="info-text me-3"> {reginfo.serial} </span>
                        </div>

                        <div className="d-flex">
                            <label className="info-label"> Register Name </label>
                            <span className="info-text me-3"> {reginfo.user.display_name} </span>
                        </div>

                        <div className="d-flex">
                            <label className="info-label"> Phone </label>
                            <span className="info-text me-3"> {reginfo.user.phone} </span>
                        </div>

                        <div className="d-flex">
                            <label className="info-label"> Email </label>
                            <span className="info-text me-3"> {reginfo.user.email} </span>
                        </div>

                        <div className="d-flex">
                            <label className="info-label"> Address </label>
                            <span className="info-text me-3"> {reginfo.user.address} </span>
                        </div>
                    </div>

                    <div className="col-6"> 
                        <div className="d-flex flex-column">
                            <code className="text-break"> {encKey} </code>
                            <Button className="mt-3" onClick={() => save()} disabled={loading}> Save </Button>
                        </div>
                    </div>
                </div>
                )}
            </div>

        </div>
    )
}