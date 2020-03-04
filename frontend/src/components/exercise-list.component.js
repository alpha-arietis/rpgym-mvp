import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import AppContext from '../context/app.context'    
// totalLevels
// repsPerLevel
// currentReps
// currentXP 
// totalXP

const Exercise = props => (
    <tr>
        <td>{props.exercise.description}</td>
        <td>{`${(props.exercise.currentXP).toFixed(2).split('.', 2)[1]}%`}</td>
        <td>{`${Math.floor(props.exercise.currentXP)}/${props.exercise.totalLevels}`}</td>
        <td>
            <Link to={`/addreps/${props.exercise._id}`}>reps</Link> | <Link to={`/edit/${props.exercise._id}`}>edit</Link> | <a href='#' onClick={() => {props.deleteExercise(props.exercise._id)}}>delete</a>
        </td>
    </tr>
)

export default class ExerciseList extends Component {
    
    static contextType = AppContext

    state = {
        exercises: []
    }
    
    componentDidMount = () => {
        axios.get('http://localhost:5000/exercises/', this.context.tokenConfig())
        .then(res => {
            const exercisesByUserId = res.data
            this.setState({
                exercises: exercisesByUserId
            }) 
        })
        .catch((err) => console.log(err.response.data.msg))
    }

    deleteExercise = (id) => {
        axios.delete(`http://localhost:5000/exercises/${id}`)
        // PREBUILD .then(res => console.log(res.data))
        this.setState({
            exercises: this.state.exercises.filter(el => el._id !== id)
        })
    }

    exerciseList = () => {
        return this.state.exercises.map(currentexercise => {
            return <Exercise exercise={currentexercise} deleteExercise={this.deleteExercise} key={currentexercise._id}/>
    })}

    render() {
        if(this.context.isAuthenticated) {
        return(
            <div>
                <h3 className="text-center">Exercises</h3>
                <table className='table'>
                    <thead className='thead-light'>
                        <tr>
                            <th>Exercise</th>
                            <th>XP</th>
                            <th>LVL</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>{ this.exerciseList() }</tbody>
                </table>
            </div>
        )} else { return(<h2 className='text-center'>Please log in or register to view this page</h2>)  }
    }
}