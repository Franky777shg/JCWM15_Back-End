import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import {
    Navbar,
    Nav,
    Dropdown
} from 'react-bootstrap'

class Navigation extends React.Component {
    render() {
        return (
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link as={Link} to='/'>Home</Nav.Link>
                        <Nav.Link as={Link} to='/product'>Product</Nav.Link>
                    </Nav>
                    <Dropdown style={{ margin: '0 40px' }}>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            {this.props.username || 'username'}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item as={Link} to='/login'>Login</Dropdown.Item>
                            <Dropdown.Item as={Link} to='/register'>Register</Dropdown.Item>
                            <Dropdown.Item href="#action/3.3">Something</Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item href="#action/3.4">Separated link</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        username: state.user.username
    }
}

export default connect(mapStateToProps) (Navigation)