import defaultImg from "assets/images/default.png";

export default function Card({ name, image, diets }) {
  return (
    <div className="wrapper">
      <div className="card">
        <img src={image ? image : defaultImg} className="cardBg" alt="Food" />
        <div className="cardInfo">
          <h3 className="cardTitle">{name}</h3>
          <p>{diets}</p>
        </div>
      </div>
    </div>
  );
}
