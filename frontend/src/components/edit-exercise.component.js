import React, { Component } from 'react'
import axios from 'axios'
import AppContext from '../context/app.context'
import { Button } from 'reactstrap'

export default class EditExercise extends Component {
    
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
        axios.get(`http://localhost:5000/exercises/${this.props.match.params.id}`)
        .then(res => {
            this.setState({
                username: res.data.username,
                description: res.data.description,
                totalLevels: res.data.totalLevels,
                repsPerLevel: res.data.repsPerLevel,
                currentReps: res.data.currentReps,
                currentXP: res.data.currentXP,
                totalXP: res.data.totalXP
            })
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

    calculateXP = () => {
        let tL = this.state.totalLevels
        let rPL = this.state.repsPerLevel
        let cR = this.state.currentReps

        this.setState({
            currentReps: cR,
            currentXP: ((cR) / rPL),
            totalXP: (((cR) / rPL) / tL)
        })
    }

    onClickCancel = () => {
        window.location = '/list'
    }

    onSubmit = (e) => {
        e.preventDefault()

       this.calculateXP()

        const exercise = {
            username: this.state.username,
            description: this.state.description,
            totalLevels: this.state.totalLevels,
            repsPerLevel: this.state.repsPerLevel,
            currentReps: this.state.currentReps,
            currentXP: this.state.currentXP,
            totalXP: this.state.totalXP
        }
        // PREBUILD console.log(exercise)
        
        axios.post(`http://localhost:5000/exercises/update/${this.props.match.params.id}`, exercise)
        // PREBUILD .then(res => console.log(res.data))
        window.location = '/list'
    }

    render() {
        if(this.context.isAuthenticated) {
        return(
            <div>
                <h3 className="text-center">Edit Exercise</h3>
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
                        <label>Reps/Level: </label>
                        <input type='number' required className='form-control' value={this.state.repsPerLevel} onChange={this.onChangeRepsPerLevel}/>
                    </div>
                    <div className='form-group'>
                        <Button type='submit' className='mt-5' color='primary' size='lg' block>Update Exercise</Button>
                    </div>
                    <div className='form-group'>
                        <Button type='button' onClick={this.onClickCancel} className='mt-3' color='primary' size='lg' block>Cancel</Button>
                    </div>
                </form>
            </div>
        ) } else {return (<h2 className='text-center'>Please log in or register to view this page</h2>)}
    }
}