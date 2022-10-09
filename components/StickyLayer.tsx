import { LegacyRef, ReactNode, RefObject } from "react"

interface iStickyLayer{
    children?: ReactNode,
    objRef?: RefObject<HTMLElement>,
    className?: string,
    // [40,45,50,60]
    viewPercent?: number,
    // [tr,tl,br,bl]
    alignment?: string,
}

/**
 * This layer will stick on Top and Right (> 768px) by default.
 */
export const StickyLayer = ({ children, objRef, className, viewPercent = 50, alignment= 'tr'}: iStickyLayer) => {
  const config: { [key: number]: string } = {
    40: "sticky-40",
    45: "sticky-45",
    50: "sticky-50",
    60: "sticky-60",
  }
  const alignConfig: { [key: string]: string } = {
    'tr': "top-0 right-0",
    'tl': "top-0 left-0",
    'br': "bottom-0 right-0",
    'bl': "bottom-0 left-0",
  }
  return (
    <div ref={objRef as LegacyRef<HTMLDivElement>} className={`${config[viewPercent]} ${alignConfig[alignment]} ${className ?? 'float-right'}  sticky  p-3 mobile-lg:p-4 md:p-5 xl:p-6 flex flex-col justify-center items-center z-0`}>{children}</div>
  )
}