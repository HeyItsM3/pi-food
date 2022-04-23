const Pagination = ({ recipesPerPage, allRecipes, paginate }) => {
  const pageNumers = [];

  for (let i = 1; i <= Math.ceil(allRecipes / recipesPerPage); i++) {
    pageNumers.push(i);
  }

  return (
    <div className="pagination-content">
      <nav>
        <ul>
          {pageNumers &&
            pageNumers.map((number) => (
              <li key={number}>
                <button onClick={() => paginate(number)}>{number}</button>
              </li>
            ))}
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
