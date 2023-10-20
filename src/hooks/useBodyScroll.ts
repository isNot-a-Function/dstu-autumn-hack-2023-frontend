import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';

export const useBodyScroll = (condition?: boolean) => {
  let location = useLocation();
  const body = document.querySelector('body');

  useEffect(() => {
    return () => {
      if (body) {
        body.style.overflow = 'auto';
      }
    };
  }, []);

  useEffect(() => {
    const activeMode = Number(localStorage.getItem('section') != null ? localStorage.getItem('section') : 0);
    if (body) {
      if (condition) {
        const iOSBodyStyle = {
          WebkitOverflowScrolling: 'none',
          overflow: 'hidden',
        };
        Object.assign(document.body.style, iOSBodyStyle);
      } else {
        if (location.pathname != '/' || activeMode !== 0) {
          body.style.overflow = 'auto';
        }
      }
    }
  }, [condition]);
};
