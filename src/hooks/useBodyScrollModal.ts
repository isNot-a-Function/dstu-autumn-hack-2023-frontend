import React, { useEffect, useState, useRef } from 'react';

export const useBodyScrollModal = () => {
  useEffect(() => {
    const body = document.querySelector('body');
    if (body) {
      body.style.overflow = 'hidden';
    }
    return () => {
      if (body) body.style.overflow = 'auto';
    };
  }, []);
};
