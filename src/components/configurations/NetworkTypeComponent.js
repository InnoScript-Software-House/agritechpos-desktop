import React, { useState } from "react";

export const NetworkTypeComponent = ({props, reload }) => {

    const { lang } = props.reducer;

    return(
        <div className="d-md-flex flex-md-colum">
            <p className={`mt-3 ${zawgyi(lang)}`}> {t('config-networktype-description')} </p>
        </div>
    )
}