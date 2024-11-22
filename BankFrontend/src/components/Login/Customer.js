import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container, Paper, Button } from "@mui/material";
import { useState } from "react";
import axios from 'axios';
import BankLogo from '../images/BankLogo.png';
import { useNavigate } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import {DatePicker} from "@mui/lab";
import Grid from "@mui/material/Grid";


function TextButtons() {
    return (
        <Stack direction="row" spacing={10}>
            <Button href="/resetPassword" size={"small"}>Reset Password</Button>
        </Stack>
    );
}

function SignUp(){
    return (
        <Stack direction="row" spacing={10}>
            <Button href="/signUp" size={"small"}>Sign Up</Button>
        </Stack>
    );
}


export default function Login() {
    const paperStyle = { padding: '50px 20px', width: 600, margin: "20px auto" }
    const [username, setUserName] = useState(null);
    const [password, setPassword] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();


    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);

        if(!username || !password){
            alert("Login Failed! Username and Password are both required!")
            return;
        }
        const customer = { username, password };

        try {
            const response = await axios.post('http://localhost:8080/api/v1/auth/authenticate', customer, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (response.status === 200) {
                let token = response.data.token;
                console.log(token)
                localStorage.setItem('token', token);
                alert("Login Successful")
                navigate('/dashboard');
            }
            else
                    alert("Login Failed! Username or Password is incorrect!")

        } catch (error) {
            if (error.response) {
                // The server responded with a status other than 200 range
                alert(`Login Failed! Username or Password is incorrect!`);
            } else if (error.request) {
                // The request was made but no response was received
                alert('Login failed: No response from server.');
            } else {
                // Something happened in setting up the request
                alert(`Login failed: ${error.message}`);
            }
        }
    }

    return (
        <Box>
            <Container>
                <Paper elevation={3} style={paperStyle}>
                    <div className={"App"}>
                    <img src={BankLogo} width={100} height={100} alt={"Bank Logo"}  align={"center"} />
                    </div>
                    <h1 style={{ color: "black" }} className={"App"}><u>Customer Log in</u></h1>
                    <form noValidate autoComplete="off" onSubmit={handleLogin}>
                        <TextField id="outlined-basic" label="Username" variant="outlined" fullWidth
                                   value={username} onChange={(e) => setUserName(e.target.value)}
                        />
                        <TextField label="Password" type="password" fullWidth
                                   value={password} onChange={(e) => setPassword(e.target.value)}
                        />
                        <dnpmiv className={"ResetPass"}>
                            <TextButtons></TextButtons>
                        </dnpmiv>

                        <dnpmiv className={"center"}>
                            <Button variant="contained" color="secondary" type="submit">
                                Log in
                            </Button>
                        </dnpmiv>
                        <dnpmiv className={"SignUp"}>
                            <SignUp></SignUp>
                        </dnpmiv>
                    </form>
                </Paper>
            </Container>
        </Box>

    );
}

