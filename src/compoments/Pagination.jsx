function Pagination({ pageInfo, onPageChange }) {
  const handlePageChange = (page,event) => {
    event.preventDefault();
    onPageChange(page); //將頁數資料傳入
  };
  return (
<div className="d-flex justify-content-center">
  <nav>
    <ul className="pagination">
      <li className="page-item">
        <a href="#" className={`page-link ${!pageInfo.has_pre && "disabled" }`} onClick={()=>
          handlePageChange(pageInfo.current_page - 1,event)}
          >
          上一頁
        </a>
      </li>
      {/*總頁數*/}
      {Array.from({ length: pageInfo.total_pages }).map((_, index) => {
      return (
      <li className={`page-item ${ pageInfo.current_page===index + 1 && "active" }`} key={index}>
        {" "}
        {/* 所在頁數加上active */}
        <a href="#" onClick={()=> handlePageChange(index + 1,event)}
          className="page-link"
          >
          {index + 1}
        </a>
      </li>
      );
      })}
      <li className="page-item">
        <a href="#" className={`page-link ${!pageInfo.has_next && "disabled" }`} onClick={()=>
          handlePageChange(pageInfo.current_page + 1,event)}
          >
          下一頁
        </a>
      </li>
    </ul>
  </nav>
</div>
  );
}
export default Pagination;
