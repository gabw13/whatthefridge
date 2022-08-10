import "./App.css";
import NewUserForm from "./components/NewUserForm";
import { useState, useEffect } from "react";
import { db } from "./firebase.config";
import {
  collection,
  doc,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";

function App() {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState([]);

  const [ingredients, setIngredients] = useState([]);
  const [newIngredientsName, setNewIngredientsName] = useState([]);
  const [newIngredientsQuantity, setNewIngredientsQuantity] = useState([]);

  const usersCollection = collection(db, "users");

  // event handler that updates current user state when a different user is clicked on the user drop down menu
  const handleUserChange = (event) => {
    setCurrentUser(event.target.value);
  };

  // async api call to db: DELETE user
  const deleteUser = async (id) => {
    const userDoc = doc(db, "users", id);
    await deleteDoc(userDoc);
    getUsers();
  };

  // async api call to db: READ users
  const getUsers = async () => {
    const userData = await getDocs(usersCollection);
    // loop through docs in collection and set users array to be equal to array of doc data and id for each doc
    setUsers(userData.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  // async api call to db: READ ingredients
  const getIngredients = async () => {
    const ingredientData = await getDocs(
      collection(db, `users/${currentUser}/kitchen`)
    );

    // loop through docs in collection and set ingredients array to be equal to array of doc data and id for each doc
    setIngredients(
      ingredientData.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }))
    );
  };

  // async api call to db: CREATE ingredients
  const createIngredients = async () => {
    await addDoc(collection(db, `users/${currentUser}/kitchen`), {
      name: newIngredientsName,
      quantity: Number(newIngredientsQuantity),
    });
    getIngredients();
  };

  // async api call to db: UPDATE ingredients (increase count on button click)
  const increaseIngredients = async (ingredient) => {
    const ingredientDoc = doc(
      db,
      `users/${currentUser}/kitchen/${ingredient.id}`
    );
    const newFields = { quantity: ingredient.quantity + 1 };
    await updateDoc(ingredientDoc, newFields);
    getIngredients();
  };

  // async api call to db: UPDATE ingredients (decrease count on button click)
  const decreaseIngredients = async (ingredient) => {
    const ingredientDoc = doc(
      db,
      `users/${currentUser}/kitchen/${ingredient.id}`
    );
    const newFields = { quantity: ingredient.quantity - 1 };
    await updateDoc(ingredientDoc, newFields);
    getIngredients();
  };

  // aync api call to db: DELETE ingredient
  const deleteIngredient = async (ingredient) => {
    const ingredientDoc = doc(
      db,
      `users/${currentUser}/kitchen/${ingredient.id}`
    );
    await deleteDoc(ingredientDoc);
    getIngredients();
  };

  useEffect(() => {
    getUsers();
    // eslint-disable-next-line
  }, []);
  // do NOT uncomment the line below. Putting something in the deps array will cause reads to skyrocket.
  // }, [usersCollection]);

  useEffect(() => {
    getIngredients();
    // eslint-disable-next-line
  }, [currentUser]);

  return (
    <section className="App">
      <header className="App-header">
        <h1>what the fridge?!</h1>
      </header>

      <section className="user-return">
        <h2>Have you been here before?</h2>
        <h3>Select a name from the list of users below:</h3>
        <div className="select-container">
          <label>
            Select a username:
            <select
              onChange={(event) => {
                handleUserChange(event);
              }}
            >
              {users.map((user) => (
                <option value={user.id}>{user.username}</option>
              ))}
            </select>
          </label>
          <br></br>
          <button
            onClick={() => {
              deleteUser(currentUser);
            }}
          >
            delete user
          </button>
        </div>
      </section>

      <section className="user-kitchen">
        <h2>Kitchen</h2>
        {ingredients?.map((ingredient) => {
          return (
            <section>
              <li>
                <h3>{ingredient.name}</h3>
              </li>
              <button
                className="increase-button"
                onClick={() => {
                  increaseIngredients(ingredient);
                }}
              >
                ⬆
              </button>
              <p>{ingredient.quantity}</p>
              <p>{ingredient.unit}</p>
              <button
                className="decrease-button"
                onClick={() => {
                  decreaseIngredients(ingredient);
                }}
              >
                ⬇
              </button>
              <br></br>
              <button
                onClick={() => {
                  deleteIngredient(ingredient);
                }}
              >
                delete ingredient
              </button>
              <p>______</p>
            </section>
          );
        })}
      </section>

      <section className="kitchen-form">
        <h2>add ingredients to kitchen:</h2>
        <section></section>
        <label>
          Ingredient name:
          <input
            type="text"
            name="name"
            onChange={(event) => {
              setNewIngredientsName(event.target.value);
            }}
          ></input>
        </label>
        <br></br>
        <label>
          Ingredient quantity:
          <input
            type="text"
            name="quantity"
            onChange={(event) => {
              setNewIngredientsQuantity(event.target.value);
            }}
          ></input>
        </label>
        <br></br>
        <button type="submit" onClick={createIngredients}>
          submit
        </button>
      </section>

      <NewUserForm db={db} getUsers={getUsers} />

      <footer className="App-footer">
        <p>made with ReactJS + Google Firebase + &hearts;</p>
        <p>&copy; 2022 Gaby Webb </p>
      </footer>
    </section>
  );
}

export default App;
