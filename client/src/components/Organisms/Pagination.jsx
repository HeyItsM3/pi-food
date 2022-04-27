const Pagination = ({
  recipesPerPage,
  allRecipes,
  paginate,
  setCurrentPage,
  currentPage,
}) => {
  const pageNumber = [];

  let maxQuantity = Math.ceil(allRecipes / recipesPerPage);

  for (let i = 0; i < maxQuantity; i++) {
    pageNumber.push(i + 1);
  }
  // function hide() {
  //   let result = document.getElementsByClassName("btn-pagination");
  //   console.log(result);
  // }

  return (
    <div className="pagination-content">
      <nav>
        <>
          <ul>
            <button
              disabled={currentPage === 1 || currentPage < 1}
              className="btn-pagination"
              onClick={
                currentPage !== 1 ? () => setCurrentPage(currentPage - 1) : null
              }
            >
              &#x2190;
            </button>
            {pageNumber &&
              pageNumber.map((number) => (
                <li key={number}>
                  <button onClick={() => paginate(number)}>{number}</button>
                </li>
              ))}
            <button
              disabled={
                maxQuantity === currentPage || maxQuantity < currentPage
              }
              className="btn-pagination"
              onClick={
                maxQuantity !== currentPage
                  ? () => setCurrentPage(currentPage + 1)
                  : null
              }
            >
              &#x2192;
            </button>
          </ul>
        </>
      </nav>
    </div>
  );
};

export default Pagination;
