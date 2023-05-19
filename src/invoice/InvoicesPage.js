import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {
    Alert,
    Box,
    Button,
    CircularProgress,
    Collapse,
    IconButton,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material';
import CrudRestClient from '../common/CrudRestClient';

export default function InvoicesPage() {
    const [invoices, setInvoices] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);

    const restClient = new CrudRestClient();

    useEffect(() => {
        restClient
            .get('invoice')
            .then((res) => {
                setInvoices(res);
                setIsLoading(false);
            })
            .catch((err) => {
                setError('Failed to load invoices');
                console.error(err);
                setIsLoading(false);
            });
    }, []);

    return (
        <>
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography
                    component="h3"
                    variant="h3"
                    align="left"
                    color="text.primary"
                    gutterBottom
                >
                    Invoices
                </Typography>
                <Button variant="contained" color="success" component={Link} to={'/invoice/create'}>
                    Create
                </Button>
            </Box>
            <Collapse in={error}>
                <Alert color="error"
                       action={
                           <IconButton
                               aria-label="close"
                               color="inherit"
                               size="small"
                               onClick={() => {
                                   setError(false);
                               }}
                           >
                           </IconButton>
                       }
                       sx={{mb: 2}}
                >
                    {error}
                </Alert>
            </Collapse>

            {isLoading ? (
                <Stack alignItems="center">
                    <CircularProgress/>
                </Stack>
            ) : (!error &&
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Invoice Number</TableCell>
                                <TableCell>Type</TableCell>
                                <TableCell>Refer To</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {invoices && invoices.map((invoice) => (
                                <TableRow key={invoice.id}>
                                    <TableCell>{invoice.invoiceNumber}</TableCell>
                                    <TableCell>{invoice.type === 'PURCHASE' ? 'Kosztowa' : 'Sprzedażowa'}</TableCell>
                                    <TableCell>{invoice.type === 'PURCHASE' ? invoice.sellerName : invoice.buyerName}</TableCell>
                                    <TableCell>
                                        <Button component={Link} to={`/invoice/${invoice.id}`}>
                                            Details
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </>
    );
}
