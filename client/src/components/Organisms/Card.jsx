import defaultImg from "assets/images/default.png";

export default function Card({ name, image, diets }) {
  return (
    <div className="cardWrap">
      <div className="card">
        <img
          width="450"
          src={image ? image : defaultImg}
          className="cardBg"
          alt="Food"
        />
        <div className="cardInfo">
          <h3 className="cardTitle">{name}</h3>
          <p>{diets}</p>
        </div>
      </div>
    </div>
  );
}
