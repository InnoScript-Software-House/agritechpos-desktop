import React, { useState } from "react";
import { Spinner } from "react-bootstrap";

export const LoadingComponent = () => {
    
    return(
        <div className="d-md-flex flex-md-column justify-content-center align-items-center">
            <Spinner animation="border" />
        </div>
    )
}