// main
import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom'

// redux
import { connect } from 'react-redux'
import { Login } from '../Redux/Action'

// API
import Axios from 'axios'
import { API_URL } from '../Support/API_URL'

// style
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

class LoginPage extends Component {
    state = {}

    onBtnLogin = () => {
        let username = this.username.value
        let password = this.password.value
        // console.log(this)
        // console.log(username)
        // console.log(password)
        Axios.get(`${API_URL}/users?username=${username}&password=${password}`)
            .then((res) => {
                // console.log(res)
                // console.log(res.data)
                if (res.data.length === 0) {
                    window.alert('user does not exist or invalid password')
                }
                let { id, username, email, role } = res.data[0]
                this.props.Login({
                    id,
                    username,
                    email,
                    role
                })
                localStorage.setItem('token', JSON.stringify({username, password}))
            })
            .catch(err => console.log(err))
    }

    render() {
        if (this.props.logged) {
            return (
                <Redirect to='/' />
            )
        }
        return (
            <div className="d-flex justify-content-center">
                <Form className='mt-3'>
                    <FormGroup>
                        <Label for="exampleUsername" style={{ textTransform: 'capitalize' }}>username</Label>
                        <Input type="text" name="username" id="username" placeholder="username" innerRef={(uName) => this.username = uName} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="examplePassword" style={{ textTransform: 'capitalize' }}>password</Label>
                        <Input type="password" name="password" id="password" placeholder="password" innerRef={(pass) => this.password = pass} />
                    </FormGroup>
                    <div className="d-flex justify-content-around">
                        <Button style={{ textTransform: 'capitalize' }} onClick={this.onBtnLogin}>
                            login
                    </Button>
                        <Link to='/register'>
                            <Button style={{ textTransform: 'capitalize' }}>register</Button>
                        </Link>
                    </div>
                </Form>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        logged: state.auth.logged
    }
}

export default connect(mapStateToProps, { Login })(LoginPage);