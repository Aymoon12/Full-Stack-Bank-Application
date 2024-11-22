import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import {getToken, getUser} from "../utils";
import axios from "axios";
import {useEffect} from "react";





// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount) {
    return { id, date, name, shipTo, paymentMethod, amount };
}

const rows = [
    createData(
        0,
        '16 Mar, 2019',
        'Elvis Presley',
        'Tupelo, MS',
        'VISA ⠀•••• 3719',
        312.44,
    ),
    createData(
        1,
        '16 Mar, 2019',
        'Paul McCartney',
        'London, UK',
        'VISA ⠀•••• 2574',
        866.99,
    ),
    createData(2, '16 Mar, 2019', 'Tom Scholz', 'Boston, MA', 'MC ⠀•••• 1253', 100.81),
    createData(
        3,
        '16 Mar, 2019',
        'Michael Jackson',
        'Gary, IN',
        'AMEX ⠀•••• 2000',
        654.39,
    ),
    createData(
        4,
        '15 Mar, 2019',
        'Bruce Springsteen',
        'Long Branch, NJ',
        'VISA ⠀•••• 5919',
        212.79,
    ),
];

function preventDefault(event) {
    event.preventDefault();
}

export default function Orders() {
    const[transactions, setTransactions] = React.useState([]);

    useEffect(() => {
        const getTransactions = async () => {
            const token = getToken();
            try {
                const response = await axios.get('http://localhost:8080/api/v1/transaction/getfive', {

                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                let transactions = response.data
                setTransactions(transactions)

            } catch (error) {

            }
        }
        getTransactions();


    }, []);



    return (

        <React.Fragment>
            <Title>Recent Transactions</Title>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell>From</TableCell>
                        <TableCell>To</TableCell>
                        <TableCell>Transaction ID</TableCell>
                        <TableCell align="right">Transfer Amount</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {transactions.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell>{row.transaction_date}</TableCell>
                            <TableCell>{row.account_number}</TableCell>
                            <TableCell>{row.destination_account}</TableCell>
                            <TableCell>{row.transaction_id}</TableCell>
                            <TableCell align="right">{`$${row.amount}`}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
                See more transactions
            </Link>
        </React.Fragment>
    );
}