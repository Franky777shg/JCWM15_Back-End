import React, { Component } from 'react';
import {
    Button,
    InputGroup,
    FormControl
} from 'react-bootstrap'
import { connect } from 'react-redux'

import { editProfile, upload } from '../actions'

import avatar from '../assets/no-profile.jpg'

const URL_IMG = 'http://localhost:2000/'
// http://localhost:2000/images/namafile

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            edit: false,
            image: null
        }
    }

    handleSave = () => {
        // get value from ref
        let gender = this.refs.gender.value
        let kota = this.refs.kota.value
        let umur = this.refs.umur.value
        // console.log(gender, kota, umur)

        const body = {
            gender,
            kota,
            umur
        }
        this.props.editProfile(body, this.props.id)
        this.setState({ edit: false })
    }

    handleChoose = (e) => {
        console.log('e target files', e.target.files)
        this.setState({ image: e.target.files[0] })
    }

    handleUpload = () => {
        const data = new FormData()
        console.log(data)
        data.append('IMG', this.state.image)
        console.log(data.get('IMG'))

        this.props.upload(data, this.props.id)
        this.setState({ image: null})
    }

    render() {
        const { gender, kota, umur, profile_pic } = this.props
        const { edit } = this.state
        return (
            <div style={styles.profileContainer}>
                <div style={styles.profileBox}>
                    <div
                        style={{
                            height: '100%',
                            width: '100%',
                            // backgroundColor: 'blue',
                            backgroundImage: `url(${profile_pic ? URL_IMG + profile_pic : avatar})`,
                            backgroundPosition: 'center',
                            backgroundSize: 'contain',
                            backgroundRepeat: 'no-repeat'
                        }}>
                    </div>
                    <div style={styles.buttonProfile}>
                        <form encType="multipart/form-data">
                            <input
                                type="file"
                                accept="image/*"
                                name="IMG"
                                onChange={(e) => this.handleChoose(e)}
                            />
                        </form>
                        <Button
                            className="button"
                            variant="success"
                            onClick={this.handleUpload}
                        >
                            Upload
                        </Button>
                    </div>
                    <div style={styles.profileInfo}>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="basic-addon1">Gender</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                defaultValue={gender ? gender : ''}
                                disabled={!edit}
                                ref="gender"
                            />
                        </InputGroup>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="basic-addon1">Kota</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                defaultValue={kota ? kota : ''}
                                disabled={!edit}
                                ref="kota"
                            />
                        </InputGroup>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="basic-addon1">Umur</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                aria-describedby="basic-addon1"
                                defaultValue={umur ? umur : ''}
                                disabled={!edit}
                                ref="umur"
                            />
                        </InputGroup>
                        <div style={styles.buttonContainer}>
                            {!edit ? <Button className="button" onClick={() => this.setState({ edit: true })}>Edit</Button> : null}
                            {edit ? <Button className="button" variant="success" onClick={this.handleSave}>Save</Button> : null}
                            {edit ? <Button className="button" variant="warning" onClick={() => this.setState({ edit: false })}>Cancel</Button> : null}
                        </div>
                    </div>
                </div>
            </div >
        );
    }
}

const styles = {
    profileContainer: {
        width: '100%',
        height: '90vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'violet'
    },
    profileBox: {
        width: '50vw',
        height: '75vh',
        // backgroundColor: 'yellowgreen',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '2% 5%',
    },
    profileInfo: {
        width: '100%',
        height: '50%',
        marginTop: '2%',
        padding: '3% 5%',
        display: 'flex',
        flexDirection: 'column',
        // backgroundColor: 'turquoise'
    },
    buttonProfile: {
        marginTop: '3%'
    },
    buttonContainer: {
        width: '100%',
        /* background-color: pink; */
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
    }
}

const mapStateToProps = (state) => {
    return {
        gender: state.user.gender,
        kota: state.user.kota,
        umur: state.user.umur,
        profile_pic: state.user.profile_pic,
        id: state.user.id_users
    }
}

export default connect(mapStateToProps, { editProfile, upload })(Profile);