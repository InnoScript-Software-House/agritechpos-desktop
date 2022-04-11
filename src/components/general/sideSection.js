
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

export const SideSection = () => {

    return(
        <div className='d-md-flex flex-md-column justify-content-center align-items-center background-opacity-layout'>
            <div className='description-card'>
                <h3 className="title-default"> Agricultural Equipment POS Software </h3>
                    <p className="text"> 
                        AgriTech is desktop pos software for agriculture machinery equipment businesses.
                        We are focusing on IoT products for agriculture sector.
                    </p>

                <Button className='btn btn-border'> Learn More </Button>
            </div>
        </div>
    )
}