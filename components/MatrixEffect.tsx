import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import useWindowDimensions from "./useWindowDimensions";

interface iMatrixEffectOptions{
    tileSize?: number,
    // Default to 0.08
    opacityPerDraw?: number,
    // Default to 15
    fps?: number,
}

export const MatrixEffect = (options?: iMatrixEffectOptions) => {
    const [showScreen, setShowScreen] = useState(true);
    const [isPaused, setIsPaused] = useState(false);
    const { width, height } = useWindowDimensions();
    const canvasRef = useRef<HTMLCanvasElement | null >(null);
    const [canvasContext, setCanvasContext] = useState<CanvasRenderingContext2D | null | undefined>(null);
    const tileSize: number = options?.tileSize ?? 22; // px
    const frequency: number = Math.floor(1000 / (options?.fps ?? 15));
    const totalOpacPerFrame: number = options?.opacityPerDraw?? 0.08;
    const displayConfigs: string = showScreen? "flex" : "hidden";
    let interval: NodeJS.Timer | undefined;

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

    // Initial setup, for assigning the canvas
    useEffect(() => {
        if (canvasRef) setCanvasContext(canvasRef.current?.getContext("2d"));
    }, []);

    // listening to any change in the windows dimension
    useEffect(() => {
        // initiate when there's changes in width/ height
        if (canvasRef && canvasRef.current && width && height) {
            const canvas = canvasRef.current;
            canvas.width = width;
            canvas.height = height;
        }
    }, [width, height]);

    // Main triggering useEffect
    useEffect(() => {
        if (!isPaused) {
            startDrawing();
            return () => clearInterval(interval);
        }
    }, [memoizedColumns, isPaused]);

    function startDrawing() {
        if (interval) clearInterval(interval);
        interval = setInterval(() => { drawFrame(); }, frequency);
    }

    function toogleEffect() {
        if (!isPaused) clearInterval(interval);
        setIsPaused((state)=> !state);
    }

    function drawFrame() {
        // console.count("drawing");
        if (canvasContext) {
            // draw a layer for the whole dimension with some opacity -> gives fading effect
            canvasContext.fillStyle = `rgba( 0 , 0 , 0 , ${totalOpacPerFrame} )`;
            canvasContext.fillRect(0, 0, width, height);

            // draw characters for each column
            canvasContext.font = (tileSize - 4) + "px monospace";
            canvasContext.fillStyle = "rgb(77,200,171)";

            for (let i = 0; i < memoizedColumns.length; i++) {
                const element = memoizedColumns[i];
                canvasContext.fillText(RandomCharacter(), (element.x + xAdjust), element.getCurrentY(tileSize));
                // add counter
                if (maxStackLength) element.stackCounter(maxStackLength);
            }
        }
    }

    return (
        <>
            <button onClick={() => { toogleEffect(); }} className="w-20 h-6 bg-red-50 rounded-lg z-20 absolute top-4 left-[44vw]"></button>
            <canvas ref={canvasRef} className={`${displayConfigs} absolute inset-0 overscroll-none object-contain bg-black`}></canvas>
        </>
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