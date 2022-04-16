import { defaultImg } from "../../constants/urls";

export default function Card({
  name,
  image,
  summary,
  rating,
  health,
  instructions,
  diets,
}) {
  return (
    <>
      <img width="450" src={image ? image : defaultImg} alt="Food" />
      <h3>Nombre: {name}</h3>
      <p>Dietas: {diets}</p>
    </>
  );
}
