
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from "axios";
import { useNavigate } from 'react-router-dom';


const defaultTheme = createTheme();
export default function SignUp() {
    const navigate = useNavigate();

    const [dob, setDob] = React.useState({ year: '', month: '', day: '' });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setDob({
            ...dob,
            [name]: value
        });
    };

    const handleSubmit = async (event) => {

        const formattedDob = `${dob.year}-${dob.month.padStart(2, '0')}-${dob.day.padStart(2, '0')}`;

        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const customer = {
            name: data.get('name'),
            email: data.get('email'),
            phone_number: data.get('phone'),
            address: data.get('address'),
            dob: formattedDob,
            password: data.get('password'),
            username: data.get('username')
        };

        try {
            const response = await axios.post('http://localhost:8080/api/v1/auth/register', customer, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if(response.status === 200){
                alert("Successfully Signed Up!")
                navigate('/')

            }
            else
                alert("Something went wrong")
        } catch (e) {
            alert(e.message)
        }


    };

    return (
        <Box>

        <ThemeProvider theme={defaultTheme}>

                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} >
                                <TextField
                                    autoComplete="given-name"
                                    name="name"
                                    required
                                    fullWidth
                                    id="name"
                                    label="Name"
                                    autoFocus
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="phone"
                                    label="Phone Number (111-111-111)"
                                    name="phone"
                                    autoComplete="phone"
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="address"
                                    label="Address"
                                    name="address"
                                    autoComplete="address"
                                />
                            </Grid>


                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="username"
                                    label="Username"
                                    name="username"
                                    autoComplete="username"
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    required
                                    fullWidth
                                    name="year"
                                    label="Year"
                                    type="number"
                                    id="year"
                                    value={dob.year}
                                    onChange={handleInputChange}
                                    inputProps={{ min: "1900", max: new Date().getFullYear().toString() }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    required
                                    fullWidth
                                    name="month"
                                    label="Month"
                                    type="number"
                                    id="month"
                                    value={dob.month}
                                    onChange={handleInputChange}
                                    inputProps={{ min: "1", max: "12" }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    required
                                    fullWidth
                                    name="day"
                                    label="Day"
                                    type="number"
                                    id="day"
                                    value={dob.day}
                                    onChange={handleInputChange}
                                    inputProps={{ min: "1", max: "31" }}
                                />
                            </Grid>


                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={<Checkbox value="allowExtraEmails" color="primary" />}
                                    label="I want to receive inspiration, marketing promotions and updates via email."
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            sx={{
                                mt: 3,
                                mb: 2,
                                bgcolor: 'primary.main',
                                '&:hover': {
                                    bgcolor: 'primary.dark',
                                },
                            }}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="#" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>

        </ThemeProvider>

        </Box>
    );
}

