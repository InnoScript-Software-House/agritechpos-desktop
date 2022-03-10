import React, { useState } from "react";
import { Button, FormControl, InputGroup } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { setDatabaseUrl } from "../../redux/actions/config.action";
import { setOpenToastAction } from "../../redux/actions/toast.action";

export const DatabaseURLComponent = ({ props }) => {

    const dispatch = useDispatch();
    const history = useHistory();

    const [url, setUrl] = useState('');
    
    const saveUrl = () => {

        if(url === '') {
            dispatch(setOpenToastAction('Configuration Setting', 'IP address is required', 'danger'));
            return;
        }

        dispatch(setDatabaseUrl(url));

        dispatch(setOpenToastAction('Configuration Setting', 'Database url is updated', 'success'));
        history.push('/');
        return;
    };

    return(
        <>
            <div className="d-md-flex flex-md-column">
                <p> Enter IP address for database connection </p>

                <InputGroup className="config-input-500">
                    <FormControl 
                        type="text"
                        placeholder="Enter database IP address"
                        value={url}
                        onChange={e => setUrl(e.target.value)}
                    />

                    <Button className="btn btn-samll" onClick={() => saveUrl()}> Submit </Button>
                </InputGroup>
            </div>
        </>
    )
}