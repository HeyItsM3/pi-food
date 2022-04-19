import { Link, useNavigate } from "react-router-dom";
import { postRecipe, getDiets } from "../../redux/actions";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navigation from "../Organisms/Navigation";

function validateInput(inp) {
  let errors = {};

  if (!inp.name || !/([a-zA-Z])\w+/g.test(inp.name)) {
    errors.name = "Invalid name";
  }
  if (inp.rating < 0 || inp.rating > 100) {
    errors.rating = "Rating must be between 0 and 100";
  }
  if (inp.health < 0 || inp.health > 100) {
    errors.health = "The health level must be between 0 and 100.";
  }
  if (!inp.summary) {
    errors.summary = "A brief introduction of the dish";
  }

  // if (!inp.image || !/.*\.(gif|jpe?g|bmp|png)$/gim.test(inp.image)) {
  //   errors.image = "You need to provide a valid image";
  // }

  return errors;
}

const CreateRecipe = () => {
  const dispatch = useDispatch();
  const allDiets = useSelector((state) => state.diets);
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [input, setRecipe] = useState({
    name: "",
    image: "",
    summary: "",
    rating: 25,
    health: 25,
    instructions: "",
    diets: [],
  });

  useEffect(() => {
    dispatch(getDiets());
  }, [dispatch]);

  // function handleNameChange(e) {
  //   setRecipe({
  //     ...recipe,
  //     [e.target.name]: e.target.value.replace(/\b\w/g, (l) => l.toUpperCase()),
  //   });
  // }

  function handleChange(e) {
    setRecipe({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validateInput({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleCheckbox(e) {
    if (e.target.checked && !input.diets.includes(e.target.value)) {
      setRecipe({
        ...input,
        diets: [...input.diets, e.target.value],
      });
    } else {
      setRecipe({
        ...input,
        diets: input.diets.filter((diet) => diet !== e.target.value),
      });
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    setErrors(validateInput(input));
    if (
      input.name &&
      input.summary &&
      input.rating > 0 &&
      input.rating < 100 &&
      input.health > 0 &&
      input.health < 100
    ) {
      dispatch(postRecipe(input));
      alert("Recipe created");
      navigate("/home");
      setRecipe({
        name: "",
        summary: "",
        rating: 25,
        health: 25,
        instructions: "",
        image: "",
        diets: [],
      });
    } else {
      alert("You must complete the following fields");
    }
  }

  function handleReload() {
    const response = window.confirm("Do you want to cancel?");
    if (response === true) {
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
              value={input.name}
              onChange={handleChange}
            />
            {errors.name && <p style={{ color: "red" }}> {errors.name}</p>}
          </div>

          <div>
            <label>Summary</label>
            <input
              type="text"
              placeholder="Resume or summary"
              autoComplete="off"
              name="summary"
              value={input.summary}
              onChange={handleChange}
            />
            {errors.summary && (
              <p style={{ color: "red" }}> {errors.summary}</p>
            )}
          </div>

          <div>
            <label>Rating:</label>
            <input
              type="number"
              min="1"
              max="100"
              name="rating"
              value={input.rating}
              onChange={handleChange}
            />
            {errors.rating && <p style={{ color: "red" }}> {errors.rating}</p>}
          </div>
          <div>
            <label>Health:</label>
            <input
              type="number"
              min="1"
              max="100"
              name="health"
              value={input.health}
              onChange={handleChange}
            />
            {errors.health && <p style={{ color: "red" }}> {errors.health}</p>}
          </div>

          <div>
            <label>Instructions</label>
            <input
              type="textarea"
              placeholder="Recipe steps"
              autoComplete="off"
              name="instructions"
              value={input.instructions}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Image here: </label>
            <input
              type="url"
              value={input.image}
              name="image"
              onChange={handleChange}
            />
            {/* {errors.image && <p style={{ color: "red" }}> {errors.image}</p>} */}
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
        <button onClick={handleReload}>Cancel</button>
      </div>
    </div>
  );
};

export default CreateRecipe;
