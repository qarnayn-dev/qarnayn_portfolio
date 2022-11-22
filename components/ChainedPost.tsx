
interface iChainedPost{
  children: string[],
  className?: string,
}

export const ChainedPost = (props: iChainedPost) => {
  return (
    <div className={`${props.className ?? 'w-full'}`}>
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
    <div className={`relative pl-5 pb-4 mobile-lg:pb-5 xl:pb-6
      ${className?? 'style-body'}
      ${isLastItem ? 'border-transparent' : 'border-primary-t3'}
      border-l-2 mobile-lg:border-l-4
      before:absolute before:top-0 before:border-primary-t3 before:w-5 before:rounded-bl-full
      before:h-3 mobile-lg:before:h-4
      before:-left-[2px] mobile-lg:before:-left-1
      before:border-b-2 mobile-lg:before:border-b-4
      before:border-l-2 mobile-lg:before:border-l-4`}>
      {children}
    </div>
  )
}