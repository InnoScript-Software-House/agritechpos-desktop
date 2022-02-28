import React, { useState } from "react";
import { Button, FormControl, InputGroup } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { setDeviceTypeAction } from "../../redux/actions/config.action";
import { setOpenToastAction } from "../../redux/actions/toast.action";
import { t, zawgyi } from "../../utilities/translation.utility";

export const DeviceTypeComponent = ({ props, reload }) => {

    const { lang } = props.reducer;
    const dispatch = useDispatch();

    const [device, setDevice] = useState('laptop');
    
    const setDeviceType = () => {
        dispatch(setDeviceTypeAction(device));
        dispatch(setOpenToastAction(t('tost-configuration'), t('config-devicetype-set-success'), 'success'));
        reload();
    };

    return(
        <>
            <div className="d-md-flex flex-md-column">
                <p className={`mt-3 ${zawgyi(lang)}`}> {t('config-devicetype-description')} </p>

                <InputGroup>
                    <FormControl 
                        as="select"
                        value={device}
                        onChange={e => setDevice(e.target.value)}
                    >
                        <option value="laptop"> Laptop </option>
                        <option value="pc"> PC Desktop </option>
                    </FormControl>

                    <Button
                        onClick={() => setDeviceType()}
                    > 
                        <span className={`${zawgyi(lang)}`}> {t('config-devicetype-submit')} </span>
                    </Button>
                </InputGroup>
            </div>
        </>
    )
}