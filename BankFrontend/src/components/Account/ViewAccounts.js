import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getToken, getUser } from "../utils"; // Adjust the import path as needed
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Paper, Typography, Button, Box, CircularProgress
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const refreshUser = async () => {
    const token = getToken();
    try {
        const response = await axios.get('http://localhost:8080/api/v1/bank/user', {

            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        let user = response.data
        localStorage.removeItem('user')
        localStorage.setItem('user',JSON.stringify(user))
    } catch (error) {

    }
}


const ViewAccounts = () => {
    const [accounts, setAccounts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const token = getToken();
    refreshUser()
    useEffect(() => {
        const fetchAccounts = async () => {
            try {
                const user = getUser();
                if (user && user.accounts) {
                    console.log(user.accounts);
                    setAccounts(user.accounts);
                    setStep(2);
                } else {
                    setError('No accounts found.');
                }
            } catch (error) {
                setError('Failed to load accounts.');
            } finally {
                setLoading(false);
            }
        };

        fetchAccounts();
    }, []);

    const handleTransfer = (accountId) => {
        navigate(`/transfer/${accountId}`);
    };

    const handleDeposit = (accountId) => {
        navigate(`/deposit/${accountId}`);
    };

    const handleViewAccount = (accountId) => {
        navigate(`/account/${accountId}`);
    };

    const handleDeleteAccount = async (accountId) => {

        // eslint-disable-next-line no-restricted-globals
        if (confirm("Are you sure you want to delete this account?") === true) {
            try {
                const response = await axios.delete(`http://localhost:8080/api/v1/account/deleteAccount/${accountId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.status === 200) {
                    alert('Account Deleted');
                    await refreshUser()
                    window.location.reload();
                    navigate('/view-accounts');
                } else {
                    alert('Something went wrong.');
                }
            } catch (error) {
                alert(`Error: ${error.message}`);
            }
        };
    }

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return <Typography variant="h6" color="error">{error}</Typography>;
    }

    return (

        <Box sx={{ maxWidth: '1200px', margin: '0 auto' }}>
            {step === 1 && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                    <CircularProgress />
                </Box>
            )}

            {step === 2 && (
                <Box sx={{ mt: 4 }}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        <div className={"App"}>
                        Your Accounts
                        </div>
                    </Typography>
                    <TableContainer component={Paper} sx={{ border: '1px solid #ccc', borderRadius: '8px' }}>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 'bold', border: '1px solid #ccc' }}>Account Name</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold', border: '1px solid #ccc' }}>Account Type</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold', border: '1px solid #ccc' }}>Balance</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold', border: '1px solid #ccc' }}>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {accounts.map((account) => (
                                    <TableRow key={account.account_number}>
                                        <TableCell sx={{ border: '1px solid #ccc' }}>{account.account_name}</TableCell>
                                        <TableCell sx={{ border: '1px solid #ccc' }}>{account.account_type}</TableCell>
                                        <TableCell sx={{ border: '1px solid #ccc' }}>{account.balance}</TableCell>
                                        <TableCell sx={{ border: '1px solid #ccc' }}>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={() => handleTransfer(account.account_number)}
                                                sx={{ mr: 2 }}
                                            >
                                                Transfer
                                            </Button>
                                            <Button
                                                variant="contained"
                                                color="secondary"
                                                onClick={() => handleDeposit(account.account_number)}
                                                sx={{ mr: 2 }}
                                            >
                                                Deposit
                                            </Button>
                                            <Button
                                                variant="outlined"
                                                onClick={() => handleViewAccount(account.account_number)}
                                                sx={{ mr: 2 }}
                                            >
                                                View
                                            </Button>
                                            <Button
                                                variant="contained"
                                                onClick={() => handleDeleteAccount(account.account_number)}
                                                color = "error"
                                            >
                                                Delete
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            )}
        </Box>
    );
}

export default ViewAccounts;
