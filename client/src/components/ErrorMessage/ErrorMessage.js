import React from 'react';

import './ErrorMessage.css';

const ErrorMessage = (props) => {
    let classes = ['user-message', 'user-message--error'];

    if(props.joinError) {
        classes.push(props.joinError);
    }

    return (
        <div className={classes.join(' ')}>{ props.message }</div>
    );
};

export default ErrorMessage;