export const Footer = () => {
  const twComp: string = "w-[20vw] h-20 mobile-lg:24 pl-8 rounded-sm border-l-[2px] border-neutral-800 border-dashed";

  return (
    <div className='w-full frame-bounded-x py-5 bg-black bg-opacity-90  text-neutral-200 flex flex-col'>
      <div className='w-full mr-4 pt-16 flex flex-row items-center'>
        <div className='w-[60vw] sm:w-[40vw] max-w-md flex flex-col'>
          <div className='mb-3 style-heading-h2 font-bold bg-gradient-to-br from-primary-base to-secondary-base text-transparent bg-clip-text drop-shadow-2xl'>Qarnayn<br />Khairuddin</div>
          <div className='w-40 style-small-text text-neutral-300'>An Engineer who engraves ambitious vision into design.</div>
        </div>
        <div className={`${twComp} flex flex-col justify-center list-none text-neutral-600 style-small-text`}>
          <li>Home</li>
          <li>Projects</li>
          <li>Blogs</li>
        </div>
        <div className={`${twComp} hidden sm:flex flex-row gap-5 items-center text-neutral-600 style-small-text`}>
          <div className='w-10 h-10 rounded-md border-[2px] border-neutral-800'></div>
          <div className='w-10 h-10 rounded-md border-[2px] border-neutral-800'></div>
        </div>
      </div>
      <div className='w-full mt-8 style-small-text text-neutral-500'>© 2022 Qarnayn Khairuddin – all rights reserved.</div>
    </div>
  )
}
