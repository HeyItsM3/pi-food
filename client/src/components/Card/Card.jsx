import { defaultImg } from "../../constants/urls";

export default function Card({ name, image, diets }) {
  return (
    <>
      <img width="450" src={image ? image : defaultImg} alt="Food" />
      <h3>Name: {name}</h3>
      <p>Diets: {diets}</p>
    </>
  );
}
