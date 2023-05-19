import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import HomePage from './homepage/HomePage';
import CustomersPage from './customer/CustomersPage';
import TopNavigation from "./navigation/TopNavigation";
import CustomerDetailsPage from "./customer/CustomerDetailsPage";
import {Container, CssBaseline} from "@mui/material";
import InvoicesPage from "./invoice/InvoicesPage";
import InvoicesDetailsPage from "./invoice/InvoicesDetailsPage";
import InvoicesCreatePage from "./invoice/InvoicesCreatePage";
import ReportPage from "./report/ReportPage";

function App() {
    return (
        <BrowserRouter>
            <CssBaseline/>
            <TopNavigation/>
            <Container disableGutters maxWidth="sm" component="main" sx={{pt: 8, pb: 6}}>
                <Routes>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/customer" element={<CustomersPage/>}/>
                    <Route path="/customer/:id" element={<CustomerDetailsPage/>}/>
                    <Route path="/invoice" element={<InvoicesPage/>}/>
                    <Route path="/invoice/create" element={<InvoicesCreatePage/>}/>
                    <Route path="/invoice/:id" element={<InvoicesDetailsPage/>}/>
                    <Route path="/report" element={<ReportPage/>}/>
                </Routes>
            </Container>
        </BrowserRouter>
    );
}

export default App;