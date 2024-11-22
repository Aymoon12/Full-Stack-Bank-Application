import * as React from 'react';
import { Container, Box, Typography, TextField, Button, Grid, Paper } from '@mui/material';
import {useParams} from "react-router-dom";
import axios from "axios";
import {getToken} from "../utils";

export default function Transfer() {

    const source = useParams()

    const token = getToken()
    const handleSubmit = async (event) => {
            event.preventDefault();

            const data = new FormData(event.currentTarget);
            console.log({
                source:source.accountId,
                destination:data.get('toAccount'),
                amount:data.get('amount')

            })

            const payload = {
                // eslint-disable-next-line react-hooks/rules-of-hooks
                sourceAccountNumber: source.accountId,
                destinationAccountNumber:data.get('toAccount'),
                amount: data.get('amount')
            }




            try {
                const response = await axios.post('http://localhost:8080/api/v1/transaction/transfer', payload, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });

                if(response.status === 200){
                    alert('Transferred')
                }


            } catch (e){
                console.log(e)
                alert(e.response.data)
            }

        }
        ;

        return (
            <Container component="main" maxWidth="sm">
                <Paper elevation={3} sx={{padding: 4, mt: 4}}>
                    <Typography component="h1" variant="h5" align="center" gutterBottom>
                        Transfer Funds
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} sx={{mt: 2}}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="toAccount"
                                    label="To Account"
                                    name="toAccount"
                                    autoComplete="to-account"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="amount"
                                    label="Amount"
                                    name="amount"
                                    type="number"
                                    inputProps={{min: "0", step: "0.01"}}
                                    autoComplete="amount"
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            sx={{mt: 3, mb: 2}}
                        >
                            Transfer
                        </Button>
                    </Box>
                </Paper>
            </Container>
        );
    }
