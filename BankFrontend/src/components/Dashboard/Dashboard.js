import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Paper, Typography, Button, Box } from '@mui/material';
import axios from 'axios';
import {getToken} from "../utils";
import Chart from './Chart'
import Grid from '@mui/material/Grid';
import Deposits from './Deposits'
import DashboardFun from "./DashboardFun";

export default function Dashboard() {

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    return (
        <DashboardFun></DashboardFun>
        // <Container>
        //     <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
        //         <Typography variant="h4" gutterBottom>Dashboard</Typography>
        //         {error && <Typography color="error">{error}</Typography>}
        //         {user ? (
        //             <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        //                 <Grid container spacing={3}>
        //             <Box>
        //                 <Typography variant="h6">Welcome, {user.name}</Typography>
        //                 <Typography variant="body1">Email: {user.email}</Typography>
        //                 <Typography variant="body1">Phone Number: {user.phone_number}</Typography>
        //                 <Typography variant="body1">Address: {user.address}</Typography>
        //
        //                 {/* Deposits */}
        //                 <Grid item xs={12} md={4} lg={3}>
        //                     <Paper
        //                         sx={{
        //                             p: 2,
        //                             display: 'flex',
        //                             flexDirection: 'column',
        //                             height: 240,
        //                         }}
        //                     >
        //                         <Deposits />
        //                     </Paper>
        //                 </Grid>
        //
        //                 {/* Chart */}
        //                 <Grid item xs={12} md={8} lg={9}>
        //                     <Paper
        //                         sx={{
        //                             p: 2,
        //                             display: 'flex',
        //                             flexDirection: 'column',
        //                             height: 240,
        //                         }}
        //                     >
        //                         <Chart />
        //                     </Paper>
        //                 </Grid>
        //
        //                 <Box mt={2}>
        //                     <Button variant="contained" color="primary" onClick={() => navigate('/resetPassword')}>
        //                         Update Password
        //                     </Button>
        //                 </Box>
        //                 <Box mt={2}>
        //                     <Button variant="contained" color="secondary" onClick={handleLogout}>
        //                         Logout
        //                     </Button>
        //                 </Box>
        //             </Box>
        //                 </Grid>
        //             </Container>
        //         ) : (
        //             <Typography>Loading user data...</Typography>
        //         )}
        //     </Paper>
        // </Container>
    );
}

