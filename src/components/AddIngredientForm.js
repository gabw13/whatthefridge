import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase.config";

const AddIngredientForm = (props) => {
  const [newIngredientsName, setNewIngredientsName] = useState([]);
  const [newIngredientsQuantity, setNewIngredientsQuantity] = useState([]);

  // event handler that updates the state of the new ingredient name as the user types the name into the form
  const onNameChange = (event) => {
    const inputValue = event.target.value;
    setNewIngredientsName(inputValue);
  };

  // event handler that updates the state of the new ingredient quantity as the user types the name into the form
  const onQuantityChange = (event) => {
    const inputValue = event.target.value;
    setNewIngredientsQuantity(inputValue);
  };

  // async api call to db: CREATE ingredients
  const createIngredients = async () => {
    await addDoc(collection(db, `users/${props.currentUser}/kitchen`), {
      name: newIngredientsName,
      quantity: Number(newIngredientsQuantity),
    });
    alert(`${newIngredientsName} added to kitchen!`);
    props.getIngredients();
  };

  // submit handler that sends the item to the createIngredients function when the user clicks submit
  const onFormSubmit = (event) => {
    event.preventDefault();
    createIngredients();
    setNewIngredientsName([]);
    setNewIngredientsQuantity([]);
  };

  return (
    <section className="kitchen-form">
      <h2>add ingredients to kitchen:</h2>
      <form onSubmit={onFormSubmit}>
        <label htmlFor="ingredient name">
          Ingredient name:
          <input
            type="text"
            name="name"
            value={newIngredientsName}
            onChange={onNameChange}
          ></input>
        </label>
        <br></br>
        <label>
          Ingredient quantity:
          <input
            type="number"
            name="quantity"
            min="1"
            value={newIngredientsQuantity}
            onChange={onQuantityChange}
          ></input>
        </label>
        <br></br>
        <button type="submit">submit</button>
      </form>
    </section>
  );
};

export default AddIngredientForm;
