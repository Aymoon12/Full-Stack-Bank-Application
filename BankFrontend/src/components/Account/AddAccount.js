import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Container, CssBaseline, TextField, Typography } from '@mui/material';
import axios from 'axios';
import {getToken} from "../utils";
import Select from "react-dropdown-select"
import {getUser} from "../utils";
import {refreshUser} from './ViewAccounts'


export default function AddAccount() {
    const [accountName, setAccountName] = useState('');
    const [initialDeposit, setInitialDeposit] = useState('');
    const [accountType, setAccountType] = useState()
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const user  = getUser();
    let id = user.customer_id
    const options = [
            {label:"CHECKING",value:1},
            {label:"SAVINGS",value:1}
        ]



    const acc = (accountType) => {
        setAccountType(accountType.at(0).label)

    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        const token = getToken();
        const newAccount = {
            type : accountType,
            customer_id: id,
            balance : initialDeposit,
            account_name: accountName

        };

        try {
            const response = await axios.post('http://localhost:8080/api/v1/account/addAccount', newAccount, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.status === 200) {
                alert('Account created successfully!');
                await refreshUser()
                navigate('/view-accounts');
            } else {
                alert('Something went wrong.');
            }
        } catch (error) {
            alert(`Error: ${error.message}`);
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h5">
                    Add Account
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="accountName"
                        label="Account Name"
                        name="accountName"
                        autoFocus
                        value={accountName}
                        onChange={(e) => setAccountName(e.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="initialDeposit"
                        label="Initial Deposit"
                        type="number"
                        id="initialDeposit"
                        value={initialDeposit}
                        onChange={(e) => setInitialDeposit(e.target.value)}
                    />
                    <Select
                            name = "ACCOUNT_TYPE"
                            options = {options} onChange={accountType => {acc(accountType)}}>
                    </Select>



                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Add Account
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}

