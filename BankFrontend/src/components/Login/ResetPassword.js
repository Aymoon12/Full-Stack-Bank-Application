import React from 'react';
import {Button, Container, Paper} from "@mui/material";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { useState } from "react";
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import {getToken} from "../utils";



function ResetPassword() {
    const paperStyle = { padding: '50px 20px', width: 600, margin: "20px auto" }
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [error, setError] = useState(null);
    let token = getToken();



    const searchUserName = async (e) => {
        e.preventDefault();
        setError(null)

        if(!userName){
            setError("A Username is required!")
        }
        else {
            try {
                const response = await axios.get('http://localhost:8080/api/v1/bank/checkUser?username=' + userName);

                const cus = response.data;

                if (cus) {
                    setStep(2);
                } else {
                    setError("User name does not exist");
                }

            } catch (e) {
                setError(e.message)

            }
        }

    };

    const updatePassword = async (e) => {
        e.preventDefault();
        setError(null);

        if(!userName || !password) {
            setError("A Password is required!")
        }
        else {
            try {
                const response = await axios.put('http://localhost:8080/api/v1/bank/updatePass', null,{
                        params: {
                            userName,
                            newPass: password
                        }
                    });

                if (response.status === 202) {
                    alert("Password updated successfully");
                    navigate("/");
                } else {
                    alert("Password not updated successfully");
                }


            } catch (e) {
                setError(e.message)
            }
        }
    }


    return (
        <Box>
            <Container>
                <Paper elevation={3} style={paperStyle}>
                    <h1 style={{color: "black"}} className={"App"}><u>Reset Password</u></h1>
                    {step === 1 && (
                        <div>
                            <TextField id="outlined-basic" label="Username" variant="outlined" fullWidth
                                       value={userName} onChange={(e) => setUserName(e.target.value)}
                            />

                            <dnpmiv className={"centerSU"} >
                        <Button variant="contained" color="secondary" type="submit" onClick={searchUserName}>
                            Search Username
                        </Button>
                            </dnpmiv>
                            {error && <p style={{ color: 'red' }}>{error}</p>}
                        </div>

                    )}

                    {step === 2 && (
                        <form noValidate autoComplete="off" onSubmit={updatePassword}>
                            <TextField
                                label="New Password"
                                type="password"
                                variant="outlined"
                                fullWidth
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <div style={{marginTop: '20px'}}>
                                <dnpmiv className={"centerSU"}>
                                    <Button variant="contained" color="secondary" type="submit">
                                        Update Password
                                    </Button>
                                </dnpmiv>
                            </div>
                            {error && <p style={{color: 'red'}}>{error}</p>}
                        </form>
                    )
                    }


                </Paper>
            </Container>
        </Box>
    )
        ;
}

export default ResetPassword;
