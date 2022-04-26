import notFound from "assets/images/notFound.gif";
import { useNavigate } from "react-router-dom";

const Page404 = () => {
  const navigate = useNavigate();

  return (
    <div className="infoNotFound">
      <div className="container-404 ">
        <div className="card-404">
          <img src={notFound} alt="404" />
          <div className="content">
            <button className="btn" onClick={() => navigate("/home")}>
              Reload
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page404;
