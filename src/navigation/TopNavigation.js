import React from 'react';
import {AppBar, Button, IconButton, Toolbar, Typography} from '@mui/material';
import {Link} from "react-router-dom";
import AccountCircle from '@mui/icons-material/AccountCircle';


function handleProfileMenuOpen(event) {

}

function TopNavigation() {

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Invoice Service Management
                </Typography>
                <Button color="inherit" component={Link} to="/">
                    Home
                </Button>
                <Button color="inherit" component={Link} to="/customer">
                    Customers
                </Button>
                <IconButton
                    size="large"
                    edge="end"
                    aria-label="account of current user"
                    aria-haspopup="true"
                    onClick={handleProfileMenuOpen}
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
            </Toolbar>
        </AppBar>
    );
}

export default TopNavigation;