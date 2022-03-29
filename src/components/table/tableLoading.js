import React from "react";
import { t } from "../../utilities/translation.utility"

export const TableLoadingComponent = () => {

    return(
        <div className='data-table-loading-wrapper'>
            <span> {t('table-loading-message')}</span>
        </div>
    )
}