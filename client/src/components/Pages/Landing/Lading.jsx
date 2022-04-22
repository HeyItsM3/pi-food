import { Link } from "react-router-dom";
import "./landing.scss";

const Landing = () => {
  return (
    <div className="content-wrapper main">
      <div className="container">
        <h1>Foods</h1>
        <Link to="/home">
          <button className="btn">Go</button>
        </Link>
      </div>
    </div>
  );
};

export default Landing;
