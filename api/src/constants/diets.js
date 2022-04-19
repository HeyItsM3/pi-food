let dietList = [
  { name: "gluten free" },
  { name: "ketogenic" },
  { name: "vegetarian" },
  { name: "lacto vegetarian" },
  { name: "ovo vegetarian" },
  { name: "lacto ovo vegetarian" },
  { name: "vegan" },
  { name: "pescetarian" },
  { name: "paleolithic" },
  { name: "primal" },
  { name: "whole 30" },
  { name: "dairy free" },
  { name: "low fodmap" },
];

let checkName = (name, str) => {
  let pattern = str
    .split("")
    .map((x) => {
      return `(?=.*${x})`;
    })
    .join("");
  let regex = new RegExp(`${pattern}`, "g");
  return name.match(regex);
};

module.exports = {
  dietList,
  checkName,
};
