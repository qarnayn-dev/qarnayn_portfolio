import { PropsWithChildren, ReactNode, useState } from "react";
import { Parallax } from "react-scroll-parallax";
import { ParallaxProps } from "react-scroll-parallax/dist/components/Parallax/types";


interface iRevealingPage{
  children: object[] | object,
  className?: string | undefined,
  opacityScrolling?: boolean | undefined
}

/// Storybook like effect i.e. when scrolling down, reveeal  the next page
/// NOTE: This is the top page layer only, the next page should use <Parallax opacity={[0,2]}>
export const RevealingPage = ({ children, className, opacityScrolling }: iRevealingPage) => {
  const [isInview, setIsInView] = useState(false);
  const zPosition: string = isInview ? "z-10" : "z-0";
  const hardCap: number = 0.999;
  const threshold: number = 0.1;


  return (
    <Parallax
        opacity={opacityScrolling ?[0,2]:undefined}
      className={`relative w-screen ${className} ${isInview ? "z-10" : "z-0"}`}>
      <>
      {children}
      </>
      <Parallax
        opacity={[0, 1]}
              onProgressChange={(p) => {
                  if (!isInview && p > threshold && p < hardCap)setIsInView(true);
                  else if (isInview && p > hardCap) setIsInView(false);
                  else if (isInview && p < threshold) setIsInView(false);
              }}
        onExit={()=>{if(isInview)setIsInView(false)}}
        className={`w-full absolute bottom-0 right-0 h-20 bg-gradient-to-t from-transparent  ${isInview?'shadow-end-page':'shadow-none'}`}></Parallax>
    </Parallax>
  )
}
