import React from 'react';

import './ErrorMessage.css';

const ErrorMessage = ({ message }) => {
    return (
        <p className="errorMessage">{message}</p>
    );
};

export default ErrorMessage;