import React, { Component } from 'react'
import axios from 'axios'
import AppContext from '../context/app.context'
import { Button } from 'reactstrap'
import url from './url'

export default class AddReps extends Component {
    
    static contextType = AppContext

    state = {
        username: '',
        description: '',
        totalLevels: 0,
        repsPerLevel: 0,
        currentReps: 0,
        currentXP: 0,
        totalXP: 0,
        //users: []
    }
    
    componentDidMount = () => {
        axios.get(`${url}exercises/${this.props.match.params.id}`)
        .then(res => {
            this.setState({
                username: res.data.username,
                description: res.data.description,
                totalLevels: res.data.totalLevels,
                repsPerLevel: res.data.repsPerLevel,
                currentReps: res.data.currentReps + 1,
                currentXP: res.data.currentReps/res.data.repsPerLevel,
                totalXP: res.data.currentXP/res.data.totalLevels
            })
            // PREBUILD console.log(res.data)
        })
        .catch(err => console.log(err))
        
        // axios.get('http://localhost:5000/users/')
        // .then(res => {
        //     if (res.data.length > 0) {
        //         this.setState({
        //             users: res.data.map(user => user.username),
        //         })
        //     }
        // })
    }

    addOneRep = () => {
        let tL = this.state.totalLevels
        let rPL = this.state.repsPerLevel
        let cR = this.state.currentReps

        this.setState({
            currentReps: cR + 1,
            currentXP: ((cR + 1) / rPL),
            totalXP: (((cR + 1) / rPL) / tL)
        })
    }

    removeOneRep = () => {
        let tL = this.state.totalLevels
        let rPL = this.state.repsPerLevel
        let cR = this.state.currentReps

        this.setState({
            currentReps: cR - 1,
            currentXP: ((cR - 1) / rPL),
            totalXP: (((cR - 1) / rPL) / tL)
        })
    }

    onSubmit = (e) => {
        
        //console.log(e.target.id)
        if (e.target.id === 'addOneRep') {
            this.addOneRep()
        } else if (e.target.id === 'removeOneRep') {
            this.removeOneRep()
        } else { return null }
        
        const exercise = {
            username: this.state.username,
            description: this.state.description,
            totalLevels: this.state.totalLevels,
            repsPerLevel: this.state.repsPerLevel,
            currentReps: this.state.currentReps,
            currentXP: this.state.currentXP, // currentReps/repsPerLevel
            totalXP: this.state.totalXP // currentXP / totalLevels
        } 
        
        // PREBUILD console.log(exercise.currentReps)
        
        axios.post(`${url}exercises/update/${this.props.match.params.id}`, exercise)
        .then(res => console.log(res.data))
    }

    onClickCancel = () => window.location = '/list'

    render() {
        if (this.context.isAuthenticated) {
        return(
            <div>
                <h3 className="text-center">Exercise Reps</h3>
                <form onSubmit={this.onSubmit}>
                   <br/>
                    <div className='form-group'>
                        <Button type='button' onClick={this.onSubmit} id='removeOneRep'  className='mt-5 w-50 mx-auto' color='danger' size='lg' block>-1 REP</Button>
                    </div>
                    <div className='form-group'>
                        <Button type='button' onClick={this.onSubmit} id='addOneRep' className='mt-4 w-50 mx-auto p-5' color='success' size='lg' block>+1 REP</Button>
                    </div>
                    <br/>
                    <div className='form-group'>
                        <Button type='button' onClick={this.onClickCancel} id='removeOneRep' className='mt-5' color='primary' size='lg' block>Back</Button>
                    </div>
                </form>
            </div>
        ) } else {return (<h2 className='text-center'>Please log in or register to view this page</h2>)}
    }
}