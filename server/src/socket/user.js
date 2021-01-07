const rooms = new Map();

// const room = {
//   users: new Map(),
//   messages: [
//     {
//       creator: "maxim",
//       text: "blabla",
//     },
//   ],
// };

const createNewRoom = (roomName) => {
  const room = {
    users: [],
    messages: [{}],
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

module.exports = { addUserInRoom, rooms, deleteUserFromRoom };
