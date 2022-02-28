import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { t, zawgyi } from "../../utilities/translation.utility";
import { ArrowLeft } from "react-bootstrap-icons";
import { useDispatch } from 'react-redux';
import { setOpenToastAction } from "../../redux/actions/toast.action";

import '../../assets/css/components/license.css';

export const PlanComponent = ({ props, retrivePlan, backStep }) => {

    const { lang } = props.reducer;

    const [activation, setActivation] = useState('');
    const [duration, setDuration] = useState(1);
    const [device, setDevice] = useState(1);

    const dispatch = useDispatch();

    const [err, setErr] = useState(null);

    const NumOfPC = () => {
        let pcs = [];
        for(let x=1; x<=10; x++) {
            pcs.push(x);
        }
        return pcs;
    }

    const lifeTime = () => {
        let duration = [];
        for(let x=1; x<=5; x++) {
            duration.push(x);
        }
        return duration;
    }

    const submit = () => {
        if(activation === '' || duration === '' || device === '') {
            dispatch(setOpenToastAction('Plan',t('user-info-empty-error'),'danger'));
            return;
        }

        setErr(null);

        const planData = {
            activated_at: activation,
            duration: duration,
            device: device
        }

        retrivePlan(planData);
    }

    return (
        <div className="d-md-flex flex-md-row">
            <p className={`mt-3 ${zawgyi(lang)}`}> {t('license-plan-description')} </p>

            <div className="d-flex flex-column">
                <ArrowLeft className="back-arrow" size={40} onClick={(e) => backStep('user-info')} />
                <label className={`plan-label mb-3 mt-3 ${zawgyi(lng)}`}> {t('plan-info-title')} </label>
            </div>

        </div>
        // <div className="flex-row m-2">
        //     


            
        //     <div className="d-flex flex-column">
        //         <div className="d-flex flex-row justify-content-start mb-3">
        //                 <Form.Group className="me-3">
        //                     <Form.Label className={`${zawgyi(lng)}`}> {t('input-activation-date')} </Form.Label>
        //                     <Form.Control
        //                         type="date"
        //                         value={activation}
        //                         onChange={(e) => setActivation(e.target.value)}
        //                     />
        //                 </Form.Group>

        //                 <Form.Group className="me-3">
        //                     <Form.Label className={`${zawgyi(lng)}`}> {t('input-duration')} </Form.Label>
        //                     <Form.Control 
        //                        className="select-device"
        //                        as="select"
        //                        value={duration}
        //                        onChange={(e) => setDuration(e.target.value)}
        //                     >
        //                         {
        //                             lifeTime().map((value, index) => {
        //                                 return(
        //                                     <option key={`duration_id_${index}`} value={value}> {value} </option>
        //                                 )
        //                             })
        //                         }
        //                     </Form.Control>
        //                 </Form.Group>

        //                 <Form.Group className="me-3">
        //                     <Form.Label className={`${zawgyi(lng)}`}> {t('input-number-of-device')} </Form.Label>
        //                     <Form.Control
        //                         className="select-device"
        //                         as="select"
        //                         value={device}
        //                         onChange={(e) => setDevice(e.target.value)}
        //                     >
        //                         {
        //                             NumOfPC().map((value, index) => {
        //                                 return(
        //                                     <option key={`pc_id_${index}`} value={value}> {value} </option>
        //                                 )
        //                             })
        //                         }
        //                     </Form.Control>
        //                 </Form.Group>

        //                 <Form.Group className="me-3">
        //                     <Button 
        //                         className={`btn-plan-enter ms-3 ${zawgyi(lng)}`} 
        //                         onClick={() => submit()}
        //                     > 
        //                         {t('serial-key-submit')} 
        //                     </Button>
        //                 </Form.Group>
        //         </div>
        //     </div>

        //     {/* { err && (<label className={`serial-key-err-message mt-3 mb-3 ${zawgyi(lng)}`}> {err} </label>)} */}
            
        // </div>
    )
}