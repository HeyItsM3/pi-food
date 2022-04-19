import { Link } from "react-router-dom";
import { postRecipe, getDiets } from "../../redux/actions";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navigation from "../Nav/Navigation";

const CreateRecipe = () => {
  const dispatch = useDispatch();
  const allDiets = useSelector((state) => state.diets);
  const [recipe, setRecipe] = useState({
    name: "",
    image: "",
    summary: "",
    rating: 5,
    health: 0,
    instructions: "",
    diets: [],
  });

  useEffect(() => {
    dispatch(getDiets());
  }, [dispatch]);

  function handleNameChange(e) {
    setRecipe({
      ...recipe,
      [e.target.name]: e.target.value.replace(/\b\w/g, (l) => l.toUpperCase()),
    });
  }

  function handleChange(e) {
    setRecipe({
      ...recipe,
      [e.target.name]: e.target.value,
    });
  }

  function handleCheckbox(e) {
    if (e.target.checked && !recipe.diets.includes(e.target.value)) {
      setRecipe({
        ...recipe,
        diets: [...recipe.diets, e.target.value],
      });
    } else {
      setRecipe({
        ...recipe,
        diets: recipe.diets.filter((diet) => diet !== e.target.value),
      });
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (
      recipe.name.length > 0 &&
      recipe.summary.length > 0 &&
      recipe.instructions.length > 0 &&
      recipe.rating <= 100 &&
      recipe.rating >= 1 &&
      recipe.health <= 100 &&
      recipe.health >= 1
    ) {
      dispatch(postRecipe(recipe));
      alert("Your recipe has created succesfully");
      window.location.reload();
    } else {
      alert("Please, check all inputs");
    }
  }

  function handleReload() {
    const result = window.confirm(
      "You are about to cancel the creation of your recipe"
    );
    if (result === true) {
      window.location.reload();
    }
  }

  return (
    <div>
      <Navigation active={false} />
      <Link to="/home">Go back</Link>

      <h1>Create Recipe</h1>

      <div>
        <form>
          <div>
            <label>Name</label>
            <input
              type="text"
              placeholder="Recipe name"
              name="name"
              autoComplete="off"
              value={recipe.name}
              onChange={handleNameChange}
            />
          </div>

          <div>
            <label>Summary</label>
            <input
              type="text"
              placeholder="Resume or summary"
              autoComplete="off"
              name="summary"
              value={recipe.summary}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Rating:</label>
            <input
              type="number"
              min="1"
              max="100"
              name="rating"
              value={recipe.rating}
              onChange={handleChange}
            />

            <label>Health:</label>
            <input
              type="number"
              min="1"
              max="100"
              name="health"
              value={recipe.health}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Instructions</label>
            <input
              type="textarea"
              placeholder="Recipe steps"
              autoComplete="off"
              name="instructions"
              value={recipe.instructions}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Image here: </label>
            <input
              type="url"
              value={recipe.image}
              name="image"
              onChange={handleChange}
            />
          </div>
          <h2>Diets</h2>
          <div>
            {allDiets.map((d) => (
              <label key={d.id}>
                <input
                  onChange={handleCheckbox}
                  type="checkbox"
                  name={d.name}
                  value={d.name}
                />
                {d.name}
              </label>
            ))}
          </div>

          <div>
            <button type="submit" onClick={handleSubmit}>
              Create!
            </button>
          </div>
        </form>
        <button onClick={handleReload}>Discard</button>
      </div>
    </div>
  );
};

export default CreateRecipe;
