import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/Chat.scss";
import queryString from "query-string";
import { io } from "socket.io-client";

const Chat = () => {
  const location = useLocation();
  const { user: username, room } = queryString.parse(location.search);

  const [messageText, setMessageText] = useState("");
  useEffect(() => {
    const socket = io("http://localhost:4000");

    window.onbeforeunload = () => {
      socket.emit("userLogout", { username, room });
    };

    socket.emit("joinRoom", { username, room });

    return () => {
      socket.emit("userLogout", { username, room });
      socket.disconnect();
    };
  }, [username, room]);

  return (
    <section className="chat">
      <div className="container">
        <div className="chat__wrapper">
          <div className="chat__sidebar">
            <div className="chat__info">
              <h2 className="chat__title">React Chat</h2>
              <h3 className="chat__room-name">
                Room:<span> {room}</span>
              </h3>
              <div className="chat__users">
                <h3 className="chat__users-title">Users:</h3>
                <ul className="chat__users-list">
                  <li className="chat__user">Max</li>
                  <li className="chat__user">Den</li>
                  <li className="chat__user">Andrew</li>
                  <li className="chat__user">Sergo</li>
                </ul>
              </div>
            </div>
            <Link to="/join" className="chat__logout">
              Leave room
            </Link>
          </div>
          <div className="chat__main">
            <ul className="chat__messages">
              <li className="chat__message message">
                <div className="message__text">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam,
                  aperiam!
                </div>
                <div className="message__username">Maxim</div>
              </li>
              <li className="chat__message message message-me">
                <div className="message__text">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam,
                  aperiam!
                </div>
                <div className="message__username">Maxim</div>
              </li>
            </ul>
            <form className="chat__send-form">
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
