import { useEffect, useRef } from 'react';

type Callback = (event?: Event) => void;

export const useOutsideClick = (callback: Callback) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (event: Event) => {
      if (!ref.current?.contains(event.target as Node)) {
        callback(event);
      }
    };

    document.addEventListener('click', handleClick, true);

    return () => {
      document.removeEventListener('click', handleClick, true);
    };
  }, [ref, callback]);

  return ref;
};
