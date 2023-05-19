import React, {useEffect, useState} from 'react';
import {
    Button,
    CircularProgress,
    MenuItem,
    Select,
    Stack,
    Step,
    StepLabel,
    Stepper,
    TextField,
    Typography,
} from '@mui/material';
import CrudRestClient from '../common/CrudRestClient';
import {Navigate} from "react-router-dom";

export default function InvoicesCreatePage() {
    const [customers, setCustomers] = useState([]);
    const [activeStep, setActiveStep] = useState(-1);
    const [choice, setChoice] = useState(
        {
            "invoiceType": '',
            "invoiceNumber": '',
            "invoiceDate": '',
            "saleDate": '',
            "issuePlace": '',
            "paymentMethod": '',
            "sellerId": '',
            "buyerId": '',
            "additionalInfo": '',
        }
    );
    const [invoice, setInvoice] = useState({});

    const restClient = new CrudRestClient();

    useEffect(() => {
        restClient
            .get('customer')
            .then((res) => {
                setCustomers(res);
                handleNext();
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);

    const handleNext = () => {
        setChoice(choice)
        if (activeStep === 4) {
            restClient
                .post('invoice', invoice)
                .then((res) => {
                    console.log(res)
                    setActiveStep(activeStep + 1);
                })
                .catch((err) => {
                    console.error(err);
                })
        } else {
            setActiveStep(activeStep + 1);
        }
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    const handleChoiceChange = (event, sub) => {
        switch (activeStep) {
            case 0:
                invoice.sellerId = event.target.value;
                setChoice((p) => ({...p, sellerId: event.target.value}));
                break;
            case 1:
                invoice.buyerId = event.target.value;
                setChoice((p) => ({...p, buyerId: event.target.value}));
                break;
            case 2:
                invoice.invoiceType = event.target.value;
                setChoice((p) => ({...p, invoiceType: event.target.value}));
                break;
            case 3:
                if (sub === 1) {
                    invoice.invoiceDate = event.target.value;
                    setChoice((p) => ({...p, invoiceDate: event.target.value}));
                }
                if (sub === 2) {
                    invoice.saleDate = event.target.value;
                    setChoice((p) => ({...p, saleDate: event.target.value}));
                }
                if (sub === 3) {
                    invoice.issuePlace = event.target.value;
                    setChoice((p) => ({...p, issuePlace: event.target.value}));
                }
                break;
            case 4:
                if (sub === 1) {
                    invoice.invoiceNumber = event.target.value;
                    setChoice((p) => ({...p, invoiceNumber: event.target.value}));
                }
                if (sub === 2) {
                    invoice.paymentMethod = event.target.value;
                    setChoice((p) => ({...p, paymentMethod: event.target.value}));
                }
                if (sub === 3) {
                    invoice.additionalInfo = event.target.value;
                    setChoice((p) => ({...p, additionalInfo: event.target.value}));
                }
                break;
        }
    };

    const renderFormStep = (step) => {
        switch (step) {
            case -1:
                return (
                    <Stack alignItems="center">
                        <CircularProgress/>
                    </Stack>
                );
            case 0:
                return (
                    <>
                        <Typography>
                            Select Seller
                        </Typography>
                        <Select
                            value={choice.sellerId}
                            onChange={handleChoiceChange}
                            fullWidth
                        >
                            {customers && customers.map((customer) => (
                                <MenuItem value={customer.id}>{customer.name}</MenuItem>
                            ))}
                        </Select>
                    </>
                );
            case 1:
                return (
                    <>
                        <Typography>
                            Select Buyer
                        </Typography>
                        <Select
                            value={choice.buyerId}
                            onChange={handleChoiceChange}
                            fullWidth
                        >
                            {customers && customers.map((customer) => (
                                <MenuItem value={customer.id}>{customer.name}</MenuItem>
                            ))}
                        </Select>
                    </>
                );
            case 2:
                return (
                    <>
                        <Typography>
                            Select Invoice Type
                        </Typography>
                        <Select
                            value={choice.invoiceType}
                            onChange={handleChoiceChange}
                            fullWidth
                        >
                            <MenuItem value="PURCHASE">Zakupowa</MenuItem>
                            <MenuItem value="SALES">Sprzedażowa</MenuItem>
                        </Select>
                    </>
                );
            case 3:
                return (
                    <>
                        <Typography>
                            Issue Date
                        </Typography>
                        <TextField
                            label="Enter a date (YYYY-MM-DD)"
                            value={choice.invoiceDate}
                            onChange={event => handleChoiceChange(event, 1)}
                            fullWidth
                        />
                        <Typography>
                            Sale Date
                        </Typography>
                        <TextField
                            label="Enter a date (YYYY-MM-DD)"
                            value={choice.saleDate}
                            onChange={event => handleChoiceChange(event, 2)}
                            fullWidth
                        />
                        <Typography>
                            Issue Place
                        </Typography>
                        <TextField
                            label="Enter issue place"
                            value={choice.issuePlace}
                            onChange={event => handleChoiceChange(event, 3)}
                            fullWidth
                        />
                    </>
                );
            case 4:
                return (
                    <>
                        <Typography>
                            Invoice Number
                        </Typography>
                        <TextField
                            label="Enter invoice number"
                            value={choice.invoiceNumber}
                            onChange={event => handleChoiceChange(event, 1)}
                            fullWidth
                        />
                        <br/>
                        <Typography>
                            Payment Method
                        </Typography>
                        <TextField
                            label="Enter payment method"
                            value={choice.paymentMethod}
                            onChange={event => handleChoiceChange(event, 2)}
                            fullWidth
                        />
                        <br/>
                        <Typography>
                            Additional Info
                        </Typography>
                        <TextField
                            label="Enter additional info"
                            value={choice.additionalInfo}
                            onChange={event => handleChoiceChange(event, 3)}
                            fullWidth
                        />
                    </>
                );
            case 5:
                return (
                    <>
                        <Navigate to={'/invoice'}> x </Navigate>
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <>
            <Stepper activeStep={activeStep} c>
                <Step>
                    <StepLabel>Step 1</StepLabel>
                </Step>
                <Step>
                    <StepLabel>Step 2</StepLabel>
                </Step>
                <Step>
                    <StepLabel>Step 3</StepLabel>
                </Step>
                <Step>
                    <StepLabel>Step 4</StepLabel>
                </Step>
                <Step>
                    <StepLabel>Step 5</StepLabel>
                </Step>
            </Stepper>

            <form style={{marginTop: '50px'}}>
                {renderFormStep(activeStep)}

                {activeStep !== 0 && (
                    <Button variant="outlined" color="primary" onClick={handleBack} style={{marginTop: '20px'}}>
                        Back
                    </Button>
                )}
                <div>
                    <Button variant="contained" color="primary" onClick={handleNext} style={{marginTop: '20px'}}>
                        {activeStep === 4 ? 'Finish' : 'Next'}
                    </Button>
                </div>
            </form>
        </>
    );
}
