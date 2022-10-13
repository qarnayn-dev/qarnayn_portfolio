
interface iBlackHoleOptions{
  children?: any,
  className?: string,
}

export const BlackHole = ({children,className}:iBlackHoleOptions) => {
  const twSize: string = "w-[30vh] h-[30vh]";
  const twSupportSize: string = "w-[35vh] h-[48vh]";
  const twSinggleSupport: string = "w-[10%] h-full from-black z-0 blur-[2px]";

  return (
    <div className={`w-screen h-screen bg-transparent absolute top-0 right-0 flex flex-col items-center justify-center ${className?? 'z-10'}`}>
      <div className={`${twSize} absolute rounded-full bg-transparent filter backdrop-blur-lg shadow-2xl shadow-neutral-800`}>
      </div>
      <div className={`${twSize} rounded-full bg-neutral-700 bg-opacity-30 filter blur-3xl absolute -z-10`}>
      </div>
      <div className={`${twSize} rounded-full bg-black bg-opacity-60 blur-xl filter absolute`}></div>
      <div className={`${twSize} p-6 absolute font-mono text-neutral-100 flex flex-col justify-center items-center text-center`}>
        {children}
      </div>
      <div className={`${twSupportSize} absolute bottom-0 -z-20 shadow-black shadow-2xl flex`}>
        <span className={`${twSinggleSupport} bg-gradient-to-l `}></span>
        <span className='w-full h-full bg-black  blur-[2px]'></span>
        <span className={`${twSinggleSupport} bg-gradient-to-r`}></span>
      </div>
    </div>
  )
}