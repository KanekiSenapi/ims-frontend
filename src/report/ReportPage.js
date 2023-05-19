import React, {useState} from 'react';
import {Alert, Button, Collapse, TextField, Typography,} from '@mui/material';
import CrudRestClient from '../common/CrudRestClient';
import {Link} from "react-router-dom";

export default function ReportPage() {
    const [invoices, setInvoices] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [alert, setAlert] = useState(null);
    const [month, setMonth] = useState(null);
    const [year, setYear] = useState(null);

    const restClient = new CrudRestClient();

    const handleCallReport = () => {
        restClient
            .report(month, year)
            .then(() => {
                setAlert({message: 'Report has been created', type: 'success'});
            })
            .catch((err) => {
                setAlert({message: 'Failed to generate report', type: 'error'});
                console.error(err);
            });
    }

    return (
        <>
            <Collapse in={alert}>
                <Alert color={alert?.type} sx={{mb: 2}}>
                    {alert?.message}
                </Alert>
            </Collapse>
            <Typography
                component="h3"
                variant="h3"
                align="left"
                color="text.primary"
                gutterBottom
            >
                Report
            </Typography>
            <TextField
                label="Enter month eg. 5"
                value={month}
                onChange={event => setMonth(event.target.value)}
                fullWidth
            />
            <br/><br/>
            <TextField
                label="Enter year eg. 2023"
                value={year}
                onChange={event => setYear(event.target.value)}
                fullWidth
            />
            <br/><br/>
            <Button variant="contained" color="success" onClick={handleCallReport}>
                Generate
            </Button>
        </>
    );
}
