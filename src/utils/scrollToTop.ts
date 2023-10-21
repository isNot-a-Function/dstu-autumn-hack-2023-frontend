import { useEffect, useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();

  // useEffect(() => {
  // document.body.scrollTo(0, 0);
  // window.scrollTo(0, 0);
  // }, [pathname]);
  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
