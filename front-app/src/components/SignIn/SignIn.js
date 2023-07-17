import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import {Button, Alert, Row, Col} from 'react-bootstrap';
import Menu from "./Menu"
import LoginForm from "./LoginForm"

function SignIn() {
    return(
        <div className="App" style={{}}>
            <Menu />
            <div>
                <LoginForm />
            </div>
        </div>
    );
}

export default SignIn;