import React, { LegacyRef, useEffect, useRef, useState } from 'react'
import TopFrame from '../components/TopFrame'
import { AnimatedColoredText } from '../components/AnimatedColoredText'
import { DummyBlock } from '../components/DummyBlock'
import { useScroll } from 'framer-motion'
import { useScrollSnap } from '../components/useScrollSnap'
import useWindowDimensions from '../components/useWindowDimensions'


const Devpage = () => {
  const fullScreenConfig: string = "w-screen h-screen flex flex-col justify-center items-center";
  const centerChildrenConfig: string = "flex flex-col justify-center items-center";
  const bgColor: string = 'bg-gradient-to-br from-primary-base to-themed-gray-base';
  const [isShow, setIsShow] = useState(false);
  const { scrollY } = useScroll();




  return (
    <>
      <DummyPage></DummyPage>
      <MatrixEffect></MatrixEffect>
    </>
  )
}

export default Devpage


const DummyPage = () => {
  const objRef = useRef<HTMLElement>(null);

  useScrollSnap(objRef);


  return (
    <div className='overflow-auto bg-red-400 z-20 w-screen h-screen'>
      <div className='w-screen h-screen bg-amber-100'>
        <div className='w-screen h-3 bg-green-400'></div>
      </div>
      <div className='w-screen h-screen bg-blue-100'></div>
      <div ref={objRef as LegacyRef<HTMLDivElement> | undefined} className='w-screen h-screen bg-red-100'></div>
      <div className='w-screen h-screen bg-green-100'></div>
    </div>
  )
}


const MatrixEffect = () => {
  const [showScreen, setShowScreen] = useState(true);
  const { width, height } = useWindowDimensions();
  const canvasRef = useRef<HTMLCanvasElement | null >(null);
  const [canvasContext, setCanvasContext] = useState<CanvasRenderingContext2D | null | undefined>(null);
  const tileSize: number = 22; // px
  const [maxColumnLength, setMaxColumnLength] =  useState<number |null>(null);
  const [maxStackLength, setMaxStackLength] = useState<number | null>(null);
  const totalOpacPerFrame: number = 0.08;
  const [xAdjust, setXAdjust] = useState<number>(0);
  let columns: SingleColumn[] = [];
  let interval: NodeJS.Timer | undefined;

  const displayConfigs: string = showScreen? "flex" : "hidden";

  // Initial setup, for assigning the canvas
  useEffect(() => {
    if (canvasRef) setCanvasContext(canvasRef.current?.getContext("2d"));
  }, []);

  // listening to any change in the windows dimension
  useEffect(() => {
    function getMaxStack(): number | null {
      return (height) ? Math.floor(height/tileSize) : null;
    }

    function getMaxColumn(): number | null {
      return (width) ? Math.floor(width/tileSize) : null;
    }

    // initiate when there's changes in width/ height
    if (canvasRef && canvasRef.current && width && height) {
      const canvas = canvasRef.current;
      canvas.width = width;
      canvas.height = height;
      // console.log("width, height: ", `${width}, ${height}`);
      // console.log("canvas w, h: ", `${canvas.width}, ${canvas.height}`);
    }

    const maxColumn: number | null = getMaxColumn();

    setMaxColumnLength(getMaxColumn());
    setMaxStackLength(getMaxStack());
    setXAdjust((width - (maxColumn ? (maxColumn! * tileSize) : 0)) / 2);
  }, [width, height]);


  useEffect(() => {
    if (canvasContext && maxColumnLength && maxStackLength) {
      console.log("maxColumnLength, maxStackLength: ", `${maxColumnLength},${maxStackLength}`);
      initColumnsSkeleton();
      if (interval) clearInterval(interval);
      interval = setInterval(() => { drawFrame(); }, 65);
    }
    return () => clearInterval(interval);
  }, [canvasContext, maxColumnLength, maxStackLength]);

  function initColumnsSkeleton() {
    if (maxColumnLength && maxStackLength) {
      columns = [];
      for (let i = 0; i < maxColumnLength; i++) {
        columns.push(new SingleColumn((i*tileSize),maxStackLength));
      }
    }
  }


  function drawFrame() {
    if (canvasContext) {
      // draw a layer for the whole dimension with some opacity -> gives fading effect
      canvasContext.fillStyle = `rgba( 0 , 0 , 0 , ${totalOpacPerFrame} )`;
      canvasContext.fillRect(0, 0, width, height);

      // draw characters for each column
      canvasContext.font = (tileSize - 4) + "px monospace";
      canvasContext.fillStyle = "rgb(77,200,171)";

      for (let i = 0; i < columns.length; i++) {
        const element = columns[i];
        canvasContext.fillText(RandomCharacter(), (element.x + xAdjust), element.getCurrentY(tileSize));
        // add counter
        if (maxStackLength) element.stackCounter(maxStackLength);
      }
    }
  }

  return (
    <canvas ref={canvasRef} className={`${displayConfigs} absolute inset-0 overscroll-none object-contain bg-black`}></canvas>
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

  getCurrentY(tileSize: number): number{
    return (this.stackCount * tileSize);
  }
}


const RandomCharacter = (): string => {
  const normalChars: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const greekChars: string = "ΐΓΔΗΘΙΛΞΠΡΣΤΥΦΧΨΩΪΫάέήίΰαβγδεζηθικλμνξοπρςστυφχψωϊϋόύώϏϐϑϒϓϔϕϖϗϘϙϚϛϜϝϞϟϠϡϢϣϤϥϦϧϨϩϪϫϬϭϮϯϰϱϲϳϴ϶ϷϸϹϺϻϼϽϾϿ";
  const japaneseChars: string = "゠ァアィイゥウェエォオカガキギクグケゲコゴサザシジスズセゼソゾタダチヂッツヅテデトドナニヌネノハバパヒビピフブプヘベペホボポマミムメモャヤュユョヨラリルレロヮワヰヱヲンヴヵヶヷヸヹヺ・ーヽヾヿ";
  const allChars: string = normalChars + japaneseChars + greekChars;

  return allChars.charAt(Math.ceil(Math.random() * allChars.length));
 }