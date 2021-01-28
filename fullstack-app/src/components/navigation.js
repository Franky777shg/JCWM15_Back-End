import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import {
    Navbar,
    Nav,
    Dropdown
} from 'react-bootstrap'

import { logout } from '../actions'

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
                        <Nav.Link as={Link} to='/category'>Category</Nav.Link>
                    </Nav>
                    <Dropdown style={{ margin: '0 40px' }}>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            {this.props.username || 'username'}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {this.props.username
                                ?
                                <>
                                    <Dropdown.Item as={Link} to='/' onClick={this.props.logout}>Logout</Dropdown.Item>
                                    <Dropdown.Item as={Link} to='/verification'>Verification</Dropdown.Item>
                                    <Dropdown.Item as={Link} to='/profile'>Profile</Dropdown.Item>
                                </>
                                :
                                <>
                                    <Dropdown.Item as={Link} to='/login'>Login</Dropdown.Item>
                                    <Dropdown.Item as={Link} to='/register'>Register</Dropdown.Item>
                                </>
                            }
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

export default connect(mapStateToProps, { logout })(Navigation)