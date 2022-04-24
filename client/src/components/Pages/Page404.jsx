import notFound from "assets/images/notFound.gif";
import { Link } from "react-router-dom";

const Page404 = () => {
  return (
    <div className="infoNotFound">
      <div className="container-404 ">
        <div className="card-404">
          <img src={notFound} alt="404" />
          <div className="content">
            <Link to="/home">
              <button className="btn">Reload</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page404;
