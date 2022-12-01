import copy from 'copy-to-clipboard';
import React from 'react'
import { useTrigger } from '../utilities/useTrigger';
import { NotificationBanner } from './NotificationBanner';


interface iClickToCopy{
    children?: any,
    className?: string,
    textToCopy: string,
    message?: string,
}

/**
 * Component wrapper for click to copy component. It can accept any children e.g. string, icon or other components. When the user click, popup will appear from the top indicate the text has been copied.
 * @param textToCopy  text that want to be copied.
 * @param message  custom message when user click.
 * @param className styling with tailwind. Note that this wrapper use div element as its parent. want an inline alignemnt -> `inline-block`.
 *
 */
const ClickToCopy = (props: iClickToCopy) => {
    const { active, fire } = useTrigger();
    const onClick = () => {
        copy(props.textToCopy);
        fire();
    }

    return (
        <>
            <div className={`${props.className} cursor-pointer`} onClick={()=>onClick()}>{props.children}</div>
            <NotificationBanner show={active} message={`${props.message??'Text has been copied to the clipboard.'}`} />
        </>
    )
}

export default ClickToCopy