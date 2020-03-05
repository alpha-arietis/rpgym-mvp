import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'
import Navbar from './components/navbar.component'
import ExercisesList from './components/exercise-list.component'
import EditExercise from './components/edit-exercise.component'
import CreateExercise from './components/create-exercise.component'
import RegisterUser from './components/register-user.component'
import AddReps from './components/add-reps.component';
import Login from './components/login.component'
import LandingScreen from './components/landing.screen.component'
import url from './components/url'
import AppContext from './context/app.context'



class App extends Component {
  
   state = {
    // User Auth
    token: localStorage.getItem('token'),
    isAuthenticated: localStorage.getItem('isAuthenticated'),
    userLoading: false,
    user: JSON.parse(localStorage.getItem('user')),
    // Exercises
    //exercises: [],
    //exerciseLoading: false
  }
  
  registerSuccess = user => {
    axios.post(`${url}users/register`, user)
    .then(res => {
    localStorage.setItem('token', res.data.token)
    // added below
    localStorage.setItem('isAuthenticated', true)
    localStorage.setItem('user', JSON.stringify(res.data.user))
    this.setState({
      token: localStorage.getItem('token'),
      //isAuthenticated: true,
      isAuthenticated: localStorage.getItem('isAuthenticated'),
      userLoading: false,
      user: JSON.parse(localStorage.getItem('user'))
      //user: res.data.user
    })
    // PREBUILD console.log(this.state)
    window.location = '/list'
    })   
    .catch(err => alert(err.response.data.msg))
  }

    loginSuccess = user => {
      axios.post(`${url}users/login`, user)
      .then(res => {
      localStorage.setItem('token', res.data.token)
      // added below
      localStorage.setItem('isAuthenticated', true)
      localStorage.setItem('user', JSON.stringify(res.data.user))
      this.setState({
        token: localStorage.getItem('token'),
        isAuthenticated: localStorage.getItem('isAuthenticated'),
        userLoading: false,
        user: JSON.parse(localStorage.getItem('user'))
      })
      // PREBUILD console.log(this.state.user)
      window.location = `/list`
      })   
      .catch(err => alert(err.response.data.msg))
    }

    logoutSuccess = () => {
      localStorage.removeItem('token')
      localStorage.removeItem('isAuthenticated')
      localStorage.removeItem('user')
      this.setState({
        token: null,
        user: null,
        isAuthenticated: false,
        userLoading: false})
      // PREBUILD console.log(this.state)
      window.location = '/'
    }

    tokenConfig = () => {
      // Get Token from Localstorage
      const token = this.state.token // will look at initialState object in authReducer file
      // Add Token to Headers
      const config = {
        headers: {
            "Content-Type": "application/json"
        }}
      // If Token then Add to Headers
      if(token) {
        config.headers['x-auth-token'] = token
    }
      return config
    }

  render() {
  return (
    <AppContext.Provider value={{
      token: this.state.token,
      isAuthenticated: this.state.isAuthenticated,
      userLoading: this.state.userLoading,
      user: this.state.user,
      loginSuccess: this.loginSuccess,
      logoutSuccess: this.logoutSuccess,
      tokenConfig: this.tokenConfig,
      registerSuccess: this.registerSuccess,
      //exercises: this.state.exercises,
      //exerciseLoading: this.state.exerciseLoading
    }}>
      <Router>
        <div className='container-sm'>
          <Navbar/>
          <br/>
          <Route path='/' exact component={LandingScreen} />
          <Route path='/login' component={Login} /> 
          <Route path='/list' component={ExercisesList} />
          <Route path='/edit/:id' component={EditExercise} />
          <Route path='/create' component={CreateExercise} />
          <Route path='/register' component={RegisterUser} />
          <Route path='/addreps/:id' component={AddReps} />
        </div>
      </Router>
    </AppContext.Provider>
  )
}
}

export default App;
