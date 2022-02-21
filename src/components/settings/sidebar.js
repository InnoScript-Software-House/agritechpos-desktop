import React from 'react';
import { t, zawgyi } from '../../utilities/translation.utility';
import { BsArrowRightShort } from "react-icons/bs";
import * as settingLits from '../../assets/data/settingList.json';

import '../../assets/css/components/sidebar.css';

export const SideBarComponent = ({ props, getComponent }) => {

    const { lang } = props.reducer;


    return(
        <div className='d-md-flex flex-column sidebar-wrapper'>
            <div className='m-2'>
                <h3 className={`sidebar-title mb-1 ${zawgyi(lang)}`}> {t('setting-sub-title')} </h3>

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