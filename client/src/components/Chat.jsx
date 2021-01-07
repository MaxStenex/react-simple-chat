import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/Chat.scss";
import queryString from "query-string";
import { io } from "socket.io-client";
import { v4 as uuidv4 } from "uuid";

let socket;

const Chat = () => {
  const location = useLocation();
  const { user: username, room: roomname } = queryString.parse(location.search);

  const [messageText, setMessageText] = useState("");
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);

  const onSubmit = (evt) => {
    evt.preventDefault();
    if (messageText.trim() !== "") {
      socket.emit("sendMessage", {
        message: {
          creator: username,
          text: messageText,
        },
        roomname,
      });
      setMessageText("");
    }
  };

  useEffect(() => {
    socket = io("http://localhost:4000");

    window.onbeforeunload = () => {
      socket.emit("userLogout", { username, roomname });
    };

    socket.emit("joinRoom", { username, roomname });
    socket.on("setUsers", ({ users }) => {
      setUsers(users);
    });
    socket.on("setMessages", ({ messages }) => {
      setMessages(messages);
    });

    return () => {
      socket.emit("userLogout", { username, roomname });
      socket.disconnect();
    };
  }, [username, roomname]);

  return (
    <section className="chat">
      <div className="container">
        <div className="chat__wrapper">
          <div className="chat__sidebar">
            <div className="chat__info">
              <h2 className="chat__title">React Chat</h2>
              <h3 className="chat__room-name">
                Room:<span> {roomname}</span>
              </h3>
              <div className="chat__users">
                <h3 className="chat__users-title">Users:</h3>
                <ul className="chat__users-list">
                  {users.map((user) => (
                    <li key={uuidv4()} className="chat__user">
                      {user}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <Link to="/join" className="chat__logout">
              Leave room
            </Link>
          </div>
          <div className="chat__main">
            <ul className="chat__messages">
              {messages.map(({ creator, text }) => (
                <li
                  className={
                    `chat__message message ` + (creator === username ? "message-me" : "")
                  }
                  key={uuidv4()}
                >
                  <div className="message__text">{text}</div>
                  <div className="message__username">{creator}</div>
                </li>
              ))}
            </ul>
            <form onSubmit={onSubmit} className="chat__send-form">
              <textarea
                value={messageText}
                onChange={(evt) => setMessageText(evt.target.value)}
                className="chat__input"
              />
              <button className="chat__submit">Send</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Chat;
