import React from 'react';
import { Table, Button } from 'reactstrap';

const WorkoutTable = (props) => {
    
        props.workouts.map((workout, id) => {
            return (
                <tr key={id}>
                    <th scope="row">{workout.id}</th>
                    <td>{workout.result}</td>
                    <td>{workout.def}</td>
                    <td>{workout.description}</td>
                    <td>
                        <Button id={workout.id} onClick={props.delete} color="danger">Delete</Button>|
                        <Button id={workout.id} onClick={e => props.update(e, workout)} color="warning">Update</Button>
                    </td>
                </tr>
            )
        })
    }


export default WorkoutTable;