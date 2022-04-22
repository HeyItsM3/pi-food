import { Link } from "react-router-dom";
import "./landing.scss";
import landing from "assets/images/landing2.gif";

const Landing = () => {
  return (
    <div className="content-wrapper main">
      <div className="container">
        <div className="card-landing">
          <img src={landing} alt="landing" height="370px" weight="400px" />
          <h1>Foods</h1>
          <Link to="/home">
            <button className="btn">Go</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Landing;
