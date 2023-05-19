import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import HomePage from './homepage/HomePage';
import CustomersPage from './customer/CustomersPage';
import TopNavigation from "./navigation/TopNavigation";
import CustomerDetailsPage from "./customer/CustomerDetailsPage";
import {Container, CssBaseline} from "@mui/material";

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
                </Routes>
            </Container>
        </BrowserRouter>
    );
}

export default App;