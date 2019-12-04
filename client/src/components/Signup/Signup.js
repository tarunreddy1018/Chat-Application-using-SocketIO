import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import NavBar from '../NavBar/NavBar';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Spinner from '../Spinner/Spinner';

import './Signup.css';

class Signup extends Component {
    state = {
        email: '',
        password: '',
        confirmPassword: '',
        loading: false,
        errorMessage: ''
    }

    sendDetails = (event) => {
        event.preventDefault();
        this.setState({loading: true});
        let data = {
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword
        };
        axios.post('http://localhost:5000/signup', data)
            .then(res => {
                if(res.data.errorMessage) {
                    this.setState({errorMessage: res.data.errorMessage, loading: false});
                }
                else {
                    this.setState({errorMessage: ''});
                    this.props.history.push('/login');
                }
            })
            .catch(err => console.log(err));
    }

    setEmail = (event) => {
        this.setState({email: event.target.value});
    }

    setPassword = (event) => {
        this.setState({password: event.target.value});
    }

    setConfirmPassword = (event) => {
        this.setState({confirmPassword: event.target.value});
    }

    render() {
        let renderingComponent = null;
        if(this.state.loading) {
            renderingComponent = (
                <div>
                    <NavBar />
                    <div className="spinner">
                        <Spinner />
                    </div>
                </div>
            );
        }
        else {
            let errorComponent = null;
            if(this.state.errorMessage) {
                errorComponent = <ErrorMessage message={this.state.errorMessage} />
            }
            renderingComponent = (
                <div>
                    <NavBar />
                    <div className="belowNavbarComponent">
                        {errorComponent}
                        <form className="signup-form" onSubmit={this.sendDetails}>
                            <div className="form-control">
                                <label htmlFor="email">E-Mail</label>
                                <input type="email" name="email" id="email" value={this.state.email} onChange={this.setEmail}></input>
                            </div>
                            <div className="form-control">
                                <label htmlFor="password">Password</label>
                                <input type="password" name="password" id="password" value={this.state.password} onChange={this.setPassword}></input>
                            </div>
                            <div className="form-control">
                                <label htmlFor="confirmPassword">Confirm Password</label>
                                <input type="password" name="confirmPassword" id="confirmPassword" value={this.state.confirmPassword} onChange={this.setConfirmPassword}></input>
                            </div>
                            <button className="btn" type="submit">Signup</button>
                        </form>
                    </div>
                </div>  
            );
        }

        return [renderingComponent];
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.isAuthenticated
    };
};

export default connect(mapStateToProps, null)(Signup);