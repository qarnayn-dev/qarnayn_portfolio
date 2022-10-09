import { useState, useEffect } from 'react';



export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (windowDimensions.width === 0 && windowDimensions.height ===0) handleResize();

    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    function getWindowDimensions() {
        const { innerWidth: width, innerHeight: height } = window;
        return {width, height};
    }

    if (window) {window.addEventListener('resize', handleResize);}

    return () => window.removeEventListener('resize', () => {
        console.log("remove subs");
        handleResize();
      });
  }, []);

  return windowDimensions;
}