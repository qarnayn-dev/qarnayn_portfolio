import { AnimatePresence, motion } from "framer-motion"

interface iNotificationBanner{
  show: boolean,
  message: string,
  className?: string,
  delay?: number,
  duration?: number,
}


/**
 * Show notification at the top center of the viewport.
 * to get the best use of this, use with the @function useTrigger (hook)
 * @param show state to whether to show the banner or not
 * @param message message to display
 * @param delay enter and exit animation delay
 * @param duration duration of the enter and exit animation
 * @returns
 */
export const NotificationBanner = (props: iNotificationBanner) => {
  return (
    <AnimatePresence >
       {props.show &&
         <motion.div
           transition={{ duration: props.duration ?? 0.7, type: "spring", delay: props.delay??0.1}}
           initial={{y: -100}}
           exit={{y: -100}}
           animate={{y: 0}}
           className='fixed w-screen h-fit inset-0 z-20 flex justify-center'>
           <div className='relative top-3 w-72 py-3 px-4 inset-0 z-30 gray-dark-pallete dark:gray-light-pallete bg-themed-gray-t4 rounded-xl drop-shadow-xl text-center text-themed-gray-inverse style-small-text'>{props.message}</div>
         </motion.div>}
    </AnimatePresence>
  )
}
