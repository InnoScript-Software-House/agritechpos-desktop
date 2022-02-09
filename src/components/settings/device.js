import React, { useCallback, useEffect, useState } from "react";
import { Alert, Button, Card } from "react-bootstrap";
import { t, zawgyi } from "../../utilities/translation.utility";
import { BsArrowRightShort } from "react-icons/bs";
import { getDevice } from "../../services/license.service";
import { UpdateDeviceComponent } from "./updateDevice";

export const DeviceComponent = ({ props }) => {
    const { lang } = props.reducer;
    return(
        <div className="col-md-10 p-1">
            <div className="d-md-flex flex-md-row">
                <UpdateDeviceComponent props={props} />

                <div className="col-md-9">
                    <Card>
                        <Card.Title className="p-3 device-update-title"> 
                            <span className={`${zawgyi(lang)}`}> {t('device-update-title')} </span>
                        </Card.Title>

                        <Card.Body className="d-md-flex flex-row justify-content-md-evenly flex-md-wrap">
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </div>
    )
}