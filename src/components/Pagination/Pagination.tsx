import React, { useEffect, useState } from 'react';
import '../../assets/scss/components/pagination/_pagination.scss';
import { getArrayFromDigit } from '../../utils/getArrayFromDigit';
import { useWindowSize } from '../../hooks/useWindowSize';

const buttonWithPoints = (
  page: number,
  currentPage: number,
  setCurrentPage: (num: number) => void,
  position: string,
  i: number,
  isHavePoints: boolean,
) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'row' }} key={i}>
      {position === 'top' && isHavePoints && <div className="paginationP" />}
      <button
        key={page}
        onClick={() => setCurrentPage(page)}
        className={`mx-2 btn paginationBtn ${page === currentPage ? 'blackBtn blackBtnPagination' : 'blackBtn'}`}
      >
        {page}
      </button>
      {position === 'bottom' && isHavePoints && <div className="paginationP" />}
    </div>
  );
};

interface PaginationProps {
  currentPage: number;
  pagesAmount: number;
  setCurrentPage: (num: number) => void;
  perPage?: number;
}

const Pagination = ({ currentPage, pagesAmount, setCurrentPage, perPage = 10 }: PaginationProps) => {
  const [valueInPage, setValueInPage] = useState(perPage);
  const dimensions = useWindowSize();

  useEffect(() => {
    if (dimensions.width <= 610) {
      setValueInPage(5);
    }
    if (dimensions.width > 610) {
      setValueInPage(10);
    }
  }, [dimensions.width]);

  return (
    <div className="d-flex justify-content-center">
      <button
        key={-1}
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(currentPage - 1)}
        className="mx-2 btn paginationBtn blackBtn blackBtnPagination"
      >
        &#8592;
      </button>
      <div className="paginationWrap">
        {getArrayFromDigit(pagesAmount, currentPage, valueInPage, 'pagination')?.map((page, i) => {
          if (i === 1 && page - 1 != 1) {
            return buttonWithPoints(page, currentPage, setCurrentPage, 'top', i, dimensions.width >= 1280);
          } else if (i == valueInPage - 2 && page + 1 != pagesAmount) {
            return buttonWithPoints(page, currentPage, setCurrentPage, 'bottom', i, dimensions.width >= 1280);
          }
          return (
            <button
              key={i}
              onClick={() => setCurrentPage(page)}
              className={`mx-2 btn paginationBtn ${page === currentPage ? 'blackBtn blackBtnPagination' : 'blackBtn'}`}
            >
              {page}
            </button>
          );
        })}
      </div>
      <button
        key={-2}
        disabled={currentPage === pagesAmount}
        onClick={() => setCurrentPage(currentPage + 1)}
        className="mx-2 btn paginationBtn blackBtn blackBtnPagination"
      >
        &#8594;
      </button>
    </div>
  );
};

export default Pagination;
