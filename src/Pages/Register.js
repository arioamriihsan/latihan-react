// main
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'

// API
import Axios from 'axios'
import { API_URL } from '../Support/API_URL'

// redux
import { connect } from 'react-redux'
import { Login} from '../Redux/Action'

// style
import { Form, FormGroup, Label, Input, Button } from 'reactstrap'
import { Link } from 'react-router-dom';

class Register extends Component {
    state = {}

    onBtnRegister = () => {
        let username = this.username.value
        let email = this.email.value
        let password = this.password.value
        let confirmPass = this.confirmPass.value

        if( password === confirmPass ) {
            Axios.get(`${API_URL}/users?username=${username}`)
            .then((res) => {
                // console.log(res)
                if( res.data.length > 0 ) {
                    window.alert('Username already exist')
                }else{
                    Axios.post(`${API_URL}/users`, {
                        username,
                        email,
                        password,
                        role: 'user'
                    })
                    .then((res) => {
                        let { id, username, email, role } = res.data
                        this.props.Login({
                            id,
                            username,
                            email,
                            role
                        })
                    })
                }
            })
            .catch(err => console.log(err))
        }else{
            window.alert('Invalid Password')   
        }
    }

    render() {
        if( this.props.logged ) {
            return(
                <Redirect to='/' />
            )
        }
        return (
            <div className='d-flex justify-content-center' style={{height: '100vh', alignItems: 'center'}}>
                <Form width='400px' height='400px'>
                    <FormGroup>
                        <Label for="exampleUsername">Username</Label>
                        <Input type="text" name="username" id="username" placeholder="Username" innerRef={(username) => this.username = username}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleEmail">Email</Label>
                        <Input type="text" name="email" id="email" placeholder="Email" innerRef={(email) => this.email = email}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="examplePassword">Password</Label>
                        <Input type="password" name="password" id="password" placeholder="password" innerRef={(password) => this.password = password}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleConfirmPass">Confirm Password</Label>
                        <Input type="password" name="confirmPass" id="confirmPass" placeholder="Password" innerRef={(confirmPass) => this.confirmPass = confirmPass}/>
                    </FormGroup>
                    <div style={{display: 'flex', justifyContent: 'space-around'}}>
                        <Button onClick={this.onBtnRegister}>
                            Register
                        </Button>
                        <Link to='/login'>
                            <Button>
                                Login
                            </Button>
                        </Link>
                    </div>
                </Form>
            </div>
        );
    }
}

const mapStatetoProps = (state) => {
    return{
        logged : state.auth.logged
    }
}

export default connect(mapStatetoProps, { Login }) (Register);