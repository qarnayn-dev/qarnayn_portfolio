import { Transition } from '@headlessui/react'
import React, { ReactNode} from 'react'

interface iPairedIcons{
  primaryIcon: ReactNode
  secondaryIcon: ReactNode
  isActive: boolean
  addActiveAttr?:string
  customDefaultAttr?:string
}

const AnimatedIcon = ({primaryIcon: defaultIcon,secondaryIcon: activeIcon,isActive,addActiveAttr,customDefaultAttr}:iPairedIcons )=> {

  return (
    <div className={`relative w-full h-full ${addActiveAttr} ${customDefaultAttr}`}>
      <SingleIcon isActive={isActive} icon={activeIcon} />
      <SingleIcon isActive={!isActive} icon={defaultIcon} />
    </div>
  )
}

export default AnimatedIcon

interface iSingleIconComp{
  isActive: boolean,
  icon: ReactNode,
}

const SingleIcon = ({isActive, icon}:iSingleIconComp) => {
  return (
    <Transition
          show={isActive}
          enter="transition-opacity duration-700"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          className="absolute w-full h-full top-0 right-0 flex justify-center items-center">
          {icon}
    </Transition>
  )
 }