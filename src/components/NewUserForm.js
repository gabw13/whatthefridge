import React, { useState, addDoc } from "react";
// import firestore from "./firestore";

const NewUserForm = (props) => {
  const [newUser, setNewUser] = useState("");

  const onFormSubmit = (event) => {
    event.preventDefault();
    props.getUsers();
  };

  const onFormChange = (event) => {
    const stateName = event.target.name;
    const inputValue = event.target.value;
    setNewUser(event.target.value);

    const newUserData = { ...newUser };
    newUserData[stateName] = inputValue;
  };

  return (
    <section className="user-new">
      <h2>Are you new here?</h2>
      <h3>Welcome!</h3>
      <h4>Enter your name below:</h4>

      <form onSubmit={onFormSubmit}>
        <label htmlFor="username">
          Username:
          <input type="text" name="username" onChange={onFormChange}></input>
        </label>
        <button type="submit" onClick={props.createUser}>
          submit
        </button>
        <h4>Let's get cookin'!</h4>
      </form>
    </section>
  );
};

export default NewUserForm;
