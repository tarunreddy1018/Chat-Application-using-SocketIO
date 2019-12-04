import React, { Component } from 'react';
import { connect } from 'react-redux';

import homePage from '../../icons/homepage.jpg';

import NavBar from '../NavBar/NavBar';

import './HomePage.css';

class HomePage extends Component {
    render() {
        return (
            <div>
                <NavBar />
                <div className="homeImage">  
                    <img src={homePage} alt="Home Page Image" />
                </div>
            </div>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.isAuthenticated
    };
};

export default connect(mapStateToProps, null)(HomePage);