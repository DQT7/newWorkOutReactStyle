import React, { Component } from "react";
import { Form, FormGroup, Label, Input } from 'reactstrap';
import { Container, Row, Col, Button} from 'reactstrap';




class Login extends Component {

    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
         
        };
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
        });
        console.log(this.state)    
    }
    handleSubmit(event) {
        fetch("http://localhost:3000/api/login", {
            method: 'POST',
            body: JSON.stringify({user:this.state}),
            headers: new Headers({
                'Content-Type': 'application/json'
                })
        }).then(
            (response) => response.json()
        ).then((data) => {
            this.props.setToken(data.sessionToken)
        }).then((data) => {
        this.props.setToken(data.sessionToken)
        this.props.addImage(data.user.img)
    })
        event.preventDefault()
    }

    render() {
        return (
            <div>
                <h1>Login</h1>
                <h6>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus repellat, atque nulla, soluta vero reprehenderit numquam incidunt, rem quaerat quos voluptatum perferendis. Distinctio culpa iste atque blanditiis placeat qui ipsa?</h6>
                <Form>
                    <FormGroup>
                        <Label for="username">Username</Label>
                        <Input id="li_username" type="text" name="username" onChange={this.handleChange} placeholder="enter username" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">Password</Label>
                        <Input id="li_password" type="password" name="password" onChange={this.handleChange} placeholder="enter password" />
                    </FormGroup>
                    <Button type="submit"> Submit </Button>
                </Form>
            </div>
        )
    }


}

export default Login;