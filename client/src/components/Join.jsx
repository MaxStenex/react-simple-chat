import React, { useState } from "react";
import "../styles/Join.scss";
import { useHistory } from "react-router-dom";

const Join = () => {
  const [formValues, setFormValues] = useState({ roomName: "", nickName: "" });
  const [errorText, setErrorText] = useState("");
  const history = useHistory();

  const onSubmit = (evt) => {
    evt.preventDefault();
    try {
      if (formValues.roomName.trim() === "" || formValues.nickName.trim() === "") {
        throw new Error("Please, fill room name and nick name fields");
      }
      history.push(`/chat?room=${formValues.roomName}&user=${formValues.nickName}`);
    } catch (error) {
      return setErrorText(error.message);
    }
  };

  return (
    <section className="join">
      <div className="container">
        <div className="join__wrapper">
          <h2 className="join__title">Join chat room</h2>
          <form onSubmit={onSubmit} className="join__form">
            <div className="join__section">
              <label className="join__label">Room name</label>
              <input
                value={formValues.roomName}
                onChange={(e) =>
                  setFormValues({ ...formValues, roomName: e.target.value })
                }
                type="text"
                className="join__input"
              />
            </div>
            <div className="join__section">
              <label className="join__label">Your nickname</label>
              <input
                value={formValues.nickName}
                onChange={(e) =>
                  setFormValues({ ...formValues, nickName: e.target.value })
                }
                type="text"
                className="join__input"
              />
            </div>
            {errorText && <span className="join__error">{errorText}</span>}
            <button className="join__submit">Join</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Join;
