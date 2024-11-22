import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';
import {useEffect, useState} from "react";
import {getToken} from "../utils";
import axios from "axios";

function preventDefault(event) {
    event.preventDefault();
}

export default function Deposits() {
    const [transaction, setTransaction] = useState('');


    useEffect(() => {


        const getTransaction = async () => {
            const token = getToken();
            try {
                const response = await axios.get('http://localhost:8080/api/v1/transaction/getRecent', {

                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                let transaction = response.data
                setTransaction(transaction);


            } catch (error) {
                const trans = {
                    amount: "None"
                }
                setTransaction(trans)
            }
        }
        getTransaction();


    }, []);

    return (
        <React.Fragment>
            <Title>Recent Deposit</Title>
            <Typography component="p" variant="h4">
                ${transaction.amount}
            </Typography>
            <Typography color="text.secondary" sx={{ flex: 1 }}>
                on 15 March, 2019
            </Typography>
            <div>
                <Link color="primary" href="#" onClick={preventDefault}>
                    View balance
                </Link>
            </div>
        </React.Fragment>
    );
}