import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { CreateShopFormComponent } from './shopCreateForm';
import { getShop } from '../../services/shop.service';
import { EditShopFormComponent } from './shopEditForm';

export const ShopComponent = ({ props }) => {

    const [shop, setShop] = useState(null);

    const getShopInfo = (e) => {
        setShop(e)
    };

    useEffect(async () => {
        const response = await getShop();
        if(response) {
            setShop(response);
        }
    }, []);

    return(
        <div className='row mt-3'>
            <div className='col-md-4'>
                <Card>
                    <Card.Header>
                        <Card.Title> Shop Information </Card.Title>
                    </Card.Header>

                        { shop && (
                            <Card.Body>
                                <Card.Text className='d-flex flex-row justify-content-between'>
                                    <label className="me"> Shop Name </label>
                                    <label> {shop.name} </label>
                                </Card.Text>

                                <Card.Text className='d-flex flex-row justify-content-between'>
                                    <label className="me"> Shop Description </label>
                                    <label>{shop.description}</label>
                                </Card.Text>

                                <Card.Text className='d-flex flex-row justify-content-between'>
                                    <label className="me"> Phone </label>
                                    <label>  {shop.phone} </label>
                                </Card.Text>

                                <Card.Text className='d-flex flex-row justify-content-between'>
                                    <label className="me"> Email Address </label>
                                    <label> {shop.email} </label>
                                </Card.Text>

                                <Card.Text className='d-flex flex-row justify-content-between'>
                                    <label className="me"> Address </label>
                                    <label>{shop.address}</label>
                                </Card.Text>
                            </Card.Body>
                        )}
                </Card>
            </div>

            <div className='col-md-8'>
                { 
                    shop === null ? (<CreateShopFormComponent props={props} retrive={(e) => getShopInfo(e)} />) : 
                    (<EditShopFormComponent props={props} dataSource={shop} retrive={(e) => getShopInfo(e)} />)
                }
            </div>
        </div>
    )

}