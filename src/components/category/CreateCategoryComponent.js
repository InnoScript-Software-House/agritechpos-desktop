import React, { useState } from 'react';
import { Button, Card, FormControl, InputGroup } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { setOpenToastAction } from '../../redux/actions/toast.action';
import { saveCategory } from '../../services/category.service';
import { t } from 'i18next';

export const CreateCategoryComponent = ({ reload }) => {
    const dispatch = useDispatch();

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState('');

    const reset = () => {
        setName('');
        setDescription('');
        setLoading(false);
    }

    const createCategory = async () => {
        if(name === '') {
            dispatch(setOpenToastAction('Create Category','category name is required', 'danger'));
            return;
        }

        const requestBody = {
            name: name,
            description: description
        }

        setLoading(true);

        const response = await saveCategory(requestBody);

        if(response && response.success === false) {
            dispatch(setOpenToastAction('Create Category', response.message, 'danger'));
            setLoading(false);
            return;
        }

        dispatch(setOpenToastAction('Create Category', 'category is updated', 'success'));
        setLoading(false);
        reset();
        reload(true);
        return;
    }

    return(
        <Card className='mt-3'>
        <Card.Header>
            <Card.Title>
                <span className="title"> Create Category </span>
            </Card.Title>
        </Card.Header>

        <Card.Body>
            <InputGroup className="mb-3">
                <FormControl 
                    type='text'
                    placeholder={t('name')}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </InputGroup>

            <InputGroup className="mb-3">
                <FormControl 
                    type='text'
                    placeholder={t('description')}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </InputGroup>

            <Button
                className="btn btn-samll"
                disabled={loading}
                onClick={() => createCategory()}
            > 
                {t('create')}
            </Button>
        </Card.Body>
    </Card>
    )
}