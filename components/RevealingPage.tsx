import { motion, useScroll, useTransform } from "framer-motion";
import { PropsWithChildren, ReactNode, useEffect, useRef, useState } from "react";
import { Parallax } from "react-scroll-parallax";
import { ParallaxProps } from "react-scroll-parallax/dist/components/Parallax/types";


interface iRevealingPage{
  children: any,
}

/// Storybook like effect i.e. when scrolling down, reveeal  the next page
/// NOTE: This is the top page layer only, the next page should use <Parallax opacity={[0,2]}>
export const RevealingPage = ({ children}: iRevealingPage) => {
  const revealingLayerRef = useRef(null);

  const { scrollYProgress } = useScroll({ target: revealingLayerRef, offset: ["0 1", "0 0"] });
  const opacity = useTransform(scrollYProgress,[0,0.4,1],[1,0.8,0])

  useEffect(() => {
    const unsub = scrollYProgress.onChange((p) => console.log("y : ", p));

    return () => { unsub; }
  }, [])


  return (
    <div className="relative">
      <motion.div ref={revealingLayerRef} style={{ opacity }}  className="w-screen h-screen bg-themed-gray-base absolute top-0 left-0 z-40"></motion.div>
      {children}
    </div>
  )
}
