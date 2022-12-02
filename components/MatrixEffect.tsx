import { Transition } from "@headlessui/react";
import { useState, useRef, useEffect, useMemo, ReactNode, useCallback } from "react";
import useWindowDimensions from "../utilities/useWindowDimensions";

interface iMatrixEffectOptions{
    showScreen: boolean,
    children?: ReactNode,
    characterSize?: number,
    // Default to 0.08
    opacityPerDraw?: number,
    // Default to 15
    fps?: number,
}

export const MatrixEffect = ({ children, showScreen, characterSize, opacityPerDraw, fps }: iMatrixEffectOptions) => {
    const [binaryMode, setBinaryMode] = useState(true);
    const { width, height } = useWindowDimensions();
    const canvasRef = useRef<HTMLCanvasElement | null >(null);
    const tileSize: number = characterSize ?? 22; // px
    const frequency: number = Math.floor(1000 / (fps ?? 17));
    const totalOpacPerFrame: number = opacityPerDraw ?? 0.08;
    let interval: NodeJS.Timer | undefined;

    const canvasContext = useMemo<CanvasRenderingContext2D | null | undefined>(() => {
        if (canvasRef.current) return canvasRef.current?.getContext("2d");
    }, [canvasRef.current])

    const maxColumnLength =  useMemo<number |null>(()=>{
        return (width) ? Math.floor(width/tileSize) : null;
    }, [width]);

    const maxStackLength = useMemo<number | null>(() => {
        return (height) ? Math.floor(height/tileSize) : null;
    }, [height]);

    const xAdjust = useMemo<number>(() => {
        return ((width - (maxColumnLength ? (maxColumnLength! * tileSize) : 0)) / 2)
    }, [maxColumnLength]);

    const memoizedColumns = useMemo<SingleColumn[]>(() => {
        const newEntries: SingleColumn[] = [];
        if (maxColumnLength && maxStackLength) {
            for (let i = 0; i < maxColumnLength; i++) {
                newEntries.push(new SingleColumn((i*tileSize),maxStackLength));
            }
        }
        return newEntries;
    }, [maxColumnLength, maxStackLength]);

    useEffect(() => {
        if (binaryMode) {
            const timeout = setTimeout(() => {
                setBinaryMode(false);
            }, 2200);
            return () => clearTimeout(timeout);
        }
    }, [showScreen && canvasContext && binaryMode])


    // listening to any change in the windows dimension
    useEffect(() => {
        // initiate when there's changes in width/ height
        if (canvasRef && canvasRef.current && width && height) {
            const canvas = canvasRef.current;
            canvas.width = width;
            canvas.height = height;
        }
    }, [width, height, canvasRef.current]);

    // Main triggering useEffect
    useEffect(() => {
        if (showScreen && canvasContext) {
            startDrawing();
            return () => clearInterval(interval);
        }
        // once the showScreen === false -> stop
        else {
            clearInterval(interval);
        }
    }, [memoizedColumns, showScreen, canvasContext, binaryMode]);

    function startDrawing() {
        if (interval) clearInterval(interval);
        interval = setInterval(() => { drawFrame(); }, frequency);
    }

    const drawFrame = useCallback(() => {
            if (canvasContext) {
                // draw a layer for the whole dimension with some opacity -> gives fading effect
                canvasContext.fillStyle = `rgba( 0 , 0 , 0 , ${totalOpacPerFrame} )`;
                canvasContext.fillRect(0, 0, width, height);

                // draw characters for each column
                canvasContext.font = (tileSize - 4) + "px monospace";
                canvasContext.fillStyle = "rgb(77,200,171)";

                for (let i = 0; i < memoizedColumns.length; i++) {
                    const element = memoizedColumns[i];
                    canvasContext.fillText(binaryMode? RandomBinary() : RandomCharacter(), (element.x + xAdjust), element.getCurrentY(tileSize));
                    // add counter
                    if (maxStackLength) element.stackCounter(maxStackLength);
                }
            }
        },[canvasContext, binaryMode]);

    return (
        <Transition
            show={showScreen}
            enterTo="opacity-100"
            leave="transition-all duration-[1400ms]"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            className={`fixed z-50 inset-0 bg-black`}>
            <canvas ref={canvasRef} className={`flex overscroll-none object-contain bg-black transition-all duration-500 ${showScreen?'opacity-100':'opacity-0'}`}></canvas>
            {children}
        </Transition>
    )
}

    class SingleColumn {
    x: number;
    stackCount: number;
    maxStackCount!: number;
    constructor(x:number, maxStack: number) {
        this.x = x;
        this.stackCount = 0;
        this.reassignMaxStack(maxStack);
    }

    reassignMaxStack(max: number) {
        this.maxStackCount = Math.floor(10 + (Math.random() * max));
        // console.log("max stack for the column: ", this.maxStackCount);
    }

    stackCounter(max: number) {
        // check if it's the end of the stack
        if (this.stackCount >= this.maxStackCount) {
        this.reassignMaxStack(max);
        this.stackCount = 0;
        }
        this.stackCount++;
    }
        getCurrentY(tileSize: number): number{ return (this.stackCount * tileSize); }

    }


const RandomCharacter = (): string => {
    const normalChars: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const greekChars: string = "ΐΓΔΗΘΙΛΞΠΡΣΤΥΦΧΨΩΪΫάέήίΰαβγδεζηθικλμνξοπρςστυφχψωϊϋόύώϏϐϑϒϓϔϕϖϗϘϙϚϛϜϝϞϟϠϰϱϲϳϴ϶ϷϸϹϺϻϼϽϾϿ";
    const japaneseChars: string = "アイウエオカギゲコザジスセソタチツテドナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヰヱヲンヴヷヸヹヺヾ";
    const allChars: string = normalChars + japaneseChars + greekChars;

    return allChars.charAt(Math.ceil(Math.random() * allChars.length));
}


const RandomBinary = (): string => {
    return (Math.random() > 0.6) ? '1' : '0';
}