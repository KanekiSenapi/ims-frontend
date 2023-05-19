import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {
    Alert,
    Button,
    Card,
    CardActions,
    CardContent,
    Collapse,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Typography,
} from '@mui/material';
import CrudRestClient from '../common/CrudRestClient';

export default function CustomerDetailsPage() {
    const [customer, setCustomer] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [editedCustomer, setEditedCustomer] = useState({name: '', address: '', nip: ''});
    const [alert, setAlert] = useState(null);

    const {id} = useParams();
    const restClient = new CrudRestClient();

    useEffect(() => {
        restClient
            .get(`customer/${id}`)
            .then((res) => {
                setCustomer(res);
                setEditedCustomer({...res});
            })
            .catch((err) => {
                setAlert({message: 'Failed to load customer details', type: 'error'});
                console.error(err);
            });
    }, [id]);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = () => {
        restClient
            .put(`customer`, id, editedCustomer)
            .then((res) => {
                setCustomer(res);
                setIsEditing(false);
                setAlert({message: 'Customer has been updated', type: 'success'});
            })
            .catch((err) => {
                setAlert({message: 'Failed to update customer details', type: 'error'});
                console.error(err);
            });
    };

    const handleCancelClick = () => {
        setIsEditing(false);
        setEditedCustomer({...customer});
    };

    const handleNameChange = (event) => {
        setEditedCustomer({...editedCustomer, name: event.target.value});
    };

    const handleAddressChange = (event) => {
        setEditedCustomer({...editedCustomer, address: event.target.value});
    };

    const handleNipChange = (event) => {
        setEditedCustomer({...editedCustomer, nip: event.target.value});
    };

    const handleRemoveClick = () => {
        restClient
            .delete(`customer`, id)
            .then(() => {
                // Navigate back to the customers list page
            })
            .catch((err) => {
                setAlert({message: 'Failed to remove customer', type: 'error'});
                console.error(err);
            });
    };

    const handleCloseDialog = () => {
        setAlert(null);
    };

    return (
        <>
            <Typography
                component="h3"
                variant="h3"
                align="left"
                color="text.primary"
                gutterBottom
            >
                Customer
            </Typography>
            <Collapse in={alert}>
                <Alert color={alert?.type} sx={{mb: 2}}>
                    {alert?.message}
                </Alert>
            </Collapse>
            <Card sx={{maxWidth: 500, margin: 'auto', mt: 4}}>
                {customer.name && (
                    <>
                        <CardContent>
                            <TextField id="filled-name"
                                       label="Name" fullWidth={true}
                                       sx={{mb: 2}}
                                       value={customer.name}
                                       InputProps={{
                                           readOnly: true,
                                       }}
                                       variant="standard"
                            />
                            <TextField id="filled-nip"
                                       label="NIP" fullWidth={true}
                                       sx={{mb: 2}}
                                       value={customer.nip}
                                       InputProps={{
                                           readOnly: true,
                                       }}
                                       variant="standard"
                            />
                            <TextField id="filled-address"
                                       label="Address" fullWidth={true}
                                       value={customer.address}
                                       InputProps={{
                                           readOnly: true,
                                       }}
                                       variant="standard"
                            />
                        </CardContent>
                        <CardActions sx={{justifyContent: "right"}}>
                            <Button variant="contained" color="warning" onClick={handleEditClick}>
                                Edit
                            </Button>
                            <Button variant="contained" color="error" onClick={handleRemoveClick}>
                                Remove
                            </Button>
                        </CardActions>
                    </>
                )}
            </Card>
            <Dialog open={isEditing} onClose={handleCancelClick}>
                <DialogTitle>Edit Customer</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Name"
                        value={editedCustomer.name}
                        onChange={handleNameChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Address"
                        value={editedCustomer.address}
                        onChange={handleAddressChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="NIP"
                        value={editedCustomer.nip}
                        onChange={handleNipChange}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button color="error" onClick={handleCancelClick}>Cancel</Button>
                    <Button color="success" onClick={handleSaveClick}>Save</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
