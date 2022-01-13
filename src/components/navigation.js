import React from "react";
import { Button, Container, Form, FormControl, Nav, Navbar } from "react-bootstrap";

import trans from '../assets/i18n/mm.json';
import '../assets/css/navigation.css';

const Navigation = (props) => {

    const linkTo = (url) => {
        const { history } = props.props;
        console.log(url);
        history.push(url);
    }

    return(
        <Navbar className="navigation-wrapper" expand={false}>
            <Container fluid>
                <Navbar.Brand>
                    <h3 className="navigation-title"> Kubota POS Myanmar </h3>
                </Navbar.Brand>

                <Nav className="me-auto nav-link-wrapper">
                    {
                        trans.menu.map((value, index) => {
                            return(
                                <Nav.Link 
                                    className="nav-link-item"
                                    key={index} 
                                    onClick={e => linkTo(value.link)}
                                >
                                    <label> {value.label} </label>
                                </Nav.Link>
                            )
                        })
                    }

                </Nav>

                <div className="d-flex">
                        <FormControl
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                        />
                        <Button variant="outline-success">Search</Button>
                </div>
        
            </Container>
        


    </Navbar>

    )
}

export default Navigation;