import React, { Component } from 'react';
import { connect } from 'react-redux';

import { NavLink, withRouter } from 'react-router-dom';

import axios from 'axios';

import './NavBar.css';

class NavBar extends Component {
    postLogout = (event) => {
        axios.post('http://localhost:5000/logout', {}, {
            withCredentials: true
        })
            .then(res => {
                sessionStorage.removeItem("email");
                sessionStorage.removeItem("isAuthenticated");
                this.props.setStatus({email: '', isAuthenticated: false});
                this.props.history.push('/');
            })
            .catch(err => {
                console.log(err);
            })
    }

    render() {
        let Home = null;
        let Join = null;
        let Login = null;
        let SignUp = null;
        let Logout = null;

        let isAuthenticated = sessionStorage.getItem("isAuthenticated");

        if (true) {
            Home = (
                <li className="leftPart-listitem"><NavLink className="link" exact to='/'>Home</NavLink></li>
            );
        }
        if (isAuthenticated) {
            Join = (
                <li className="leftPart-listitem"><NavLink className="link" exact to='/join'>Join</NavLink></li>
            );
        }
        if (!isAuthenticated) {
            Login = (
                <li className="rightPart-listitem"><NavLink className="link" exact to='/login'>Login</NavLink></li>
            );
        }
        if (!isAuthenticated) {
            SignUp = (
                <li className="rightPart-listitem"><NavLink className="link" exact to='/signup'>Signup</NavLink></li>
            );
        }
        if (isAuthenticated) {
            Logout = (
                <li className="rightPart-listitem link logout" onClick={this.postLogout}>Logout</li>
            );
        }

        return (
            <header className="header">
                <nav className="navBar">
                    <ul className="leftPart-itemlist">
                        {Home}
                        {Join}
                    </ul>
                    <ul className="rightPart-itemlist">
                        {Login}
                        {SignUp}
                        {Logout}
                    </ul>
                </nav>
            </header>
        );
    }
};

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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(NavBar));