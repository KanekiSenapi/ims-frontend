import React from 'react';
import {Typography} from '@mui/material';
import {styled} from '@mui/system';

const HomePageWrapper = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh'
});

const HomePage = () => {
    return (
        <HomePageWrapper>
            <Typography variant="h4" gutterBottom>
                Welcome to the Invoice Service Management application
            </Typography>
        </HomePageWrapper>
    );
}

export default HomePage;