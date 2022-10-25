import type { NextPage } from 'next'
import Head from 'next/head'
import  { ThemeContext } from '../components/DarkThemeToggle';
import {  LegacyRef, Ref, RefObject, useContext, useEffect, useRef, useState} from 'react';
import TopFrame from '../components/TopFrame';
import { RevealingPage } from '../components/RevealingPage';
import { AnimatedColoredText } from '../components/AnimatedColoredText';
import { motion, useScroll, useTransform } from 'framer-motion';
import { animated, easings, useSpring } from 'react-spring';
import { AnimatedSentences } from '../components/AnimatedSentences';
import useWindowDimensions from '../components/useWindowDimensions';
import { useScrollSnap } from '../components/useScrollSnap';
import { StickyLayer } from '../components/StickyLayer';
import { GreetingsLayout } from '../components/GreetingsLayout';
import Lottie from 'lottie-react';
import appDevIllustration from '../assets/app_dev_lottie.json';
import walletLottie from '../assets/wallet_ani.json';
import smileyLottie from '../assets/smily_lottie.json';
import compassLottie from '../assets/compass_lottie.json';
import { MiniCard } from '../components/MiniCard';


const Home: NextPage = () => {
  const pageConfig: string = "px-[4vw] py-8";
  return (
      <div className='flex flex-col'>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <TopFrame>
        <GreetingsLayout></GreetingsLayout>
        <RevealingPage className={`${pageConfig} bg-gradient-to-tr from-primary-t5`}>
          <Intro />
          <BestOfMe></BestOfMe>
        </RevealingPage>
        <MyStory></MyStory>
        <div className='w-screen h-[200vh] bg-blue-100'></div>

      </TopFrame >
      {/* <ThemeTester /> */}
      {/* <div className='w-screen h-screen flex flex-col justify-center text-center dark:text-green-700 bg-primary duration-1000'> hello world</div> */}
    </div>
  )
}

export default Home


const Intro = () => {
  const {theme} = useContext(ThemeContext)

  return (
    <div className='flex flex-col mb-[10vw]'>
      <div className={`mt-8 md:mt-14 mb-10 w-full float-left relative flex flex-col justify-start items-center gap-6 md:flex-row-reverse`}>
        <Lottie animationData={appDevIllustration} className='min-w-[40%] max-w-[60%] md:max-w-[46%] lg:max-w-[70%] float-right mx-6 mb-10'></Lottie>
        <div className='float-left w-full h-full flex flex-col justify-center'>
          <h2 className='style-secondary mb-[2px] '>Hello World! I am Qarnayn</h2>
          <h1 className='style-heading'>An engineer who codes designer's boundless imaginations</h1>
          <p className='mt-12 style-body'>Hi there 👋🏼.<br/> I am an engineer who love to solve problems and passionate in human behaviour ℹ. I’m working as a software developer, more comfortable in Front-end, had led a small developer team, had designed a full business’ tech ecosystem, had tremendously reduced operational cost and more. Being an engineer minded person, everything I see is just somewhat of a cog that fit in this complex world. Its ‘how’ and ‘why’ are what I passionate about. It’s hard and complex, but I love every single of it!</p>
        </div>
      </div>

      {/* <p className='mt-10 md:mt-14'>Anyway, having that kind of mindset led to bring my absolute best!</p> */}
    </div>
  )
}

const BestOfMe = () => {
  return (
    <>
      <ChapterTitle>The best out of me</ChapterTitle>
      <div className='flex flex-col lg:flex-row justify-evenly w-full gap-4'>
        <MiniCard animationData={walletLottie}>I help company reduce their operational cost by implementing smart system into design</MiniCard>
        <MiniCard animationData={smileyLottie}>I help bussiness strengthen their customer’s retentions by embeding psychology into product design</MiniCard>
        <MiniCard animationData={compassLottie}>I help junior developer team grows exponentially by mentoring them individually</MiniCard>
      </div>
    </>
  )
}



const ChapterTitle = (props: any, {className}:any) => {
  const dividerStyle: string = "w-full h-[2px] rounded-md shadow-sm bg-themed-gray-t5";
  return (
    <div className={`my-4 text-md mobile-lg:style-subheading font-medium flex text-center justify-center items-center ${className}`}>
      <div className={`${dividerStyle} float-left`}></div>
      <div className='w-full mx-2 md:mx-3 2xl:mx-5 '>{props.children}</div>
      <div className={`${dividerStyle} float-right`}></div>
    </div>
  )
}


const MyStory = () => {
  const [showTitle, setShowTitle] = useState(false);

  const titleRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: titleRef, offset: ["0.5 1", "0.5 0"] });
  const mainPageRef = useRef<HTMLElement>(null);


  useEffect(() => {
    const titleYProgress = scrollYProgress.onChange((p) => {
      if (!showTitle && p > 0.849) setShowTitle(true);
    });
    return () => { titleYProgress };
  }, []);

  const titleSpring = useSpring({
    delay: 600,
    config: { duration: 800 },
    to: { y: showTitle ? "0vh" : "40vh"},
  });

  useScrollSnap(mainPageRef);

  return (
    <div ref={mainPageRef as LegacyRef<HTMLDivElement>} className='bg-gradient-to-tr from-primary-t2 to-secondary-t5 justify-end items-end text-end'>
      <animated.div style={titleSpring} className={`w-screen pt-[10vh] pb-2 flex flex-col justify-start items-center bg-transparent `}>
        <AnimatedColoredText objRef={titleRef} isOpen={showTitle}>My journey, I'm sharing with you</AnimatedColoredText>
      </animated.div>
      <StickyLayer viewPercent={45}></StickyLayer>
      <StoryContainer
        title='How it started'
        className='mt-[45vh] md:mt-0 mr-0 md:mr-[45vw'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat dolor veniam earum ullam hic iusto nemo officia! In totam aliquam laborum velit veniam, nesciunt, ab eum itaque possimus quibusdam aperiam.</StoryContainer>
      <StoryContainer title='Then...'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consequatur omnis voluptatem dolorem, dolores vitae aliquid illo rerum eum, quod, illum accusantium natus quisquam! Nulla quos eveniet sit neque autem perferendis.</StoryContainer>
      <div className='w-screen h-screen bg-sky-100'></div>
    </div>
  )
}



interface iStoryContainer{
  children: string,
  objRef?: RefObject<HTMLElement>,
  className?: string,
  title?: string,
}

const StoryContainer = ({ children,objRef, className, title }: iStoryContainer) => {
  const { width} = useWindowDimensions();
  const [show, setShow] = useState(false);
  const [isLarge, setIsLarge] = useState((width > 768));
  const containerRef = objRef ?? useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["1 1", "0.3 0.45"] });
  const leaveOpacity = useTransform(scrollYProgress, [0, 0.6, 1], isLarge? [1,1,1]: [1, 1, 0], { ease: easings.easeOutCirc });

  useEffect(() => {
    const unsub = scrollYProgress.onChange((p) => {
      if (!show && p > 0.01 && p < 1) setShow(true);
      // console.log(p);
    });
    return () => { unsub; }
  }, []);

  useEffect(() => {
    const breakPoint: number = 768;
    if (isLarge && (width < breakPoint)) setIsLarge(false);
    else if (!isLarge && (width > breakPoint)) setIsLarge(true);
  }, [width]);

  useScrollSnap(containerRef, { position: 'bottom',scale: 3.5});

  return (
    <motion.div
      ref={containerRef as Ref<HTMLDivElement>}
      style={{ opacity: leaveOpacity}}
      className={`antisticky-45 flex-col justify-center items-center ${className}`}
      >
        <AnimatedSentences
          title={title}
          showAnimation={show}
          twTextAlignment="text-center md:text-start"
          className={`w-full h-full`}
        >{children}</AnimatedSentences>
    </motion.div>
  )
 }
