const KitchenIngredientList = (props) => {
  return (
    <section className="user-kitchen">
      <h2>Kitchen</h2>
      {props.ingredients?.map((ingredient) => {
        return (
          <section>
            <li>
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
