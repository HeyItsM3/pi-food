import { Link } from "react-router-dom";
import "./landing.scss";
import landing from "assets/images/landing.gif";

const Landing = () => {
  return (
    <div className="content-wrapper">
      <div className="container">
        <div className="card-landing">
          <img src={landing} alt="landing" height="370px" weight="400px" />
          <div className="content">
            <h1>Food Project</h1>
            <Link to="/home">
              <button className="btn">GO</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
