import { useRef, useEffect } from 'react';

function useDocumentTitle(title: string | undefined, prevailOnUnmount = false) {
  const defaultTitle = useRef(document.title);

  useEffect(() => {
    if (title !== undefined) {
      document.title = title;
    }
  }, [title]);

  useEffect(
    () => () => {
      if (!prevailOnUnmount) {
        document.title = defaultTitle.current;
      }
    },
    [],
  );
}

export default useDocumentTitle;
