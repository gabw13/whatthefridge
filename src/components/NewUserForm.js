import React, { useState } from "react";
import { addDoc, collection } from "firebase/firestore";

const NewUserForm = (props) => {
  const [newUser, setNewUser] = useState("");

  // event handler that updates the state of the new user as the user types the name into the form
  const onFormChange = (event) => {
    const inputValue = event.target.value;
    setNewUser(inputValue);
  };

  // submit handler that sends the item to the createUser function when the user clicks submit
  const onFormSubmit = (event) => {
    event.preventDefault();
    createUser();
    setNewUser("");
  };

  // async api call to db: CREATE user
  const createUser = async () => {
    await addDoc(collection(props.db, "users"), {
      username: newUser,
    });
    props.setCurrentUser(newUser);
    alert(
      `New user: ${newUser} created! ✨ Select your username from the user list below.`
    );
    props.getUsers();
  };

  return (
    <section className="user-new">
      <h2>👋 hey! are you new here? </h2>
      <form onSubmit={onFormSubmit}>
        <label htmlFor="username">
          create a username:{" "}
          <input
            type="text"
            name="username"
            value={newUser}
            onChange={onFormChange}
          ></input>
        </label>
        <button type="submit">submit</button>
      </form>
      <p>pssst...</p>
      <p> there are no rules here, just pick a name you'll remember 🤭 </p>
    </section>
  );
};

export default NewUserForm;
