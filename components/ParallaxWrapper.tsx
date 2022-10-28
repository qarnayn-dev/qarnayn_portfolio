import { motion, useScroll, useTransform } from "framer-motion";
import { ReactNode, useRef } from "react";

interface iParallaxWrapper{
  children: ReactNode,
  yDisplacement?: number,
  className?: string,
  threshold?: number[],
  fadeInOut?: boolean,
}

/**
 * This component wrap any any element into a parallax item
 * @param yDisplacement the measurement of how fast the item will moved i.e. when +ve number item moves faster while -ve number item move slower.
 * @param threshold specify the `threshold` on entering and exiting [enter, exit] from 0 to 1 (percentage of the item relative to the viewport). If the second item in the array is not provided,  it will take the first item in the array as its threshold i.e. for exiting. default to [0.001,0.001].
 * @param fadeInOut determine whether the item will fade in and will fade out on entering and exiting after the `threshold` has been met. default set to `false`. if set to true, the item will behave in fadeInOut manner on entering and exiting.
 * @returns
 */
export const ParallaxWrapper = ({children, className,yDisplacement = 0,threshold = [0.001],fadeInOut = false}:iParallaxWrapper) => {
  const ref = useRef(null);
  const {scrollYProgress} = useScroll({ target: ref, offset: ["0 1", "1 0"] });
  const y = useTransform(scrollYProgress, [0, 1], [yDisplacement, -yDisplacement]);
  const thresholdIn: number[] = [(!fadeInOut) ? threshold[0] - 0.001 : 0, threshold[0]];
  const outFrom: number = 1 - (threshold[1] ?? threshold[0]);
  const thresholdOut: number[] = [outFrom,(!fadeInOut)? outFrom+0.001 : 1];
  const keyframeIn: number[] = [0,...thresholdIn,...thresholdOut, 1];
  const opacity = useTransform(scrollYProgress, keyframeIn, [0,0,1,1,0,0]);

  return (
    <motion.div ref={ref} style={{ y,opacity }} className={className}>{children}</motion.div>
  )
}
