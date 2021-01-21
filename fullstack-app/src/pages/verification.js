import React from 'react'
import Axios from 'axios'
import { Link } from 'react-router-dom'
import {
    Button
} from 'react-bootstrap'

class Verification extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            verified: false
        }
    }

    async componentDidMount() {
        // get token from query url
        const token = this.props.location.search.substring(1)
        console.log('did mount')

        try {
            const res = await Axios.post('http://localhost:2000/user/verification', { token })
            console.log('hasil verification', res.data)

            this.setState({ verified: true })
        }
        catch (err) {
            console.log(err)
        }
    }

    render() {
        return (
            <div>
                {this.state.verified
                    ?
                    <>
                        <h3>Your Account has been verified</h3>
                        <Button as={Link} to='/'>
                            Go to Home
                        </Button>
                    </>
                    :
                    <h3>Waiting for email verification...</h3>
                }
            </div>
        );
    }
}

export default Verification;