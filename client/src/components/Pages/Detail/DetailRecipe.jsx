import defaultImg from "assets/images/default.png";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getById } from "../../../redux/actions";
import { sanitize } from "dompurify";
import { useNavigate } from "react-router-dom";
import Navigation from "../../Organisms/Navigation";
import logo from "assets/images/food-logo.png";
import Delivery from "../../Organisms/Delivery";
import "./Detail.scss";

const DetailRecipe = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
    <div className="create-wrapper">
      <div className="nav-home">
        <div className="max-content">
          <Link to="/home">
            <div className="logo">
              <img src={logo} alt="logo" height="40px" />
            </div>
          </Link>
          <Navigation active={false} />
        </div>
      </div>
      {loader ? (
        <Delivery />
      ) : (
        <div className="detail-container">
          {detail.length === 0 ? (
            <div>Recipe not found...</div>
          ) : (
            <div className="card-detail">
              <div className="image-button-detail">
                <img
                  src={detail[0].image ? detail[0].image : defaultImg}
                  alt="Recipe"
                  width="450"
                />
                <button onClick={() => navigate("/home")} className="btn">
                  Home
                </button>
              </div>
              <div className="content-detail">
                <h2>{detail[0].name}</h2>
                <>
                  <h4>Summary</h4>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: sanitize(detail[0].summary),
                    }}
                  ></p>
                </>
                <>
                  <h4>Rating</h4>
                  <p>
                    {detail[0].rating
                      ? detail[0].rating + " points"
                      : "No rating were found"}
                  </p>
                </>
                <>
                  <h4>Health</h4>
                  <p>
                    {detail[0].health
                      ? `${detail[0].health}%`
                      : "No health were found"}
                  </p>
                </>
                <>
                  <h4>Diets</h4>
                  <p>
                    {detail[0].diets === undefined ? (
                      <> no diets were found</>
                    ) : (
                      detail[0].diets.map((diet) => ` ${diet.name} - `)
                    )}
                  </p>
                </>

                {detail[0].createdDB === true ? (
                  ""
                ) : (
                  <>
                    <h4>Time</h4>
                    <p>
                      {detail[0].time
                        ? detail[0].time + " minutes"
                        : "the time has not been set"}
                    </p>
                  </>
                )}
                <>
                  <h4>Instructions</h4>
                  <p>
                    {detail[0].instructions
                      ? detail[0].instructions
                      : "no instructions were found"}
                  </p>
                </>
                {detail[0].createdDB === true ? (
                  ""
                ) : (
                  <>
                    <h4>DishTypes</h4>
                    <p>
                      {detail[0].dishTypes
                        ? detail[0].dishTypes.map((type) =>
                            type.name
                              ? ` ${type.name} - `
                              : "No dish types were found"
                          )
                        : " this one has no types"}
                    </p>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DetailRecipe;
