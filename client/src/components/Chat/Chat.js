import React, { useEffect, useState } from 'react';
import queryString from 'query-string'
import io from 'socket.io-client';
import ScrollToBottom from 'react-scroll-to-bottom';
import { Redirect } from 'react-router-dom';

import InfoBar from '../InfoBar/InfoBar';
import Messages from '../Messages/Messages';
import Input from '../Input/Input';
import UsersList from '../UsersList/UsersList';

import './Chat.css';

var socket;

const Chat = ({ location }) => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    const ENDPOINT = 'localhost:5000';

    useEffect(() => {
        const { name, room } = queryString.parse(location.search);

        socket = io(ENDPOINT);

        setName(name);
        setRoom(room);

        socket.emit('join', { name, room });
        
    }, [ENDPOINT, location.search]);

    useEffect(() => {
        socket.on('message', (message) => {
            setMessages([...messages, message]);
        });

        socket.on('roomInfo', (roomInfo) => {
            setUsers(roomInfo.users);
            setMessages(roomInfo.messages);
        });

        socket.on('errorMessage', (error) => {
            if(error.id === socket.id) {
                setErrorMessage(error.errorMessage);
                socket.emit('disconnect');
                socket.off();
            }
        });

        return () => {
            socket.emit('disconnect');
            socket.off();
        }
    }, [messages]);

    const sendMessage = (event) => {
        event.preventDefault();

        if (message) {
            socket.emit('sendMessage', room, name , message, () => setMessage(''));
        }
    };

    let isAuthenticated = sessionStorage.getItem("isAuthenticated");
    let component = null;

    if(isAuthenticated) {
        if(errorMessage !== '') {
            component = (
                    <Redirect to={{
                                pathname: '/join',
                                errorMessage: errorMessage
                    }} />
            );
        }
        else {
            component = (
                <div className="outerContainer">
                    <div className="innerContainer">
                        <div className="container">
                            <InfoBar room={room} />
                            <Messages messages={messages} name={name} />
                            <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
                        </div>
                        <div className="onlineList">
                            <div className="heading">
                                <h2>Users Online</h2>
                            </div>
                            <div className="container2 scrollBottom">
                                <UsersList users={users} />
                            </div>
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
};

export default Chat;