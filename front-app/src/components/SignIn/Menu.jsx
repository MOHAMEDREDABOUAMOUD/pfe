import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../images/logo-omrane.png';
const Menu = () => {
    return(
        <div>
           <Navbar expand="lg" className="bg-body-tertiary bg-dark">
      <Container>
        <Navbar.Brand href="#"><img src={logo} style={{width:'50px',margin:'0px',padding:'0px'}} alt="" /></Navbar.Brand>
      </Container>
    </Navbar>
        </div>
    );
}

export default Menu;