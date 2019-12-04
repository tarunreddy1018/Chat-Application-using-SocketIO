const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const { addUser, removeUser, storeMessagesAndFetchRoomInfo } = require('./controllers');

const router = require('./router');

const PORT = process.env.PORT || 5000;

const MONGODB_URI = 'mongodb+srv://tarunreddy:longterm@cluster0-y9d0c.mongodb.net/chat';

const app = express();
const store = new MongoDBStore({
    uri: MONGODB_URI,
    collection: 'sessions'
});
const server = http.createServer(app);
const io = socketio(server);

let globalMessages = [];

io.on('connection', (socket) => {
    console.log('We have a new connection');

    socket.on('join', ({ name, room }, callback) => {
        socket.join(room);
        addUser({ id: socket.id, name, room })
            .then(user => {
                let userName = 'admin';
                let text = `${user.name}, Welcome to the room ${user.room}`;
                let messageObj = {
                    user: userName,
                    text: text,
                    room: room
                };

                globalMessages.push(messageObj);

                storeMessagesAndFetchRoomInfo(globalMessages, room, (room) => {
                    globalMessages = [];
                    if (!room) {
                        return;
                    }
                    let messages = [...room.messages];
                    let users = [...room.users];
                    let roomInfo = {
                        userAdded: socket.id,
                        users: users,
                        messages: messages
                    };

                    io.to(room.name).emit('roomInfo', roomInfo);
                });
            })
            .catch(err => {
                console.log(err);
            });
    });


    socket.on('sendMessage', (roomName, userName, message, callback) => {
        let messageObj = {
            user: userName,
            text: message,
            room: roomName
        };

        globalMessages.push(messageObj);

        io.to(roomName).emit('message', messageObj);

        callback();
    });

    socket.on('disconnect', () => {
        removeUser(socket.id)
            .then(user => {
                if (!user) {
                    return;
                }

                let userName = 'admin';
                let text = `${user.name} has left the room`;
                let messageObj = {
                    user: userName,
                    text: text,
                    room: user.room
                };

                globalMessages.push(messageObj);

                storeMessagesAndFetchRoomInfo(globalMessages, user.room, (room) => {
                    globalMessages = [];
                    if (!room) {
                        return;
                    }

                    let messages = [...room.messages];
                    let users = [...room.users];
                    let roomInfo = {
                        userRemoved: socket.id,
                        users: users,
                        messages: messages
                    };
                    io.to(room.name).emit('roomInfo', roomInfo);
                });
            })
            .catch(err => {
                console.log(err);
            });
    })
});

setInterval(() => {
    storeMessagesAndFetchRoomInfo(globalMessages, '', () => {
        globalMessages = [];
    })
}, 120000);


//app.use(cors());
app.use(
    session({
        secret: 'my secret',
        resave: false,
        saveUninitialized: false,
        store: store
    })
);
app.use(bodyParser.json());
app.use(router);

mongoose
    .connect(MONGODB_URI)
    .then(result => {
        server.listen(PORT, () => {
            console.log(`Server has started on port ${PORT}`);
        });
    })
    .catch(err => {
        console.log(err);
    });