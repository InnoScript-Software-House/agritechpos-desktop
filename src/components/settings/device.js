import React, { useCallback, useEffect, useState } from "react";
import { CreateeDeviceComponent } from "./createDevice";
import { getDevices } from "../../services/device.service";
import { getDevice } from "../../services/license.service";
import { DeviceListComponent } from "./deviceList";

export const DeviceComponent = ({ props }) => {
    const { lang } = props.reducer;

    const [devices, setDevices] = useState([]);
    const [error, setError] = useState(null);
    const [disable, setDisable] = useState(false);

    const refresh = (e) => {
        if(e) {
            fetchApi();
        }
    }

    const fetchApi = useCallback(async() => {
        const response = await getDevices();
        const regInfo = await getDevice();

        if((response && response.success === false) || (regInfo && regInfo.success === false)) {
            setError(response.message);
            return;
        }

        const limit = Number(regInfo.plan.device);

        if(limit <= response.length) {
            setDisable(true);
        }

        setError(null);
        setDevices(response);
        return;
    },[]);

    useEffect(() => {
        fetchApi();
    }, [fetchApi]);

    return(
        <div className="col-md-10 p-1">
            <div className="d-md-flex flex-md-row">
                <CreateeDeviceComponent props={props} disable={disable} reload={(e) => refresh(e)} />
                <DeviceListComponent props={props} dataSource={devices} reload={e => refresh(e)} />
            </div>
        </div>
    )
}