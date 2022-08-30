import { Switch } from "@headlessui/react";

interface iSwitch{
  isEnabled: boolean;
  setIsEnabled: any;
  offColor?: string;
  activeColor?: string;
}

const SwitchButton = ({ isEnabled, setIsEnabled,}: iSwitch) => {
  return (
      <Switch
        checked={isEnabled}
        onChange={setIsEnabled}
        className={`bg-themed-gray-t5 relative inline-flex h-[20px] w-[44px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 `}
      >
        {/* <span className="sr-only">Use setting</span> */}
        <span
          aria-hidden="true"
          className={`${isEnabled ? 'translate-x-6' : 'translate-x-0'}
            pointer-events-none inline-block h-[16px] w-[16px] transform rounded-full shadow-lg ring-0 transition duration-200 ease-in-out gray-light-pallete bg-neutral-50 dark:bg-neutral-300`}
        />
      </Switch>
  )
}

export default SwitchButton