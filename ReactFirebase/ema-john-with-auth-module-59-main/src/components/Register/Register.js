import React from 'react';
import { Link } from 'react-router-dom';
import { useLocation, useHistory } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const Register = () => {
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
                    <h2>Register: Create Account</h2>
                    <hr />

                    <label for="email"><b>Email</b></label>
                    <input type="text" placeholder="Enter Email" name="email" required />

                    <label for="psw"><b>Password</b></label>
                    <input type="password" placeholder="Enter Password" name="psw" required />

                    <label for="psw-repeat"><b>Repeat Password</b></label>
                    <input type="password" placeholder="Repeat Password" name="psw-repeat" required />

                    <p>Already have an account? <Link to="/login">Login</Link></p>

                    <div class="clearfix">
                        <button type="submit" onClick={handleGoogleLogin} class="signupbtn p-3 m-5">Google Sign up</button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Register;