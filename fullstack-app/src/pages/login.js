import React from 'react'
import {
    InputGroup,
    FormControl,
    Button,
    Modal
} from 'react-bootstrap'

import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { login, logout } from '../actions'

class LoginPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: false,
            loginError: [false, ""],
            toHome: false
        }
    }

    handleLogin = () => {
        let username = this.refs.username.value;
        let password = this.refs.password.value;

        console.log(username, password);
        if (!username || !password) return this.setState({ loginError: [true, "Please Input All Form"] })

        const body = {
            username,
            password
        }
        this.props.login(body)
        this.setState({ loginError: [false, ""], toHome: true })
    };

    render() {
        if (this.props.username) return <Redirect to="/" />
        const { visible } = this.state

        return (
            <div style={styles.container}>
                <div style={styles.center}>
                    <div style={{ marginBottom: '10px' }}>
                        <h1>Login</h1>
                    </div>
                    <div style={{ width: '100%', height: 'auto', marginButtom: '5px', textAlign: 'center' }}>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="basic-addon1" style={{ width: '45px', display: 'flex', justifyContent: 'center' }}>
                                    <i className="fas fa-user" ></i>
                                </InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                placeholder="Username"
                                aria-label="Username"
                                aria-describedby="basic-addon1"
                                ref="username"
                            />
                        </InputGroup>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend style={{ cursor: 'pointer' }}
                                onClick={() => this.setState({ visible: !visible })}>
                                <InputGroup.Text id="basic-addon1" style={{ width: '45px', display: 'flex', justifyContent: 'center' }}>
                                    <i className={visible ? "fas fa-eye" : "fas fa-eye-slash"}></i>
                                </InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                placeholder="Password"
                                aria-label="Password"
                                aria-describedby="basic-addon1"
                                ref="password"
                                type={visible ? "text" : "password"}
                            />
                        </InputGroup>
                        <Button onClick={this.handleLogin} style={{ margin: "10px" }}>
                            Login
                            <i className="fas fa-sign-in-alt" style={{ marginLeft: "8px" }} />
                        </Button>
                        <p>Do you have an account? <Link to='/register'>Register Here</Link> </p>
                    </div>
                </div>
                <Modal show={Boolean(this.props.msgError)} onHide={this.props.logout}>
                    <Modal.Header closeButton>
                        <Modal.Title>Error</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <p>{this.props.msgError}</p>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="primary" onClick={this.props.logout}>
                            Okay
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        height: '100vh',
        background: "url(https://images.unsplash.com/photo-1560072810-1cffb09faf0f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80) no-repeat center",
        backgroundSize: 'cover'
    },
    center: {
        marginTop: '100px',
        padding: '10px 30px',
        width: '350px',
        height: '50vh',
        backgroundColor: 'rgba(255, 255, 255, .7)',
        display: 'flex',
        flexDirection: "column",
        alignItems: "center",
        border: "1px solid gray",
        borderRadius: "30px"
    },
    item: {
        width: '100%',
        height: 'auto',
        marginButtom: '5px'
    }
}

const mapStateToProps = (state) => {
    return {
        username: state.user.username,
        msgError: state.user.errLogin
    }
}

export default connect(mapStateToProps, { login, logout })(LoginPage)