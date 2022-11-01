import type { NextPage } from 'next'
import Head from 'next/head'
import {  Ref, RefObject, useContext, useEffect, useRef, useState} from 'react';
import TopFrame from '../components/TopFrame';
import { RevealingPage, ShadowPage } from '../components/RevealingPage';
import { AnimatedColoredText } from '../components/AnimatedColoredText';
import { motion, useScroll, useTransform } from 'framer-motion';
import { animated, easings, useSpring } from 'react-spring';
import { AnimatedSentences } from '../components/AnimatedSentences';
import useWindowDimensions from '../components/useWindowDimensions';
import { ScrollSnapWrapper, useScrollSnap } from '../components/useScrollSnap';
import { StickyLayer } from '../components/StickyLayer';
import Lottie from 'lottie-react';
import appDevIllustration from '../assets/app_dev_lottie.json';
import walletLottie from '../assets/wallet_ani.json';
import smileyLottie from '../assets/smily_lottie.json';
import compassLottie from '../assets/compass_lottie.json';
import { MiniCard } from '../components/MiniCard';
import TableLight from '../assets/table_light.svg'
import TableDark from '../assets/table_dark.svg'
import { ThemeContext } from '../components/DarkThemeToggle';
import { ParallaxWrapper } from '../components/ParallaxWrapper';


const Home: NextPage = () => {
  const {theme} = useContext(ThemeContext);

  return (
      <div className='flex flex-col'>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <TopFrame className="frame-bounded-y">
        <div className='relative pb-24 md:pb-28  flex flex-col'>
          <ParallaxWrapper yDisplacement={-150} className="absolute md:top-40 lg:top-32 right-0 overflow-clip w-[120vw] opacity-40 dark:opacity-100">
            {(theme==='light')?<TableLight/>:<TableDark/>}
          </ParallaxWrapper>
          <Intro />
          <BestOfMe />
          <ShadowPage/>
        </div>
        <RevealingPage>
          <MyStory></MyStory>
        </RevealingPage>
        {/* <div className='w-screen h-[200vh] bg-blue-100'></div> */}
      </TopFrame >
    </div>
  )
}

export default Home


const Intro = () => {
  return (
    <div className='flex flex-col frame-bounded-x mb-[10vw] mt-8 md:mt-14 w-full float-left relative  justify-start items-center gap-6 md:flex-row-reverse transition-all ease-out-circ duration-500'>
        <Lottie animationData={appDevIllustration} className='min-w-[40%] max-w-[60%] md:max-w-[46%] lg:max-w-[70%] float-right mx-6 mb-10'></Lottie>
        <div className='float-left w-full h-full flex flex-col justify-center'>
          <h2 className='style-secondary mb-[2px] '>Hello World! I am Qarnayn</h2>
          <h1 className='style-heading'>An engineer who codes designer's boundless imaginations</h1>
          <p className='mt-12 style-body'>Hi there 👋🏼.<br/> I am an engineer who love to solve problems and passionate in human behaviour ℹ. I’m working as a software developer, more comfortable in Front-end, had led a small developer team, had designed a full business’ tech ecosystem, had tremendously reduced operational cost and more. Being an engineer minded person, everything I see is just somewhat of a cog that fit in this complex world. Its ‘how’ and ‘why’ are what I passionate about. It’s hard and complex, but I love every single of it!</p>
        </div>
      </div>
  )
}

const SectionTitle = (props:any) => {
  return (
      <div className={`${props.className} style-subheading text-themed-gray-t9 font-sans flex -translate-x-0 flex-col drop-shadow-lg`}>
        <span className='w-8 h-1 rounded-md mb-2 bg-primary-t5 float-left'></span>
        {props.children}
      </div>
    )
}


const BestOfMe = () => {
  return (
    <>
      <SectionTitle className="frame-bounded-x mt-20 mb-8">The Best Of Me</SectionTitle>
      <div className='frame-bounded-x flex flex-col lg:flex-row justify-evenly w-full gap-4'>
        <MiniCard
          animationData={walletLottie}
          title="I help company reduce their operational cost by implementing smart system into design"
          extensionData={{
            description: "As a lead developer, one of the challenge that i faced is to build a feuture that gives the best user experience while keeping its operational cost at minimal. While a common solution is to use an inexpensive API. However, I find that it is more effective to introduce a smart mechanism into the front-end implementation that behaves as a soft stopgap from calling the API successively. By implementing as such into my works, I’m not only helping company to reduce their cost, but I’m also able to deliver an amazing user experience that designer has envisioned.",
            showcaseList: [
              { title: "", content: "" },
            ]
          }} />
          <MiniCard
            title="I help bussiness strengthen their customer’s retentions by embeding psychology into product design"
            animationData={smileyLottie}
            extensionData={{
              description:"Looking at what I have experienced, one of the most difficult challenges that a bussiness faces is the increasing amount of churn rate (rate of losing customers). A common counter measure is to increase the marketing expenses. While it can bring new customers, but it doesn’t tackle the root cause which is the churn rate itself. From my experiences, there’s always a psychological pattern in customer’s behaviour; I put effort in the details in every design and development process. By having a passion in human psychology and understand it, I’m apt to design and develop a software that users love, and they will  keep loving it.",
              showcaseList: [
                 { title: "No sports without community", content: "When developing the sports facility's booking system, I pioneered a feature to turn a private event into a public event. It eliminates the users' fear of event cancelation due to lack of participant; Hence, resulting in increases of number of successful facility booked." },
              ]}}/>
          <MiniCard
            title="I help junior developer team grows exponentially by providing mentorship and guidance"
            animationData={compassLottie}
            extensionData={{
              description:"Hiring is hard and finding a good candidate to fit the team is another level of hardship. Once a new team member enters, it could effect the entire team’s productivity. From my experiences, a well synergised teammates comes from a decent leadership. By understanding human behaviour, I’m quick to adapt in any kind of team. I strongly believed that trustworthiness must comes from the top to bottom in any team. As a lead developer, I always establish trust first and the team synergies will be improved significantly. By implementing this framework in any team, I’m able to drive the team’s productivity into its best.",
              showcaseList:[]}}/>
      </div>
    </>
  )
}


const MyStory = () => {
  const [showTitle, setShowTitle] = useState(false);

  const titleRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: titleRef, offset: ["0.5 1", "0.5 0"] });

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

  return (
    <ScrollSnapWrapper className='bg-gradient-to-tr from-primary-t2 to-secondary-t5 justify-end items-end text-end'>
      <animated.div style={titleSpring} className={`w-screen pt-[10vh] pb-2 flex flex-col justify-start items-center bg-transparent `}>
        <AnimatedColoredText objRef={titleRef} isOpen={showTitle}>My journey, I'm sharing with you</AnimatedColoredText>
      </animated.div>
      <StickyLayer viewPercent={45}></StickyLayer>
      <StoryContainer
        title='How it started'
        className='mt-[45vh] md:mt-0 mr-0 md:mr-[45vw'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat dolor veniam earum ullam hic iusto nemo officia! In totam aliquam laborum velit veniam, nesciunt, ab eum itaque possimus quibusdam aperiam.</StoryContainer>
      <StoryContainer title='Then...'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consequatur omnis voluptatem dolorem, dolores vitae aliquid illo rerum eum, quod, illum accusantium natus quisquam! Nulla quos eveniet sit neque autem perferendis.</StoryContainer>
      <div className='w-screen h-screen bg-sky-100'></div>
    </ScrollSnapWrapper>
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

  useScrollSnap(containerRef, { position: 'bottom',scale: 2});

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
