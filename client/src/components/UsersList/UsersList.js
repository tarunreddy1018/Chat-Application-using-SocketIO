import React from 'react';

import User from '../User/User';

import './UsersList.css';

const UsersList = ({ users }) => {
    let modifiedUsers = users.map((userName, index) => {
        return (
            <User key={index} userName={userName} />
        );
    });

    return (
        <div className="usersContainer">
            {modifiedUsers}
        </div>  
    );
};

export default UsersList;