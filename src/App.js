import "./App.css";
import UserForm from "./components/UserForm";
import { useState, useEffect } from "react";
import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";

function App() {
  const [users, setUsers] = useState([]);
  const usersCollection = collection(db, "users");

  useEffect(() => {
    // async api call to db
    const getUsers = async () => {
      const userData = await getDocs(usersCollection);
      // loop through docs in collection and set users array to be equal to array of doc data and id for each doc
      console.log(userData.docs);
      setUsers(userData.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getUsers();
  }, [usersCollection]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>what the fridge?!</h1>
      </header>
      <main>
        <h2>Enter your name below to get cookin'!</h2>
        <UserForm usersCollection={usersCollection} />
        <h3>Users:</h3>
        {users.name}
        {users.map((user) => {
          return (
            <section>
              {" "}
              <p>{user.username}</p>
            </section>
          );
        })}
      </main>
      <footer className="App-footer">&copy; 2022 &hearts;</footer>
    </div>
  );
}

export default App;
