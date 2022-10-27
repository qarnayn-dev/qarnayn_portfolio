import { motion, useScroll, useTransform } from "framer-motion";
import { useRef} from "react";


interface iRevealingPage{
  children: any,
}

/**
 * Reveal the underlayer when the minimum screen is in view
 */
export const RevealingPage = ({ children}: iRevealingPage) => {
  const revealingLayerRef = useRef(null);

  const { scrollYProgress } = useScroll({ target: revealingLayerRef, offset: ["0 1", "0 0"] });
  const opacity = useTransform(scrollYProgress, [0, 0.4, 1], [1, 0.8, 0]);

  return (
    <div className="relative">
      <motion.div ref={revealingLayerRef} style={{ opacity }}  className="w-screen h-screen bg-themed-gray-base absolute top-0 left-0 z-20"></motion.div>
      {children}
    </div>
  )
}

/**
 * create a page effect at the lat of parent's height.
 * NOTE: please set the parent's position to `relative`
 */
export const ShadowPage = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["1 1", "1 0"] });
  const opacity = useTransform(scrollYProgress, [0, 0.75, 0.999, 1], [0, 1, 1, 0]);

  return (
    <motion.div ref={ref} style={{opacity}} className="w-screen h-10 shadow-end-page absolute bottom-0 left-0 z-30"></motion.div>
  )
}
