import "./App.css";
// import UserForm from "./components/UserForm";
import { useState, useEffect } from "react";
import { db } from "./firebase.config";
import {
  collection,
  doc,
  getDocs,
  // setDoc,
  addDoc,
  deleteDoc,
} from "firebase/firestore";

function App() {
  const [users, setUsers] = useState([]);
  const usersCollection = collection(db, "users");
  const [newUser, setNewUser] = useState("");

  // const kitchenCollection = doc(db, "users/kitchen");

  // async api call to db: CREATE user
  const createUser = async () => {
    await addDoc(usersCollection, { username: newUser });
    getUsers();
  };

  // async api call to db: DELETE user
  const deleteUser = async (id) => {
    const userDoc = doc(db, "users", id);
    await deleteDoc(userDoc);
    getUsers();
  };

  // async api call to db: GET users
  const getUsers = async () => {
    const userData = await getDocs(usersCollection);
    // firestore.collection("yourCollection").get({source:"cache"})
    // loop through docs in collection and set users array to be equal to array of doc data and id for each doc
    console.log(userData.docs);
    setUsers(userData.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    // async api call to db: CREATE ingredients
    // async function writeIngredients() {
    //   const docData = {
    //     item: "apple",
    //     quantity: 1,
    //   };
    //   try {
    //     await addDoc(kitchenCollection, docData);
    //     console.log("Value has been written to db");
    //   } catch (error) {
    //     console.log(error);
    //   }
    //   // setDoc() writes the doc if it doesn't exist and will completely replace any doc that exists at this location
    //   // updateDoc() will only overwrite fields specified while keeping old data in place but throws error
    // }
    // writeIngredients();

    getUsers();
    // eslint-disable-next-line
  }, []);
  // do NOT uncomment the line below. This is here as a reminder that putting something in the deps array will cause reads to skyrocket.
  // }, [usersCollection]);

  return (
    <section className="App">
      <header className="App-header">
        <h1>what the fridge?!</h1>
      </header>

      <section className="user-return">
        <h2>Have you been here before?</h2>
        <h3>Select a name from the list of users below:</h3>
        {users.name}
        {users.map((user) => {
          return (
            <section>
              {" "}
              <p>{user.username}</p>
              <button
                onClick={() => {
                  deleteUser(user.id);
                }}
              >
                delete {user.username}
              </button>
            </section>
          );
        })}
      </section>

      <section className="user-new">
        <h2>Are you new here?</h2>
        <h3>Welcome! Let's get cookin'!</h3>
        <h4>Enter your name below:</h4>
        <input
          type="text"
          name="username"
          onChange={(event) => {
            setNewUser(event.target.value);
          }}
        ></input>
        <button type="submit" onClick={createUser}>
          submit
        </button>
        {/* <UserForm usersCollection={usersCollection} /> */}
      </section>

      <footer className="App-footer">&copy; 2022 &hearts;</footer>
    </section>
  );
}

export default App;
