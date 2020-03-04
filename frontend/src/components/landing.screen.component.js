import React, { Component, Fragment } from 'react'
import { Button } from 'reactstrap'
import AppContext from '../context/app.context'

export default class LandingScreen extends Component {
    
    static contextType = AppContext

    onClickLogin = () => {
        window.location = '/login'
    }

    onClickRegister = () => {
        window.location = '/register'
    }

    render() {

    const guestButtons = (
        <Fragment>
            <Button onClick={this.onClickLogin} className='mt-4' color='primary' size='lg' block>Log In</Button>
            <Button onClick={this.onClickRegister} className='mt-3' color='primary' size='lg' block>Register</Button>
        </Fragment>
    )

    const authButtons = (
        <Fragment>
            <Button onClick={this.context.logoutSuccess} className='mt-4' color='primary' size='lg' block>Log Out</Button>
        </Fragment>
    )

        return(
            <div className='container' style={{textAlign: 'center'}}>
                <h1>RPGym</h1>
                <img src="https://i.ya-webdesign.com/images/charmander-sprite-png-8.png" className="img-fluid mt-3" alt=""/>
                <br/>
                { this.context.isAuthenticated ? authButtons : guestButtons }
            </div>
        )
    }
}