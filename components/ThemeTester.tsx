import React from 'react'

const ThemeTester = () => {
  return (
      <div>
      <div className=' w-[50%] gray-dark-pallete dark-color-pallete flex flex-col justify-center pl-12 py-10 gap-4 float-left bg-themed-gray-base'>
        <div className='h-10 w-full bg-primary-base text-center p-[auto] text-on-primary'> Hello world</div>
        <div className='h-10 w-full bg-primary-t2'></div>
        <div className='h-10 w-full bg-primary-t3'></div>
        <div className='h-10 w-full bg-primary-t4'></div>
        <div className='h-10 w-full bg-primary-t5'></div>
        <div className='h-10 w-full bg-secondary-base text-center p-[auto] text-on-secondary'> Hello world</div>
        <div className='h-10 w-full bg-secondary-t2'></div>
        <div className='h-10 w-full bg-secondary-t3'></div>
        <div className='h-10 w-full bg-secondary-t4'></div>
        <div className='h-10 w-full bg-secondary-t5'></div>
        {/* themed gray */}
        <div className='h-10 w-full bg-themed-gray-t2'></div>
        <div className='h-10 w-full bg-themed-gray-t3'></div>
        <div className='h-10 w-full bg-themed-gray-t4'></div>
        <div className='h-10 w-full bg-themed-gray-t5'></div>
        <div className='h-10 w-full bg-themed-gray-t6'></div>
        <div className='h-10 w-full bg-themed-gray-t7'></div>
        <div className='h-10 w-full bg-themed-gray-t8'></div>
        <div className='h-10 w-full bg-themed-gray-t9'></div>
        {/* semantics */}
        <div className='h-10 w-full bg-semantic-info'></div>
        <div className='h-10 w-full bg-semantic-info-t2'></div>
        <div className='h-10 w-full bg-semantic-success'></div>
        <div className='h-10 w-full bg-semantic-success-t2'></div>
        <div className='h-10 w-full bg-semantic-warning'></div>
        <div className='h-10 w-full bg-semantic-warning-t2'></div>
        <div className='h-10 w-full bg-semantic-error'></div>
        <div className='h-10 w-full bg-semantic-error-t2'></div>
      </div>

      <div className='w-[50%] gray-light-pallete light-color-pallete flex flex-col justify-center pr-12 py-10 gap-4 float-right items-start'>
        <div className='h-10 w-full bg-primary-base text-center p-[auto] text-on-primary'> Hello world</div>
        <div className='h-10 w-full bg-primary-t2'></div>
        <div className='h-10 w-full bg-primary-t3'></div>
        <div className='h-10 w-full bg-primary-t4'></div>
        <div className='h-10 w-full bg-primary-t5'></div>
        <div className='h-10 w-full bg-secondary-base text-center text-on-secondary'>Hello world</div>
        <div className='h-10 w-full bg-secondary-t2'></div>
        <div className='h-10 w-full bg-secondary-t3'></div>
        <div className='h-10 w-full bg-secondary-t4'></div>
        <div className='h-10 w-full bg-secondary-t5'></div>
        {/* themed gray */}
        <div className='h-10 w-full bg-themed-gray-t2'></div>
        <div className='h-10 w-full bg-themed-gray-t3'></div>
        <div className='h-10 w-full bg-themed-gray-t4'></div>
        <div className='h-10 w-full bg-themed-gray-t5'></div>
        <div className='h-10 w-full bg-themed-gray-t6'></div>
        <div className='h-10 w-full bg-themed-gray-t7'></div>
        <div className='h-10 w-full bg-themed-gray-t8'></div>
        <div className='h-10 w-full bg-themed-gray-t9'></div>
        {/* semantics */}
        <div className='h-10 w-full bg-semantic-info'></div>
        <div className='h-10 w-full bg-semantic-info-t2'></div>
        <div className='h-10 w-full bg-semantic-success'></div>
        <div className='h-10 w-full bg-semantic-success-t2'></div>
        <div className='h-10 w-full bg-semantic-warning'></div>
        <div className='h-10 w-full bg-semantic-warning-t2'></div>
        <div className='h-10 w-full bg-semantic-error'></div>
        <div className='h-10 w-full bg-semantic-error-t2'></div>
      </div>
      </div>
  )
}

export default ThemeTester