import { useState, useEffect, AbstractView } from "react";

interface iUseTrigger{
  active: boolean,
  fire: () => void,
  disarm: () => void,
}

interface options{
    duration?: number,
    alwaysAlive?: boolean,
}

/**
 * Mainly to return a state of `active` after `fire()` has been executed.
 * @param config optional setting.
 * @param config.duration the duration to dissapears. The default duration is 2000ms.
 * @param config.alwaysAlive option for staying alive after the `fire()` execution
 * @returns action: boolean, the state
 * @returns fire: void function, method to trigger the state -> true
 * @returns disarm: void function, method to cancel the state -> false
 */
export const useTrigger = (config?: options): iUseTrigger => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (isActive && !config?.alwaysAlive) {
      const timeout = setTimeout(() => {
        setIsActive(false);
      }, config?.duration?? 2000);
      return () => clearTimeout(timeout);
    }
  }, [isActive])

  function fire() {setIsActive(true);}
  function cancel() {setIsActive(false);}

  return {active: isActive, fire: fire, disarm: cancel};
}