
import './App.css';
import Login from './components/Login/Customer'
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard'
import ResetPassword from "./components/Login/ResetPassword";
import {useState} from "react";
import SignUp from './components/Login/Signup';
import AddAccount from "./components/Account/AddAccount";
import ViewAccounts from "./components/Account/ViewAccounts";
import Transfer from "./components/Account/Transfer";

function App() {
    const [token, setToken] = useState(localStorage.getItem('token'));

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />}/>
                <Route path="/resetPassword" element={<ResetPassword/>}/>
                <Route path ="/signUp" element={<SignUp/>}/>
                <Route path = "/add-account" element={<AddAccount/>}/>
                <Route path = 'view-accounts' element={<ViewAccounts/>}/>
                <Route path="/transfer/:accountId" element={<Transfer />} />
            </Routes>
        </Router>
    );
}

export default App;
