import React from 'react';

import './User.css';

const User = ({ userName }) => {
    return (
        <div className='user'>
            <h2>{userName}</h2>
        </div>
    );
};

export default User;