import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import NavBar from '../NavBar/NavBar';
import Spinner from '../Spinner/Spinner';

import './Join.css';
import axios from 'axios';

class Join extends Component {
    state = {
        name: '',
        room: '',
        errorMessage: '',
        loading: false
    }

    verifyDetails = (event) => {
        event.preventDefault();
        if(!this.state.name || !this.state.room) {
            this.setState({errorMessage: 'Fields cannot be empty'});
        }
        else {
            this.setState({loading: true});
            axios.post('http://localhost:5000/join', {
                name: this.state.name,
                room: this.state.room
            })
            .then(res => {
                if(res.data.errorMessage) {
                    this.setState({errorMessage: res.data.errorMessage, loading: false});
                }
                else {
                    this.props.history.push(`/chat?name=${this.state.name}&room=${this.state.room}`);
                }
            })
            .catch(err => {
                console.log(err);
            })
        }
    }

    setName = (event) => {
        this.setState({name: event.target.value});
    }

    setRoom = (event) => {
        this.setState({room: event.target.value});
    }

    render() {
        let isAuthenticated = sessionStorage.getItem("isAuthenticated");
        let component = null;

        if (isAuthenticated) {
            if(this.state.loading) {
                component = (
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
                if (this.state.errorMessage) {
                    errorComponent = <ErrorMessage joinError='joinError' message={this.state.errorMessage} />
                }

                component = (
                    <div>
                        <NavBar />
                        <div className="joinOuterContainer">
                            {errorComponent}
                            <div className="joinInnerContainer">
                                <h1 className="joinHeading">Join A Room</h1>
                                <div><input placeholder="Name" className="joinInput" type="text" onChange={this.setName} /></div>
                                <div><input placeholder="Room" className="joinInput mt-20" type="text" onChange={this.setRoom} /></div>
                                <button className="joinButton button mt-20" onClick={this.verifyDetails} type="submit">Join</button>
                            </div>
                        </div>
                    </div>
                );
            }
        }
        else {
            component = <Redirect to={
                {
                    pathname: '/login',
                    errorMessage: 'Please login before you continue'
                }
            } />
        }

        return component;
    }
};

export default Join;