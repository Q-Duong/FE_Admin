import { useEffect, useState } from 'react';
import Pagination from 'react-bootstrap/Pagination';
import PropTypes from 'prop-types'
import './Pagination.css'

MyPagination.propsType = {
  paginationOptions: PropTypes.object,
}

function MyPagination(props) {
  const { onPageChange, paginationOptions } = props

  const { totalPages, page, hasPrevPage, hasNextPage } = paginationOptions
  const [startPage, setStartPage] = useState(1)
  const [endPage, setEndPage] = useState(5)

  useEffect(() => {
    const tempStartPage = totalPages <= 5 ? 1 : totalPages - 2
    setStartPage(tempStartPage)
    setEndPage(totalPages)
  }, [page, totalPages])

  function handlePageChange(newPage) {
    if(onPageChange)
    onPageChange(newPage)
  }

  return (
    <Pagination size="md">
      <Pagination.First disabled={!hasPrevPage} onClick={() => handlePageChange(1)}/>
      <Pagination.Prev disabled={!hasPrevPage} onClick={() => handlePageChange(page-1)}/>
      {
        Array.from({ length: endPage - startPage + 1 }, (_, myPage) =>
          myPage + startPage
        ).map(myPage => (
          <Pagination.Item active={myPage === page} onClick={() => handlePageChange(myPage)}>{myPage}</Pagination.Item>
        ))
      }
      <Pagination.Next disabled={!hasNextPage}  onClick={() => handlePageChange(page+1)}/>
      <Pagination.Last disabled={!hasNextPage} onClick={() => handlePageChange(totalPages)}/>
    </Pagination>
  );
}

export default MyPagination;