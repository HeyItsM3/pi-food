import defaultImg from "../../assets/images/default.png";

export default function Card({ name, image, diets }) {
  return (
    <>
      <img width="450" src={image ? image : defaultImg} alt="Food" />
      <h3>{name}</h3>
      <p>{diets}</p>
    </>
  );
}
