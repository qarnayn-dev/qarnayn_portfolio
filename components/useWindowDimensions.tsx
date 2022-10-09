import { useState, useEffect } from 'react';



export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState({ width: 0, height: 0 });

useEffect(() => {
    // first initialisation
    handleResize();

    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    function getWindowDimensions() {
      const { innerWidth: width, innerHeight: height } = window;
      console.log("windows dimensions: ", `${width},${height}`);
        return {width, height};
    }

    window.addEventListener('resize', ()=> setWindowDimensions(getWindowDimensions()));
    return () => window.removeEventListener('resize', handleResize);
  }, []);

    // useEffect(() => {
    //     console.log("width, height : ",`${windowDimensions.width},${windowDimensions.height}`);
    // },[windowDimensions])

  return windowDimensions;
}