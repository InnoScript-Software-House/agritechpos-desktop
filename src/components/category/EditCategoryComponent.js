import React, { useState } from "react";
import { Alert, Button, Card, FormControl, InputGroup } from "react-bootstrap";
import { BsArrowCounterclockwise } from 'react-icons/bs';
import { useDispatch } from "react-redux";
import { updateCategory } from "../../services/category.service";
import { setOpenDelModal } from "../../redux/actions/openDelModal.action";
import { setOpenToastAction } from "../../redux/actions/toast.action";

export const EditCategoryComponent = ({ props, category, isDelete, reload}) => {

    const { id } = props.match.params;
    
    const dispatch = useDispatch();

    const [ loading, setLoading ] = useState(false);
    const [ name, setName ] = useState('');
    const [ description, setDescription ] = useState('');

    const setData = async () => {
        setName(category.name),
        setDescription(category.description);
        return;
    }

    const update = async () => {
        if(name === '') {
            dispatch(setOpenToastAction('Update Category','Category name is required', 'danger'));
            return;
        }

        const requestBody = {
            name: name,
            description: description
        }

        if(requestBody.name === category.name) {
            delete requestBody.name;
        }

        const response = await updateCategory(id, requestBody);

        if(response && response.success===false){
            dispatch(setOpenToastAction('Update Category',response.message, 'danger'));
            setLoading(false);
            return;
        };

        dispatch(setOpenToastAction('Update Category', 'Category is updated', 'success'));
        setLoading(false);
        reload();
        return;
    }

    const deleteCategory = () => {
        dispatch(setOpenDelModal({
            open: true,
            title: 'Delete Record',
            message: 'Are you sure to delete record',
            id: category.id,
            type: 'category',
            multiple: false
        }));
    }

    useState(() => {
        if(category){
            setData();
        }
    }, [category]);

    return(
        <>
            <Card>
                <Card.Header>
                    <Card.Title className="d-md-flex flex-md-row justify-content-between align-items-center"> 
                        <span> Update Category </span>
                        <BsArrowCounterclockwise size={20} className="btn-icon" onClick={() => setData()} />
                    </Card.Title>
                </Card.Header>

                <Card.Body>
                    <Alert variant="warning">
                        <Alert.Heading> Warning for delete category </Alert.Heading>
                        <p> Once the item type is used, the item type cannot be delete </p>
                    </Alert>

                    <InputGroup className="mb-3">
                        <FormControl 
                            type="text"
                            placeholder="Category Name"
                            value={name || ''}
                            onChange={e => setName(e.target.value)}
                        />
                    </InputGroup>

                    <InputGroup className="mb-3">
                        <FormControl 
                            type="text"
                            placeholder="Description"
                            value={description  || ''}
                            onChange={e => setDescription(e.target.value)}
                        />
                    </InputGroup>
                </Card.Body>
                                
                <Card.Footer>
                    <Button 
                        className="btn-small w-full"
                        disabled={loading}
                        onClick={() => update()}
                    >
                        Update
                    </Button>

                    {isDelete && (
                        <Button 
                            className="btn-small btn-danger w-full mt-1"
                            disabled={loading}
                            onClick={() => deleteCategory()}
                         >
                            Delete
                        </Button> 
                    )}
                </Card.Footer>
            </Card>
        </>
    )

}