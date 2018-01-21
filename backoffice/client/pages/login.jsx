import React, { Component } from 'react'
import { Meteor } from 'meteor/meteor';
import { Col, Row } from 'react-bootstrap'
import { Form, Button, Panel } from 'react-bootstrap'


export default class Login extends Component {
    state = {
        email: '',
        password: '',
        error : false,
        validationErrors : {}
    };

    constructor(props){
        super(props);
    }

    handleSubmit = (e) => {
        e.preventDefault();

        //Validate all inputs
        let submit = true;
        if(!submit)
            return;

        Meteor.loginWithPassword(this.state.email, this.state.password, (err) => {
            if(err){
                if(err.reason == "You've been logged out by the server. Please log in again."){
                    err.reason = "Su cuenta no ha sido activada aún. Por favor, revise su email y actívela."
                }
                this.setState({
                    error: err.reason
                });
            } else {
                this.setState({
                    error: false
                });
                FlowRouter.go('/');
            }
        });
    };

    handleChange = (name, event) => {
        this.setState({...this.state, [name]: event.target.value});
    };

    getValidationError(field) {
        return this.state.validationErrors[field];
    }

    render(){
        const error = this.state.error;
        return (
            <div>
                <div style={{ flex: 1, overflowY: 'auto', padding: '1.8rem' }}>
                    <Row>
                        <Col xsOffset={0} xs={12} mdOffset={4} md={4}>
                            <Panel border={true}>
                                <h1>Login</h1>
                                { error.length > 0 ?
                                    <div className="alert alert-danger fade in">{error}</div>
                                    :''}
                                <Form onSubmit={this.handleSubmit}>
                                    <input
                                        type='email'
                                        label='Email'
                                        name='email'
                                        error={this.getValidationError('email')}
                                        onChange={this.handleChange.bind(this, 'email')} />
                                    <input
                                        type='password'
                                        label='Password'
                                        name='password'
                                        error={this.getValidationError('password')}
                                        onChange={this.handleChange.bind(this, 'password')} />
                                    <Button className="button" type='submit' icon='done' label='Login' raised primary >Login</Button>
                                </Form>
                            </Panel>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}