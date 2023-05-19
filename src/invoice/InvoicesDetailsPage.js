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
    MenuItem,
    Paper,
    Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography,
} from '@mui/material';
import CrudRestClient from '../common/CrudRestClient';
import {MuiFileInput} from "mui-file-input";

export default function InvoicesDetailsPage() {
    const [invoice, setInvoice] = useState({});
    const [isAddingFile, setIsAddingFile] = useState(false);
    const [alert, setAlert] = useState(null);

    const {id} = useParams();
    const restClient = new CrudRestClient();
    const [file, setFile] = useState(null);
    const [fileType, setFileType] = useState('');


    useEffect(() => {
        restClient
            .get('invoice', id)
            .then((res) => {
                console.log(res)
                setInvoice(res);
            })
            .catch((err) => {
                setAlert({message: 'Failed to load invoice details', type: 'error'});
                console.error(err);
            });
    }, [id]);


    const handleSaveClick = () => {
        restClient
            .fileUpload(file, {"fileType": fileType, "invoiceId": id})
            .then((res) => {
                setIsAddingFile(false);
                setAlert({message: 'File has been added', type: 'success'});
                restClient
                    .get('invoice', id)
                    .then((res) => {
                        console.log(res)
                        setInvoice(res);
                    })
                    .catch((err) => {
                        setAlert({message: 'Failed to load invoice details', type: 'error'});
                        console.error(err);
                    })
            })
            .catch((err) => {
                setAlert({message: 'Failed to update invoice details', type: 'error'});
                console.error(err);
            });
    };

    const handleCancelClick = () => {
        setIsAddingFile(false);
    };

    const handleChange = (newFile) => {
        setFile(newFile)
    }

    const handleChangeFileType = (event) => {
        setFileType(event.target.value)
    }

    const handleRemoveClick = () => {
        restClient
            .delete('invoice', id)
            .then(() => {
                // Navigate back to the customers list page
            })
            .catch((err) => {
                setAlert({message: 'Failed to remove invoice', type: 'error'});
                console.error(err);
            });
    };

    const handleAddFile = () => {
        setIsAddingFile(true)
    };

    const formatDateFromArray = (dateArray) => {
        let date = new Date(dateArray[0], dateArray[1] - 1, dateArray[2]);
        let year = date.getFullYear();
        let month = String(date.getMonth() + 1).padStart(2, '0');
        let day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    return (
        <>
            <Typography
                component="h3"
                variant="h3"
                align="left"
                color="text.primary"
                gutterBottom
            >
                Invoice
            </Typography>
            <Collapse in={alert}>
                <Alert color={alert?.type} sx={{mb: 2}}>
                    {alert?.message}
                </Alert>
            </Collapse>
            <Card sx={{maxWidth: 500, margin: 'auto', mt: 4}}>
                {invoice.invoiceNumber && (
                    <>
                        <CardContent>
                            <Typography component="div" variant="h5">
                                Basic
                            </Typography>
                            <br/>
                            <TextField id="filled-name"
                                       label="Invoice Number" fullWidth={true}
                                       sx={{mb: 2}}
                                       value={invoice.invoiceNumber}
                                       InputProps={{
                                           readOnly: true,
                                       }}
                                       variant="standard"
                            />
                            <TextField id="filled-name"
                                       label="Invoice Type" fullWidth={true}
                                       sx={{mb: 2}}
                                       value={invoice.invoiceType === 'PURCHASE' ? 'Kosztowa' : 'Sprzedażowa'}
                                       InputProps={{
                                           readOnly: true,
                                       }}
                                       variant="standard"
                            />
                            <TextField id="filled-name"
                                       label="Invoice Date" fullWidth={true}
                                       sx={{mb: 2}}
                                       value={formatDateFromArray(invoice.invoiceDate)}
                                       InputProps={{
                                           readOnly: true,
                                       }}
                                       variant="standard"
                            />
                            <TextField id="filled-name"
                                       label="Sale Date" fullWidth={true}
                                       sx={{mb: 2}}
                                       value={formatDateFromArray(invoice.saleDate)}
                                       InputProps={{
                                           readOnly: true,
                                       }}
                                       variant="standard"
                            />
                            <TextField id="filled-name"
                                       label="Issue Place" fullWidth={true}
                                       sx={{mb: 2}}
                                       value={invoice.issuePlace}
                                       InputProps={{
                                           readOnly: true,
                                       }}
                                       variant="standard"
                            />
                            <TextField id="filled-name"
                                       label="Payment Method" fullWidth={true}
                                       sx={{mb: 2}}
                                       value={invoice.paymentMethod}
                                       InputProps={{
                                           readOnly: true,
                                       }}
                                       variant="standard"
                            />

                            <Typography component="div" variant="h5">
                                Files
                            </Typography>
                            <br/>
                            <TableContainer component={Paper}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Name</TableCell>
                                            <TableCell>Type</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {invoice.files.map((row) => (
                                            <TableRow
                                                key={row.filename}
                                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                            >
                                                <TableCell component="th" scope="row">
                                                    {row.filename}
                                                </TableCell>
                                                <TableCell>{row.fileType === 'INVOICE' ? 'Faktura' : row.fileType === 'CONFIRMATION_TRANSPORT' ? 'Potwierdzenie Transportu' : 'Potwierdzenie Płatności'}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </CardContent>

                        <CardActions sx={{justifyContent: "right"}}>
                            <Button variant="contained" color="success" onClick={handleAddFile}>
                                Add file
                            </Button>
                            <Button variant="contained" color="error" onClick={handleRemoveClick}>
                                Remove
                            </Button>
                        </CardActions>
                    </>
                )}
            </Card>
            <Dialog open={isAddingFile} onClose={handleCancelClick}>
                <DialogTitle>Adding file</DialogTitle>
                <DialogContent>
                    <Typography>
                        Select File Type
                    </Typography>
                    <Select
                        value={fileType}
                        onChange={handleChangeFileType}
                        fullWidth
                    >
                        <MenuItem value="INVOICE">Faktura</MenuItem>
                        <MenuItem value="CONFIRMATION_TRANSPORT">Potwierdzenie Transportu</MenuItem>
                        <MenuItem value="CONFIRMATION_TRANSFER">Potwierdzenie Płatności</MenuItem>
                    </Select>
                    <br/><br/>
                    <Typography>
                        Select File
                    </Typography>
                    <MuiFileInput value={file} onChange={handleChange}/>

                </DialogContent>
                <DialogActions>
                    <Button color="error" onClick={handleCancelClick}>Cancel</Button>
                    <Button color="success" onClick={handleSaveClick}>Save</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
