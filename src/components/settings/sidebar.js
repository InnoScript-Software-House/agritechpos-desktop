import React, { useState } from 'react';
import { Button, ProgressBar } from 'react-bootstrap';
import { pages } from '../../assets/i18n/mm.json';
import { t, zawgyi } from '../../utilities/translation.utility';
import { BsArrowRightShort } from "react-icons/bs";

import * as settingLits from '../../assets/data/settingList.json';
import '../../assets/css/components/sidebar.css';

export const SideBarComponent = ({ props, getComponent }) => {

    const { lang } = props.reducer;


    return(
        <div className='d-flex flex-column sidebar-wrapper'>
            <div className='m-3'>
                <h3 className={`sidebar-title mb-3 ${zawgyi(lang)}`}> {t('setting-sub-title')} </h3>

                <ul className='sidebar-list'>
                    {settingLits.map((value, index) => {
                        return(
                            <li 
                                key={`setting_lists_id_${index}`}
                                onClick={() => getComponent(value.component)}
                            > 
                                <BsArrowRightShort size={30} /> 
                                {t(value.label)} 
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )

}