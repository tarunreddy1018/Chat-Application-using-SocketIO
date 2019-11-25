import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

import './Join.css';

const Join = (props) => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');

    let res = null;
    if(props.location.errorMessage !== '') {
        res = <ErrorMessage message={props.location.errorMessage} />
    }

    return (
        <div className="joinOuterContainer">
            {res}
            <div className="joinInnerContainer">
                <h1 className="joinHeading">Join A Room</h1>
                <div><input placeholder="Name" className="joinInput" type="text" onChange={(event) => setName(event.target.value)} /></div>
                <div><input placeholder="Room" className="joinInput mt-20" type="text" onChange={(event) => setRoom(event.target.value)} /></div>
                <Link onClick={(event) => (!name || !room) ? event.preventDefault() : null} to={`/chat?name=${name}&room=${room}`}>
                    <button className="button mt-20" type="submit">Sign In</button>
                </Link>
            </div>
        </div>
    );
};

export default Join;