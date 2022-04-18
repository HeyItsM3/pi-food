import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getById } from "../../redux/actions";
import { sanitize } from "dompurify";

const DetailRecipe = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const detail = useSelector((state) => state.detail);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    dispatch(getById(id));
    setLoader(true);
    setTimeout(() => {
      setLoader(false);
    }, 1500);
  }, [dispatch, id]);
  return (
    <div>
      {loader ? (
        <p>Fiding recipe</p>
      ) : (
        <>
          {detail.length === 0 ? (
            <div>Recipe not found...</div>
          ) : (
            <>
              <img src={detail[0].image} alt="Recipe" />
              <h2>{detail[0].name}</h2>
              <p
                dangerouslySetInnerHTML={{
                  __html: sanitize(detail[0].summary),
                }}
              ></p>
              <p>
                {detail[0].diets.map((diet) =>
                  diet.name ? `${diet.name} - ` : "No diets were found"
                )}
              </p>
              <p>Rating: {detail[0].rating}</p>
              <p>Health: {detail[0].health}</p>
              <p>Time: {`${detail[0].time} minutes`}</p>
              <p>Instructions: {detail[0].instructions}</p>
              <p>
                DishTypes:
                {detail[0].dishTypes.map((type) =>
                  type.name ? `${type.name} - ` : "No dish types were found"
                )}
              </p>
            </>
          )}
          <Link to="/home">
            <button>Inicio</button>
          </Link>
        </>
      )}
    </div>
  );
};

export default DetailRecipe;
