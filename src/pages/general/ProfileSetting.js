import React, { useEffect, useState } from 'react'
import { Button, Card, FormControl, InputGroup } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { changePassword, editUser, getProfile  } from '../../services/user.service'
import { messageBoxType } from '../../utilities/native.utility'
import { t, zawgyi } from '../../utilities/translation.utility'

const ProfileSetting = () => {

    const state = useSelector(state => state);
    const { lang } = state;
    const { nativeApi } = window;
    const history = useHistory()
    const checkphone = /^(\+?(95)|[09])\d{9}/g;
    const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const [ data ,setData ] = useState([])
    const [adminName, setAdminName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isloading, setIsLoading] = useState(true);
    const [messageBoxTitle] = useState('Profile Update');
    const [passwordChange] = useState('Change Password');

    const loadingData = async () => {

        const response = await getProfile();

        if (response && response.success === false) {
            nativeApi.messageBox.open({
                title: messageBoxTitle,
                message: response.message,
                type: messageBoxType.error
            });
            return;
        }
        setData(response);
        setAdminName(response.name);
        setPhone(response.phone);
        setEmail(response.email);
        setIsLoading(false)
        return;
    }

    const update = async () => {
        if (adminName === '' || phone === '' || email === '') {
            nativeApi.messageBox.open({
                title: messageBoxTitle,
                message: 'All fields are required',
                type: messageBoxType.error
            });
            return;
        }

        if (!checkphone.test(phone)) {
            nativeApi.messageBox.open({
                title: messageBoxTitle,
                message: 'Invalid Phone Number',
                type: messageBoxType.error
            });
            return;
        }

        if (!pattern.test(email)) {
            nativeApi.messageBox.open({
                title: messageBoxTitle,
                message: 'Invalid email address',
                type: messageBoxType.error
            });
            return;
        }

        const requestBody = {
            name: adminName,
            phone: phone,
            email: email
        }

        if(adminName === data.name) {
            delete requestBody.name;
        }

        if(phone === data.phone) {
            delete requestBody.phone;
        }

        if(email === data.email) {
            delete requestBody.email;
        }

        console.log('Request Body', requestBody);

        const response = await editUser(data.id , requestBody);

        if(response && response.success === false) {
            nativeApi.messageBox.open({
                title: messageBoxTitle,
                message: response.message,
                type: messageBoxType.error
            });
            return;
        }

        loadingData();

        nativeApi.messageBox.open({
            title: messageBoxTitle,
            message: 'Profile Update Successsful',
            type: messageBoxType.info
        });
        return;
    }

    console.log(data)
    const change = async() => {
        if(currentPassword === '' || newPassword === '' || confirmPassword === '') {
            nativeApi.messageBox.open({
                title: passwordChange,
                message: 'All fields are required',
                type: messageBoxType.error
            });
            return;
        }

        if(confirmPassword !== newPassword) {
            nativeApi.messageBox.open({
                title: passwordChange,
                message: 'new password does not match',
                type: messageBoxType.error
            });
            return;
        }
        
        setIsLoading(true)

        const requestBody = {
            password : currentPassword,
            newPassword : newPassword
        }

        console.log(requestBody)

        const response = await changePassword ( data.id , requestBody);
        console.log(response)
        if(response && response.success === false) {
            nativeApi.messageBox.open({
                title : passwordChange,
                message : response.message,
                type : messageBoxType.error
            });
            return;
        }
       
        setIsLoading(false)
        nativeApi.messageBox.open({
            title: passwordChange,
            message: 'Password Change Successfully',
            type: messageBoxType.info
        });
        history.push('/logout');
        return;
    }


    useEffect(() => {
        loadingData();
    }, [])

    return (
        <>
            <Card>
                <Card.Header>
                    <Card.Title className={`${zawgyi(lang)}`}> {t('update-profile')} </Card.Title>
                </Card.Header>

                <Card.Body>
                    <InputGroup className='mb-3'>
                        <FormControl
                            type='text'
                            className="me-3"
                            placeholder={t('name')}
                            value={adminName}
                            onChange={e => setAdminName(e.target.value)}
                        />

                        <FormControl
                            type='text'
                            className="me-3"
                            placeholder={t('phone')}
                            value={phone}
                            onChange={e => setPhone(e.target.value)}
                        />

                        <FormControl
                            type='email'
                            placeholder={t('email')}
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />

                        <Button onClick={() => update()} disabled={isloading}> {t('update')} </Button>
                    </InputGroup>

                    <Card.Title className="mt-3"> {t('change-password')} </Card.Title>

                    <InputGroup>
                        <FormControl
                            type='password'
                            className="me-3"
                            placeholder={t('current-password')}
                            value={currentPassword}
                            onChange={e => setCurrentPassword(e.target.value)}
                        />

                        <FormControl
                            type='password'
                            className="me-3"
                            placeholder={t('new-password')}
                            value={newPassword}
                            onChange={e => setNewPassword(e.target.value)}
                        />

                        <FormControl
                            type='password'
                            placeholder={t('confirm-password')}
                            value={confirmPassword}
                            onChange={e => setConfirmPassword(e.target.value)}
                        />

                        <Button onClick={() => change()} disabled={isloading} > {t('change-password')} </Button>
                    </InputGroup>
                </Card.Body>
            </Card>
        </>
    )
}

export default ProfileSetting