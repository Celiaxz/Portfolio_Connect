function Pagination({ currentPage, totalPages, onPrevClick, onNextClick }) {
  return (
    <div className="pagination-controls">
      <button onClick={onPrevClick} disabled={currentPage === 1}>
        <i className="fas fa-chevron-left"></i> Previous
      </button>
      <button onClick={onNextClick} disabled={currentPage >= totalPages}>
        Next <i className="fas fa-chevron-right"></i>
      </button>
    </div>
  );
}

export default Pagination;
