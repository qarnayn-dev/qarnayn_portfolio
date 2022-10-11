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
  let columns: SingleColumn[] = [];
  const totalOpacPerFrame: number = 0.08;
  let [xAdjust, setXAdjust] = useState<number>(0);

  const displayConfigs: string = showScreen? "flex" : "hidden";

  useEffect(() => {
    console.log("init canvas ref")
    if (canvasRef) {
      console.log("inside of logic init canvas ref")
      setCanvasContext(canvasRef.current?.getContext("2d"));
      // console.log(canvasContext);
      // canvasContext?.scale;
      // const ticking =  tick();
      // return ()=> {ticking }
    }
  }, []);

  useEffect(() => {
    console.log("widht, height: ", `${width}, ${height}`);
    // initiate when there's changes in width/ height
    if (canvasRef && canvasRef.current) {
      const canvas = canvasRef.current;
      if (canvas && width && height) {
        canvas.width = width;
        canvas.height = height;
      }
    }

    function getMaxStack(): number | null {
    return (height) ?
      Math.floor(height/tileSize)
        : null;
    }
    function getMaxColumn(): number | null {
    return (width) ?
      Math.floor(width/tileSize)
      : null;
    }

    const maxColumn: number | null = getMaxColumn();

    setMaxColumnLength(getMaxColumn());
    setMaxStackLength(getMaxStack());
    setXAdjust((width - (maxColumn ? (maxColumn! * tileSize) : 0)) / 2);
    console.log("xAdjust :", xAdjust);
  }, [width, height]);

  useEffect(() => {
    // console.log("is canvasCOntext null? ",canvasContext)
    if (canvasContext && maxColumnLength && maxStackLength) {
      initColumns();
    }

    console.log("maxColumnLength, maxStackLength: ", `${maxColumnLength},${maxStackLength}`);
  }, [canvasContext, maxColumnLength, maxStackLength]);

  useEffect(() => {
    if (canvasContext && columns.length > 1 && maxStackLength) {
      const ticker = tick();
      return () => {ticker;}
    }
  }, [columns]);

  function initColumns() {
    console.log("initiate column")
    if (maxColumnLength && maxStackLength) {
      columns = [];
      for (let i = 0; i < maxColumnLength; i++) {
        columns.push(new SingleColumn((i*tileSize),maxStackLength));
      }
    }
  }

  function tick() {
    // draw
    drawFrame();
    // set timeout -> start new tick
    const timeOut = setTimeout(tick, 80);
    return () => clearTimeout(timeOut);
  }

  function drawFrame() {
    if (canvasContext) {
      // console.log("totalOpacPerFrame : ",totalOpacPerFrame);
      // console.log("width : ",width);
      // console.log("height : ",height);
      // console.log("maxStackLength : ",maxStackLength);

      canvasContext.fillStyle = `rgba( 0 , 0 , 0 , ${totalOpacPerFrame} )`;
      canvasContext.fillRect(0, 0, width, height);

      canvasContext.font = (tileSize - 4) + "px monospace";
      canvasContext.fillStyle = "rgb(77,200,171)";

      for (let i = 0; i < columns.length; i++) {
        const element = columns[i];
        // console.log(`i: ${i}, x: ${(element.x + xAdjust)}, xAdjust: ${xAdjust}, y: ${element.getCurrentY(tileSize)}, tileSize: ${tileSize}`);

        canvasContext.fillText(RandomCharacter(), (element.x + xAdjust), element.getCurrentY(tileSize));
        // add counter
        if (maxStackLength) element.stackCounter(maxStackLength);
      }
    }
  }

  return (
    <>
    <button onClick={()=> {drawFrame();}} className='w-[20vw] h-10 bg-red-50 absolute top-4 right-[40vw] rounded-lg z-50 hover:bg-orange-400 duration-700 hover:scale-110 transition-all'></button>
    <canvas ref={canvasRef} className={`${displayConfigs} absolute inset-0 overscroll-none object-contain bg-neutral-900`}></canvas>
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