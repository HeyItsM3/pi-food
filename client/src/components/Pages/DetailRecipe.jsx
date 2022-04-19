import { defaultImg } from "../../constants/urls";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getById } from "../../redux/actions";
import { sanitize } from "dompurify";
import Navigation from "../Organisms/Navigation";

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
      <Navigation active={false} />
      {loader ? (
        <p>Fiding recipe</p>
      ) : (
        <>
          {detail.length === 0 ? (
            <div>Recipe not found...</div>
          ) : (
            <>
              <img
                src={detail[0].image ? detail[0].image : defaultImg}
                alt="Recipe"
                width="450"
              />
              <h2>{detail[0].name}</h2>
              <>
                Summary:
                <p
                  dangerouslySetInnerHTML={{
                    __html: sanitize(detail[0].summary),
                  }}
                ></p>
              </>

              <p>
                Rating:{" "}
                {detail[0].rating
                  ? detail[0].rating + " points"
                  : "No rating were found"}
              </p>
              <p>
                Health:{" "}
                {detail[0].health
                  ? `${detail[0].health}%`
                  : "No health were found"}
              </p>
              <p>
                Diets:
                {detail[0].diets.map((diet) =>
                  diet.name ? ` ${diet.name} - ` : "No diets were found"
                )}
              </p>
              {detail[0].createdDB === true ? (
                ""
              ) : (
                <p>
                  Time:{" "}
                  {detail[0].time
                    ? detail[0].time + " minutes"
                    : "the time has not been set"}
                </p>
              )}
              <p>
                Instructions:{" "}
                {detail[0].instructions
                  ? detail[0].instructions
                  : "No instructions were found"}
              </p>
              {detail[0].createdDB === true ? (
                ""
              ) : (
                <p>
                  DishTypes:
                  {detail[0].dishTypes
                    ? detail[0].dishTypes.map((type) =>
                        type.name
                          ? ` ${type.name} - `
                          : "No dish types were found"
                      )
                    : " this one has no types"}
                </p>
              )}
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
