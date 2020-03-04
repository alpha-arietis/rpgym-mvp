import React, { Component } from 'react'
import axios from 'axios'
import AppContext from '../context/app.context'
import { Button } from 'reactstrap'
import url from './url'
    

export default class CreateExercise extends Component {
    
    static contextType = AppContext

    state = {
        username: '',
        description: '',
        totalLevels: 0,
        repsPerLevel: 0,
        currentReps: 0,
        currentXP: 0,
        totalXP: 0,
        users: []
    }
    
    componentDidMount = () => {
        if (this.context.user) {
        //console.log(this.context.user.id)
        axios.get(`${url}users/${this.context.user.id}`, this.context.tokenConfig())
        .then(res => {
                //console.log(res.data.username)
            // if (res.data.length > 0) {
                this.setState({
            //      users: res.data.map(user => user.username),
                username: res.data.username,
                })
            //}
        })
    }
    }
    // onChangeUsername = (e) => {
    //     this.setState({
    //         username: e.target.value
    //     })
    // }

    onChangeDescription = (e) => {
        this.setState({
            description: e.target.value
        })
    }

    onChangeTotalLevels = (e) => {
        this.setState({
            totalLevels: e.target.value
        })
    }

    onChangeRepsPerLevel = (e) => {
        this.setState({
            repsPerLevel: e.target.value
        })
    }

    onClickCancel = () => {
        window.location = '/list'
    }

    onSubmit = (e) => {
        e.preventDefault()

        const exercise = {
            username: this.state.username,
            description: this.state.description,
            totalLevels: this.state.totalLevels,
            repsPerLevel: this.state.repsPerLevel,
            currentReps: this.state.currentReps,
            currentXP: this.state.currentXP,
            totalXP: this.state.totalXP
        } 
        //console.log(exercise)
        axios.post(`${url}exercises/add`, exercise, this.context.tokenConfig())
        // PREBUILD .then(res => console.log(res.data))
        window.location = '/list'
    }

    render() {
        if(this.context.isAuthenticated) {
        return(
            <div>
                <h3 className="text-center">Add Exercise</h3>
                <form onSubmit={this.onSubmit}>
                    
                    <div className='form-group'>
                        <label>Title: </label>
                        <input type='text' required className='form-control' value={this.state.description} onChange={this.onChangeDescription}/>
                    </div>
                    <div className='form-group'>
                        <label>Total Levels: </label>
                        <input type='number' required className='form-control' value={this.state.totalLevels} onChange={this.onChangeTotalLevels}/>
                    </div>
                    <div className='form-group'>
                        <label>Reps per Level: </label>
                        <input type='number' required className='form-control' value={this.state.repsPerLevel} onChange={this.onChangeRepsPerLevel}/>
                    </div>
                    <div className='form-group'>
                        <Button type='submit' className='mt-5' color='primary' size='lg' block>Add Exercise</Button>
                    </div>
                    <div className='form-group'>
                        <Button type='button' onClick={this.onClickCancel} className='mt-3' color='primary' size='lg' block>Cancel</Button>
                    </div>
                </form>
            </div>
        )} else {return (<h2 className='text-center'>Please log in or register to view this page</h2>)}
    }
}