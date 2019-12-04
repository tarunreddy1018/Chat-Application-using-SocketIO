const User = require('./models/User');
const Room = require('./models/Room');

const addUser = ({ id, name, room }) => {
    name = name.trim().toLowerCase();
    room = room.trim().toLowerCase();

    return Room.findOne({name: room})
        .then(roomObj => {
            if(!roomObj) {
                roomObj = new Room({
                    name: room,
                    users: [`${name}`],
                    messages: []
                });
                return roomObj.save()
                        .then(result => {
                            const user = new User({
                                socketId: id,
                                name: name,
                                room: room
                            });
                            console.log('User Saved');
                            return user.save();
                        })
                        .catch(err => {
                            console.log(err);
                        });
            }
            else {
                const updatedUsers = [ ...roomObj.users, `${name}` ];
                roomObj.users = updatedUsers;
                return roomObj.save()
                        .then(result => {
                            const user = new User({
                                socketId: id,
                                name: name,
                                room: room
                            });
                            console.log('User Saved');
                            return user.save();
                        })
                        .catch(err => {
                            console.log(err);
                        });
            }
        })
        .catch(err => {
            console.log(err);
        });
};

const removeUser = (id) => {
    return User.findOne({socketId: id})
        .then(user => {
            if(!user) {
                return user;
            }
            return Room.findOne({name: user.room})
                .then(room => {
                    let updatedUsers = room.users.filter(userName => {
                        return userName !== user.name;
                    });
                    room.users = updatedUsers;
                    return room.save()
                        .then(res => {
                            return user.remove();
                        })
                })
                .catch(err => {
                    console.log(err);
                })
        })
        .catch(err => {
            console.log(err);
        })
};

const getUser = (id) => {
    return User.findOne({socketId: id})
        .then(user => {
            return user;
        })
        .catch(err => {
            console.log(err);
        })
};

const getRoomInfo = (roomName) => {
    return Room.findOne({name: roomName})
        .then(room => {
            return room;
        })
        .catch(err => {
            console.log(err);
        })
};

const storeMessage = (room, message) => {
    return Room.findOne({name: room})
        .then(room => {
            if(!room) {
                return room;
            }
            room.messages = [ ...room.messages, message ];
            return room.save();
        })
        .catch(err => {
            console.log(err);
        });
};

const checkIfUserNameIsPresent = (name, roomName) => {
    let errorMessage = '';
    return Room.findOne({name: roomName})
        .then(room => {
            if(!room) {
                return errorMessage;
            }
            else {
                let users = room.users;
                let userIndex = users.findIndex(user => {
                    return (user === name);
                });
                if(userIndex === -1) {
                    return errorMessage;
                }
                else {
                    errorMessage = `A user with name ${name} already exists in the room ${roomName}`;
                    return errorMessage;
                }
            }
        })
        .catch(err => {
            console.log(err);
        });
};

const storeMessagesofARoom = (roomName, roomMessages) => {
    return Room.findOne({ name: roomName})
        .then(roomObj => {
            roomObj.messages = [ ...roomObj.messages, ...roomMessages ];
            return roomObj.save();
        })
        .catch(err => {
            console.log(err);
        });
};

const storeMessagesAndFetchRoomInfo = (messages, roomName, callBack) => {
    const messagesInfo = {

    };

    messages.forEach(message => {
        let user = message.user;
        let text = message.text;
        let room = message.room;
        
        let updatedMessage = {
            user,
            text
        };

        if(!messagesInfo[room]) {
            messagesInfo[room] = [];
        }
        messagesInfo[room].push(updatedMessage);
    });

    let roomNames = Object.keys(messagesInfo);

    let totalCount = roomNames.length;
    let currentCount = 0;

    let room = null;

    roomNames.forEach(roomName => {
        storeMessagesofARoom(roomName, messagesInfo[roomName])
            .then(roomObj => {
                currentCount++;
                if(roomObj.name === roomName) {
                    room = roomObj;
                }
                if(currentCount === totalCount) {
                    callBack(room);
                }
            })
            .catch(err => {
                console.log(err);
            });
    });
};

module.exports = { addUser, removeUser, checkIfUserNameIsPresent, storeMessagesAndFetchRoomInfo };