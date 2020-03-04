import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import AppContext from '../context/app.context'

export default class Navbar extends Component {
    
    static contextType = AppContext

    render() {
        const isAuthenticated = this.context.isAuthenticated

        const authLinks = (
            <Fragment>
                <li className='navbar-item'>
                    <Link to='/list' className='nav-link'>My Exercises</Link>
                </li>
                <li className='navbar-item'>
                    <Link to='/create' className='nav-link'>Add New</Link>
                </li>
                
            </Fragment>
        )

        const guestLinks = (
            <Fragment>

            </Fragment>
        )

        return (
            <nav className='navbar navbar-dark bg-dark navbar-expand'>
                <a className="navbar-brand" href="/">
                    <img src="https://lh5.googleusercontent.com/proxy/7boJZHkSgXcCBhClJD36Tr3xwurFqbH22bYBUtHLAPpu-Y5t58wXiXtu5suBPpiDEXlKMOf3-hkAwkHsB8zR9xSBggvelzf6wx4o52vPJuFtWe45grJZYTa5Cmt6xuXv9JczJPY" width="35" height="35" alt=""/>
                </a>
                <div className='collapse navbar-collapse'>
                    <ul className='navbar-nav mr-auto'>
                    { isAuthenticated ? authLinks : guestLinks }
                    </ul>
                </div>
            </nav>

        )
    }
}