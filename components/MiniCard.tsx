import Lottie from "lottie-react"

interface iMiniCard{
  animationData: unknown,
  children: string,
  details?: any, // later on will decide the modal's input
}

export const MiniCard = ({ animationData, children }: iMiniCard) => {


  return (
    <div className='h-full w-full float-left rounded-lg bg-themed-gray-base bg-opacity-10 flex flex-col items-center justify-center text-center px-[7vw] lg:px-[2vw] py-8 apply-glass'>
      <Lottie animationData={animationData} className='my-6 h-24 mobile-lg:h-28'></Lottie>
      <div className='h-28 lg:h-36 w-full font-normal style-subheading'>{children}</div>
      <div className='pt-4 mobile-lg:pt-2 text-primary-t2 font-medium cursor-pointer hover:text-primary-base hover:scale-110 transition-all duration-500 ease-in-out'>
        see on how i did →
      </div>
    </div>
  )
 }