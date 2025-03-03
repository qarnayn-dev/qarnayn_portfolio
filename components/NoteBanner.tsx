import { motion } from "framer-motion"


interface iNoteBanner{
    children?: any,
    className?: string,
    title?: string,
}

export default function NoteBanner ({children,className, title} : iNoteBanner) {
    return (
      <div
        className={`${className}`}>
          <motion.div
            transition={{ duration: 0.7, type: "spring" }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className=" p-4 pb-5 mb-6 max-w-7xl bg-sky-100 rounded-md border-l-4 border-sky-500 text-sky-700"
            role="alert"
          >
            {title && (<p className="mb-2 font-bold">{title}</p>)}
            {children}
          </motion.div>
      </div>
    )
}