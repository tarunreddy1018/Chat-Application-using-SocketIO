import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import NavBar from '../NavBar/NavBar';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Spinner from '../Spinner/Spinner';

import './Login.css';

class Login extends Component {
    state = {
        email: '',
        password: '',
        loading: false,
        errorMessage: this.props.location.errorMessage
    }

    sendDetails = (event) => {
        event.preventDefault();
        this.setState({loading: true});
        let data = {
            email: this.state.email,
            password: this.state.password
        };
        axios.post('http://localhost:5000/login', data, {
            withCredentials: true
        })
            .then(res => {
                if(res.data.errorMessage) {
                    this.setState({errorMessage: res.data.errorMessage, loading: false});
                }
                else {
                    this.props.setStatus({email: data.email, isAuthenticated: true});
                    this.setState({errorMessage: ''});
                    sessionStorage.setItem("email", data.email);
                    sessionStorage.setItem("isAuthenticated", true);
                    this.props.history.push('/join');
                }
            })
            .catch(err => console.log(err));
    }

    setEmail = (event) => {
        this.setState({email: event.target.value});
        console.log(event.target.value);
    }

    setPassword = (event) => {
        this.setState({password: event.target.value});
        console.log(event.target.value);
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
                        <form className="login-form" onSubmit={this.sendDetails}>
                            <div className="form-control">
                                <label htmlFor="email">E-Mail</label>
                                <input type="email" name="email" id="email" value={this.state.email} onChange={this.setEmail}></input>
                            </div>
                            <div className="form-control">
                                <label htmlFor="password">Password</label>
                                <input type="password" name="password" id="password" value={this.state.password} onChange={this.setPassword}></input>
                            </div>
                            <button className="btn" type="submit">Login</button>
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

const mapDispatchToProps = (dispatch) => {
    return {
        setStatus: (payload) => {
            dispatch({type: 'FLIP-STATUS', payload: payload});
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);