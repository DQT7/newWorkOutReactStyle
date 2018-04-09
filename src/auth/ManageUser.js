import React from 'react';
import { Input, Form, Button, Label } from 'reactstrap';

class ManageUser extends React.Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    
    }
    handleSubmit(e) {
        e.preventDefault()
    
        let formData = new FormData();
        formData.append('user-img', e.target.myimg.files[0]);
    
        fetch('http://localhost:3000/api/user/upload-image', {
            method: 'POST',
            body: formData,
            headers: new Headers({
                'Authorization': this.props.sessionToken
            })
        }).then((res) => res.json())
            .then((data) => {
                this.props.addImage(data.imgRoute)
    
            })
    }
    render() {
        const showImg = this.props.profileImg ? <img src={`http://localhost:3000/${this.props.profileImg}`} alt="profile" /> : null
        return (
            <div>
                <h1>Add a image</h1>
                <Form onSubmit={this.handleSubmit}>
                    <Label for="exampleFile">File</Label>
                    <Input type="file" name="myimg" id="userimg" />
    
                    <Button type="submit"> Submit</Button>
                </Form>
    
                {showImg}
            </div>
        )
    }
}
export default ManageUser