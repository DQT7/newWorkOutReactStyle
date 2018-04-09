import React, { Component } from "react";
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { Container, Row, Col } from 'reactstrap';
class Signup extends Component {

    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            isEmpty: true
        };
        this.handleChange = this.handleChange.bind(this);
        this.validateSignUp = this.validateSignUp.bind(this);

    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
        });
        console.log(this.state)    
    }
    handleSubmit(event) {
        const submitHandler = !this.state.username ? this.validateSignUp : this.handleSubmit
        fetch("http://localhost:3000/api/user", {
            method: 'POST',
            body: JSON.stringify({user:this.state}),
            headers: new Headers({
                'Content-Type': 'application/json'
                })
            }).then(
                (response) => response.json()
            ).then((data) => {
                this.props.setToken(data.sessionToken)
        
            }) 
            event.preventDefault()
        }
        validateSignUp(event) {
            this.setState({
                errorMessage:'Fields must not be empty'
            })
            event.preventDefault();
        }

    render() {
        const submitHandler = this.handleSubmit  
        return (
            <div>
                <h1>Sign Up</h1>
                <h6>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus repellat, atque nulla, soluta vero reprehenderit numquam incidunt, rem quaerat quos voluptatum perferendis. Distinctio culpa iste atque blanditiis placeat qui ipsa?</h6>
                <Form>
                    <FormGroup onSubmit={submitHandler}>
                        <Label for="username">Username</Label>
                        <Input id="username" type="text" name="username" onChange={this.handleChange} placeholder="enter username" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">Password</Label>
                        <Input id="su_password" type="password" name="password" onChange={this.handleChange} placeholder="enter password" />
                    </FormGroup> 
                    <Button type="submit"> Submit </Button> 

                </Form>
            </div>
        )
    }


}

export default Signup;