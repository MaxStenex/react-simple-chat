const rooms = new Map();

const createNewRoom = (roomName) => {
  const room = {
    users: [],
    messages: [],
  };
  rooms.set(roomName, room);
};

const addUserInRoom = (userName, roomName) => {
  if (!rooms.has(roomName)) {
    createNewRoom(roomName);
  }
  const room = rooms.get(roomName);
  return room.users.push(userName);
};

const deleteUserFromRoom = (userName, roomName) => {
  const room = rooms.get(roomName);
  if (room) {
    const filteredUsers = room.users.filter((user) => user !== userName);
    room.users = filteredUsers;
  }
};

const addNewMessageInRoom = (message, roomName) => {
  const room = rooms.get(roomName);
  if (room) {
    room.messages.push(message);
  }
};

module.exports = { addUserInRoom, rooms, deleteUserFromRoom, addNewMessageInRoom };
