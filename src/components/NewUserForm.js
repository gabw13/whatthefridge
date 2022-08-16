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
    alert(`New user: ${newUser} created!`);
    event.preventDefault();
    createUser();
    setNewUser("");
  };

  // async api call to db: CREATE user
  const createUser = async () => {
    await addDoc(collection(props.db, "users"), { username: newUser });
    props.getUsers();
  };

  return (
    <section className="user-new">
      <h2>Are you new here?</h2>
      <h3>Welcome!</h3>

      <form id="signup" className="form" onSubmit={onFormSubmit}>
        <section className="form-field">
          <label htmlFor="username"></label>
          Enter your username:
          <input
            type="text"
            name="username"
            id="username"
            value={newUser}
            onChange={onFormChange}
          ></input>
          <small></small>
        </section>
        <button type="submit">submit</button>
        <h4>Let's get cookin'!</h4>
      </form>
    </section>
  );
};

export default NewUserForm;
