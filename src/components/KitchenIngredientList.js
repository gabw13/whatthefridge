import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase.config";
import {
  collection,
  doc,
  getDocs,
  updateDoc,
  deleteDoc,
  setDoc,
  query,
  where,
} from "firebase/firestore";

const KitchenIngredientList = (props) => {
  // const [ingredients, setIngredients] = useState([]);
  // let params = useParams();

  // const docIDquery = query(
  //   collection(db, "users"),
  //   where("username", "==", params.username)
  // );

  // const docRef = doc(db, "users", );
  // console.log(docRef);

  // console.log(docIDquery);
  // useEffect(() => {
  //   getIngredients();
  //   // eslint-disable-next-line
  // }, []);
  // console.log(props.testProp);

  // // async api call to db: READ ingredients
  // const getIngredients = async () => {
  //   const ingredientData = await getDocs(
  //     collection(db, `users/${props.currentUser}/kitchen`)
  //   );

  //   // loop through docs in collection and set ingredients array to be equal to array of doc data and id for each doc
  //   setIngredients(
  //     ingredientData.docs.map((doc) => ({
  //       ...doc.data(),
  //       id: doc.id,
  //     }))
  //   );
  // };

  // // async api call to db: UPDATE ingredients (increase count on button cl
  // const increaseIngredients = async (ingredient) => {
  //   const ingredientDoc = doc(
  //     db,
  //     `users/${props.currentUser}/kitchen/${ingredient.id}`
  //   );
  //   const newFields = { quantity: ingredient.quantity + 1 };
  //   await updateDoc(ingredientDoc, newFields);
  //   getIngredients();
  // };

  // // async api call to db: UPDATE ingredients (decrease count on button click)
  // const decreaseIngredients = async (ingredient) => {
  //   const ingredientDoc = doc(
  //     db,
  //     `users/${props.currentUser}/kitchen/${ingredient.id}`
  //   );
  //   const newFields = { quantity: ingredient.quantity - 1 };
  //   await updateDoc(ingredientDoc, newFields);
  //   getIngredients();
  // };

  // // aync api call to db: DELETE ingredient
  // const deleteIngredient = async (ingredient) => {
  //   const ingredientDoc = doc(
  //     db,
  //     `users/${props.currentUser}/kitchen/${ingredient.id}`
  //   );
  //   await deleteDoc(ingredientDoc);
  //   getIngredients();
  // };

  return (
    <section className="user-kitchen">
      <h2>welcome {props.currentUser}!</h2>
      {/* <h2>welcome {params.username}!</h2> */}
      <button
        onClick={() => {
          props.getIngredients();
        }}
      >
        open my fridge
      </button>
      <h3>here's your kitchen: </h3>
      {props.ingredients?.map((ingredient) => {
        return (
          <section>
            <li key={ingredient.id}>
              <h3>{ingredient.name}</h3>
            </li>
            <button
              className="increase-button"
              onClick={() => {
                props.increaseIngredients(ingredient);
              }}
            >
              ⬆
            </button>
            <p>{ingredient.quantity}</p>
            <p>{ingredient.unit}</p>
            <button
              className="decrease-button"
              onClick={() => {
                props.decreaseIngredients(ingredient);
              }}
            >
              ⬇
            </button>
            <br></br>
            <button
              onClick={() => {
                props.getRecipes(ingredient);
              }}
            >
              get recipes that use {ingredient.name}
            </button>
            <br></br>
            <button
              onClick={() => {
                props.deleteIngredient(ingredient);
              }}
            >
              delete {ingredient.name}
            </button>
            <p>______</p>
          </section>
        );
      })}
    </section>
  );
};

export default KitchenIngredientList;
