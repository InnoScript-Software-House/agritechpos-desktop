import numeral from 'numeral';
import React, { useEffect, useState } from 'react'
import { Card, FormControl, FormLabel } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { t, zawgyi } from '../../utilities/translation.utility';

const ShowDeviceSetting = ({ }) => {

    const state = useSelector(state => state);
    const { lang } = state;

    const [cpuModel, setCpuModel] = useState('');
    const [cpuSpeed, setCpuSpeed] = useState(0);
    const [cpuNo, setCpuNo] = useState(0);
    const [hostname , setHostName] = useState('');
    const [ram , setRam] = useState(0);

    const device = () => {
        const { nativeApi } = window;
        nativeApi.device.get((data) => {
            console.log(data)
            const getCpu = data.cpus();

            const model = getCpu.map(e => e.model);
            setCpuModel(model[0]);

            const speed = getCpu.map(e => e.speed);
            setCpuSpeed(speed[0]);

            setCpuNo(getCpu.length);

            const host = data.hostname();
            setHostName(host);
            
            const totalRam = data.totalmem();
            const totalRamGb = numeral(totalRam).divide(1073741824).format('0,0') 
            setRam(totalRamGb);
            // const totalRamGb = {`${numeral(totalRam).format('0,0') ${t('GB')}}`};
            console.log(totalRam)
            console.log(totalRamGb)
        })
    }

    useEffect(() => {
        device()
    }, [])
    return (
        <>
            <Card>
                <Card.Header>
                    <Card.Title className={`${zawgyi(lang)}`}>
                        {t('title-device')}
                    </Card.Title>
                </Card.Header>

                <Card.Body>
                    <div className='row'>
                        <div className='col-md-7 mb-3'>
                            <FormLabel className='w-100'> {t('cpu-model')} </FormLabel>
                            <FormControl
                                type="text"
                                placeholder="cpu-model"
                                value={cpuModel}
                                disabled />
                        </div>
                        <div className='col-md-2 mb-3'>
                            <FormLabel className='w-100'> {t('cpu-speed')} </FormLabel>
                            <FormControl
                                type="text"
                                placeholder="cpu-speed"
                                value={`${cpuSpeed}s`}
                                disabled />
                        </div>
                        <div className='col-md-3 mb-3'>
                            <FormLabel className='w-100'> {t('cpu-cores')} </FormLabel>
                            <FormControl
                                type="text"
                                placeholder="cpu-cores"
                                value={`${cpuNo} Threads`}
                                disabled />
                        </div>
                        <div className='col-md-4 mb-3'>
                            <FormLabel className='w-100'> {t('host')} </FormLabel>
                            <FormControl
                                type="text"
                                placeholder="host"
                                value={hostname}
                                disabled />
                        </div>
                        <div className='col-md-4 mb-3'>
                            <FormLabel className='w-100'> {t('ram')} </FormLabel>
                            <FormControl
                                type="text"
                                placeholder="ram"
                                value={`${ram} GB`}
                                disabled />
                        </div>
                    </div>

                </Card.Body>
            </Card>
        </>
    )
}

export default ShowDeviceSetting