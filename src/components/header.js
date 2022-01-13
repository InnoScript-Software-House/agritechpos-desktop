import React from "react";
import { ArrowLeft } from "react-bootstrap-icons";
import { Link } from "react-router-dom";

import '../assets/css/header.css';

export const HeaderComponent = () => {

    return (
        <div className="header-wrapper">
            <Link to="/">
                <ArrowLeft className="header-back-icon" size={80} />
            </Link>
          
        </div>
    )
}