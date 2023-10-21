export const getArrayFromDigit = (digit: number, currentPage: number, valueInPage: number, functional = 'table') => {
  const res = [];
  if (digit <= valueInPage || functional === 'table') {
    for (let i = 1; i <= digit; i++) res.push(i);
  } else {
    if (currentPage === 1 || currentPage < valueInPage - 2) {
      for (let i = 1; i <= valueInPage - 1; i++) res.push(i);
      res.push(digit);
    } else if (currentPage === digit || currentPage > digit - valueInPage + 2) {
      res.push(1);
      for (let i = digit - valueInPage + 2; i <= digit; i++) res.push(i);
    } else {
      let limit = digit;
      if (currentPage + (valueInPage - 3) < digit) {
        limit = currentPage + (valueInPage - 3);
      }
      if (currentPage - 1 != 1) {
        res.push(1);
      }
      for (let i = currentPage - 1; i <= limit - 1; i++) res.push(i);
      if (limit != digit) {
        res.push(digit);
      }
    }
  }
  return res;
};
