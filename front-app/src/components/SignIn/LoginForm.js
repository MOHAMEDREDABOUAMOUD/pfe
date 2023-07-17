import React from "react";
import './LoginForm.css'
import 'bootstrap/dist/css/bootstrap.css'
import { Link } from "react-router-dom";

function LoginForm() {
    return(
        <div className="wrapper bg-light d-flex align-items-center justify-content-center w-100">
            <div className="login">
                <h2 className="mb-3">Sign In</h2>
                <form className="needs-validation">
                    <div className="form-group was-validated mb-2">
                        <label className="form-label" htmlFor="email">Email Address</label>
                        <input className="form-control" type="email" required></input>
                        <div className="invalid-feedback">
                            please Enter Your Email
                        </div>
                    </div>
                    <div className="form-group was-validated mb-2">
                        <label className="form-label" htmlFor="password">Password</label>
                        <input className="form-control" type="password" required></input>
                        <div className="invalid-feedback">
                            please Enter Your Password
                        </div>
                    </div>
                    <div className="form-group form-check mb-2">    
                        
                        <label htmlFor="check" className="form-check-label"><a href=''>Forgot Password?</a></label>
                    </div>
                    <button type="submit" className="btn btn-success w-100 mt-2">Sign In</button>
                </form>
            </div>
        </div>
    )
}

export default LoginForm;