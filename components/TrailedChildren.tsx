import { animated, easings, useTransition } from "react-spring";


/// Animate the children props in sequennces
/// to control the children layout, use [className]
const TrailedChildren = ({children, className, isHorizontal, startingX, startingY, duration, trail}:iTrailedChildren) => {

    const propChildren: any[] = [...children];
    const numOfChild: number = propChildren.length;
    const curatedDuration:number = duration ?? ((numOfChild<6)? 230 * numOfChild : 1000);
    const curatedTrail: number = trail ?? (300 - ((numOfChild > 6) ? (numOfChild - 6) * 10 : 0));

    const twConfig: string = `flex w-min h-min gap-2 ${className}`;
    const twDirection: string = isHorizontal? 'flex-row':'flex-col';

    const transitions = useTransition(propChildren, {
        trail: curatedTrail,
        config: {duration:curatedDuration, easing: easings.easeOutBack},
        keys: propChildren.map((_, index) => index),
        from: {opacity : 0 , y: startingY ?? 200 , x: startingX ?? 0 },
        enter: {opacity : 1, y: 0, x: 0},
        to: { opacity: 0 },
        delay: 200,
    });

    return (
        <div className={`${twConfig} ${twDirection}`}>
            {transitions((styles, item) => (
                <animated.div style={styles} className='float-left'>{item}</animated.div>
            ))}
        </div>
    )
}

export default TrailedChildren


interface iTrailedChildren{
    children: object[],
    /// For the object aligments, please specify here
    className?: string | undefined
    isHorizontal?: boolean ,
    startingX?: number,
    startingY?: number,
    duration?: number,
    trail?: number,
}