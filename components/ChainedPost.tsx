import { motion } from "framer-motion"

interface iChainedPost{
    children: string[],
    header: any,
    className?: string,
}

export const ChainedPost = (props: iChainedPost) => {
  return (
    <div className={`${props.className ?? 'w-full'} relative`}>
        <motion.p
            transition={{ duration: 1.2}}
            initial={{opacity:0,y:50}}
            animate={{opacity:1,y:0}}
            className="relative mb-9 style-body apply-inverse-gray text-themed-gray-t2 after:absolute after:bottom-0 after:left-0 after:h-8 after:w-2 after:translate-y-9 after:border-l-2 after:border-primary-t4 ">
            {props.header}
        </motion.p>
        {props.children.map((v, i) => <Content key={i} isLastItem={(i === props.children.length - 1)}>{v}</Content> )}
    </div>
  )
}

interface iContent{
  children?: string,
  className?:string,
  isLastItem?: boolean,
}

const Content = ({children,className,isLastItem = false}:iContent) => {
  return (
    <motion.div
        transition={{ duration: 0.7,delay:0.4}}
        initial={{opacity:0,y:20}}
        animate={{opacity:1,y:0}}
        className={`relative pl-6 pb-4 mobile-lg:pb-5 xl:pb-6 border-l-2
        ${className?? 'style-body apply-inverse-gray text-themed-gray-t8'}
        ${isLastItem ? 'border-transparent' : 'border-primary-t3'}
        before:absolute before:top-0 before:border-primary-t3 before:rounded-bl-full before:w-5 before:-left-[2px] before:border-b-2 before:border-l-2
        before:h-3 mobile-lg:before:h-[14px]
        `}>
            {children}
    </motion.div>
  )
}