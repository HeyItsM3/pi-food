import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipes } from "redux/actions";
import { Link } from "react-router-dom";
import Page404 from "../Page404";
import Card from "../../Organisms/Card";
import Pagination from "../../Organisms/Pagination";
import Navigation from "../../Organisms/Navigation";
import Filter from "../../Organisms/Filter";
import Loader from "../../Organisms/Loader";
import "./Home.scss";
import logo from "assets/images/food-logo.png";

const Home = () => {
  const dispatch = useDispatch();
  const allRecipes = useSelector((state) => state.recipes);

  // Loader
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    dispatch(getRecipes());
    setLoader(true);
    setTimeout(() => {
      setLoader(false);
    }, 1700);
  }, [dispatch]);

  const [currentPage, setCurrentPage] = useState(1);
  const [recipesPerPage] = useState(9);
  const iOfLastRecipe = currentPage * recipesPerPage;
  const iOfFirstRecipe = iOfLastRecipe - recipesPerPage;
  const currentRecipes = allRecipes.slice(iOfFirstRecipe, iOfLastRecipe);

  // Local states for filters
  const [, setOrder] = useState("");
  const [, setRating] = useState("");

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Handlers
  function handleClick(e) {
    e.preventDefault();
    dispatch(getRecipes());
  }

  return (
    <div>
      {loader ? (
        <Loader />
      ) : (
        <div className="main-content home-content">
          <div className="nav-home">
            <div className="max-content">
              <div className="logo">
                <img src={logo} alt="logo" height="40px" />
              </div>
              <Navigation active={true} />
            </div>
          </div>
          <div>
            <div className="card-filter">
              <button onClick={handleClick}>Recipes</button>
              <Filter
                setCurrentPage={setCurrentPage}
                setRating={setRating}
                setOrder={setOrder}
              />
            </div>
            <div className="principal-container">
              {currentRecipes ? (
                <div className="recipes-home">
                  {currentRecipes?.map((e) => {
                    return (
                      <Link to={`/recipe/${e.id}`} key={e.id}>
                        <Card
                          key={e.id}
                          image={e.image}
                          name={e.name}
                          diets={e.diets.map((diet) =>
                            diet.name ? `${diet.name} - ` : "No hay dietas"
                          )}
                        />
                      </Link>
                    );
                  })}
                </div>
              ) : (
                <Page404 />
              )}
              <Pagination
                recipesPerPage={recipesPerPage}
                allRecipes={allRecipes.length}
                paginate={paginate}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
