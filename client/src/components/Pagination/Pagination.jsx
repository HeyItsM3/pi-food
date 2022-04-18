const Pagination = ({ recipesPerPage, allRecipes, paginado }) => {
  const pageNumers = [];

  for (let i = 1; i <= Math.ceil(allRecipes / recipesPerPage); i++) {
    pageNumers.push(i);
  }

  return (
    <nav>
      <ul>
        {pageNumers &&
          pageNumers.map((number) => (
            <li key={number}>
              <button onClick={() => paginado(number)}>{number}</button>
            </li>
          ))}
      </ul>
    </nav>
  );
};

export default Pagination;
