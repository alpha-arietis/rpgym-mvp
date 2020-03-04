import React, { Component } from 'react'
//import axios from 'axios'
import AppContext from '../context/app.context'
import { Button } from 'reactstrap'

export default class Login extends Component {
    
    static contextType = AppContext

    state = {
        email: '',
        password: ''
    }

    onChangeEmail = (e) => {
        this.setState({
            email: e.target.value
        })
    }

    onChangePassword = (e) => {
        this.setState({
            password: e.target.value
        })
    }

    onSubmit = (e) => {
        e.preventDefault()

        const user = {
            email: this.state.email,
            password: this.state.password
        } 
        // this.setState({
        //     username: '',
        //     email: '',
        //     password: '',
            
        // })
        //console.log(user)

        this.context.loginSuccess(user)
        //console.log(this.context.isAuthenticated)
        //window.location = '/list'
    }

    onClickCancel = () => window.location = '/'

    render() {
        return(
            <div>
                <h3 className="text-center">Login</h3>
                <form onSubmit={this.onSubmit}>
                    <div className='form-group'>
                        <label>Email: </label>
                        <input id='email' name='email' type='email' required className='form-control' value={this.state.email} onChange={this.onChangeEmail}/>
                    </div>
                    <div className='form-group'>
                        <label>Password: </label>
                        <input id='password' name='password' type='password' required className='form-control' value={this.state.password} onChange={this.onChangePassword}/>
                    </div>
                    <div className='form-group'>
                        <Button type='submit' className='mt-5' color='primary' size='lg' block>Log In</Button>
                    </div>
                    <div className='form-group'>
                        <Button type='button' onClick={this.onClickCancel} className='mt-3' color='primary' size='lg' block>Cancel</Button>
                    </div>
                </form>
            </div>
        )
    }
}