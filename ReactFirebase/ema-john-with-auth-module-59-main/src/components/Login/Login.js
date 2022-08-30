import React from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import './Login.css';

const Login = () => {
    const { signInUsingGoogle } = useAuth();
    const location = useLocation();
    const history = useHistory();
    const redirect_uri = location.state?.from || '/shop';


    const handleGoogleLogin = () => {
        signInUsingGoogle()
            .then(result => {
                history.push(redirect_uri);
            })
    }

    return (
        <div className="login-form">
            <form action="action_page.php">
                <div class="container">
                    <h1>Sign Up</h1>
                    <p>Please fill in this form to create an account.</p>
                    <hr />

                    <label for="email"><b>Email</b></label>
                    <input type="text" placeholder="Enter Email" name="email" required />

                    <label for="psw"><b>Password</b></label>
                    <input type="password" placeholder="Enter Password" name="psw" required />
                    <p className="m-3">New to ema-john? <Link to="/register">
                        <br />Create Account</Link></p>
                    <button type="submit" onClick={handleGoogleLogin} class="signupbtn p-3 m-5">Google Sign up</button>

                </div>
            </form>
        </div>
    );
};

export default Login;