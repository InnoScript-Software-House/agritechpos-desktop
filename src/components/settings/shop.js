import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { t, zawgyi } from '../../utilities/translation.utility';
import { CreateShopFormComponent } from './shopCreateForm';
import { getShop } from '../../services/shop.service';
import { EditShopFormComponent } from './shopEditForm';

import '../../assets/css/components/shop.css';

export const ShopComponent = ({ props }) => {
    const { lang } = props.reducer;
    const [shop, setShop] = useState(null);
    const [loading, setLoading] = useState(true);

    const getShopInfo = (e) => {
        setShop(e)
    };

    useEffect(async () => {
        const response = await getShop();

        if(response) {
            setShop(response);
            setLoading(false);
        }

    }, []);


    return(
        <div className='shop-component'>
            <div className='d-flex flex-row'>
                <div className='col-5'>
                    <Card className='m-3'>
                        {shop ? (
                            <Card.Body>
                                <Card.Text className='d-flex flex-row justify-content-between'>
                                    <label className={`me ${zawgyi(lang)}`}> {t('shop-label-name')} </label>
                                    <label className={`${zawgyi(lang)}`}> {shop.name} </label>
                                </Card.Text>
                
                                <Card.Text className='d-flex flex-row justify-content-between'>
                                    <label className={`me-3 ${zawgyi(lang)}`}> {t('shop-label-description')} </label>
                                    <label className={`${zawgyi(lang)}`}>{shop.description}</label>
                                </Card.Text>
                
                                <Card.Text className='d-flex flex-row justify-content-between'>
                                    <label className={`me ${zawgyi(lang)}`}> {t('shop-label-phone')} </label>
                                    <label className={`${zawgyi(lang)}`}>  {shop.phone} </label>
                                </Card.Text>
                
                                <Card.Text className='d-flex flex-row justify-content-between'>
                                    <label className={`me ${zawgyi(lang)}`}> {t('shop-label-email')} </label>
                                    <label className={`${zawgyi(lang)}`}> {shop.email} </label>
                                </Card.Text>
                
                                <Card.Text className='d-flex flex-row justify-content-between'>
                                    <label className={`me-3 ${zawgyi(lang)}`}> {t('shop-label-address')} </label>
                                    <label className={`${zawgyi(lang)}`}>{shop.address}</label>
                                </Card.Text>
                            </Card.Body>
                        ) : (
                            <Card.Body className='d-flex flex-column'>
                                <Card.Title className={`mb-3 ${zawgyi(lang)}`}> {t('shop-info-title')}</Card.Title>
                                <Card.Text className={`shop-info-norecord d-flex align-self-center align-items-center ${zawgyi(lang)}`}> {t('shop-info-no-record')} </Card.Text>
                            </Card.Body>
                        )}
                    </Card>
                </div>

                {shop ? (
                    <EditShopFormComponent props={props} dataSource={shop} retrive={(e) => getShopInfo(e)} />
                ) : (
                    <CreateShopFormComponent props={props} retrive={(e) => getShopInfo(e)} />
                )}
            </div>
        </div>
    )

}