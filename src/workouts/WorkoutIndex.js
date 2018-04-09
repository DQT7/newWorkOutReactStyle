import React from 'react';
import WorkoutCreate from './WorkoutCreate';
import WorkoutEdit from './WorkoutEdit';
import { Container, Row, Col } from 'reactstrap';
import WorkoutsTable from './WorkoutsTable';

class WorkoutIndex extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            workouts: [],
            updatePressed: false,
            workoutById: 0,
            workoutToUpdate: {}
        }
        this.fetchWorkouts = this.fetchWorkouts.bind(this);
        this.updateWorkoutsArray = this.updateWorkoutsArray.bind(this);
        this.workoutDelete = this.workoutDelete.bind(this);
        this.workoutUpdate = this.workoutUpdate.bind(this);
        this.setUpdatedWorkout = this.setUpdatedWorkout.bind(this);
    }
    fetchWorkouts() {
        fetch("http://localhost:3000/api/log", {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.props.token
            })
        })
            .then((res) => res.json())
            .then((logData) => {
                return this.setState({ workouts: logData })
            })
    }
    componentWillMount() {
        this.fetchWorkouts()
    }
    workoutDelete(event) {
        fetch("http://localhost:3000/api/log", {
            method: 'DELETE',
            body: JSON.stringify({ log: { id: event.target.id } }),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.props.token
            })
        })
            .then((res) => this.updateWorkoutsArray())
    }
    updateWorkoutsArray() {
        this.fetchWorkouts()
    }
    workoutUpdate(event, workout) {
        fetch("http://localhost:3000/api/log", {
            method: 'PUT',
            body: JSON.stringify({ log: workout }),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.props.token
            })
        })
            .then((res) => {
                this.setState({ updatePressed: false })
                this.fetchWorkouts();
            })
    }
    setUpdatedWorkout(event, workout) {
        this.setState({
            workoutToUpdate: workout,
            updatePressed: true
        })
    }

    render(){
        const workouts = this.state.workouts.length >= 1 ?
        <WorkoutsTable workouts={this.state.workouts} token={this.props.token} delete={this.workoutDelete} update={this.setUpdatedWorkout} /> :
        <h2>Log a workout to see table</h2>

        return (
            <Container>
            <Row>
                <Col md="3">
                    <WorkoutCreate token={this.props.token} updateWorkoutsArray={this.updateWorkoutsArray} workoutId={this.state.workoutById} updatePressed={this.state.updatePressed} />
                </Col>
                <Col md="9">
                    {workouts}
                </Col>
            </Row>
            <Col md="12">
                {
                    this.state.updatePressed ? <WorkoutEdit t={this.state.updatePressed} update={this.workoutUpdate} workout={this.state.workoutToUpdate} /> : <div></div>
                }
            </Col>
        </Container>
        )
    }
}

export default WorkoutIndex;