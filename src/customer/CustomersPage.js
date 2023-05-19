import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {
    Alert,
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

export default function CustomersPage() {
    const [customers, setCustomers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);

    const restClient = new CrudRestClient();

    useEffect(() => {
        restClient
            .get('customer')
            .then((res) => {
                setCustomers(res);
                setIsLoading(false);
            })
            .catch((err) => {
                setError('Failed to load customers');
                console.error(err);
                setIsLoading(false);
            });
    }, []);

    return (
        <>
            <Typography
                component="h3"
                variant="h3"
                align="left"
                color="text.primary"
                gutterBottom
            >
                Customers
            </Typography>
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
                                <TableCell>Name</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {customers && customers.map((customer) => (
                                <TableRow key={customer.id}>
                                    <TableCell>{customer.name}</TableCell>
                                    <TableCell>
                                        <Button component={Link} to={`/customer/${customer.id}`}>
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
