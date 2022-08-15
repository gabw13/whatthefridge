import { ReactComponent as EdamamBadge } from "./EdamamBadge.svg";

const RecipeList = (props) => {
  const confirmLeave = (event) => {
    alert("Recipe will open shortly in a new tab.");
  };
  return (
    <section className="recipe-list">
      <h2>recipe box</h2>
      {props.recipes?.map((recipe) => {
        return (
          <section className="recipe-card">
            <li>
              <h3 key={recipe.recipe.recipe.externalID}>
                {recipe.recipe.recipe.label} by {recipe.recipe.recipe.source}
              </h3>
            </li>
            <br></br>
            <img src={recipe.recipe.recipe.image} alt="recipe"></img>
            <br></br>
            <section>
              <h4>categories</h4>
              {recipe.recipe.recipe.dishType.map((type) => {
                return <li>{type}</li>;
              })}
              {recipe.recipe.recipe.dietLabels.map((label) => {
                return <li>{label}</li>;
              })}
            </section>
            <section className="recipe-ingredients">
              <h4>ingredients</h4>
              {recipe.recipe.recipe.ingredients.map((ingredient) => {
                return <li>{ingredient.food}</li>;
              })}
            </section>
            <br></br>
            <button onClick={confirmLeave}>
              <a
                href={recipe.recipe.recipe.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                get recipe
              </a>
            </button>
            <br></br>
          </section>
        );
      })}
      <section className="edamam-badge">
        <EdamamBadge />
      </section>
    </section>
  );
};

export default RecipeList;
