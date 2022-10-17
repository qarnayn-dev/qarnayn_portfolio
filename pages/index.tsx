import type { NextPage } from 'next'
import Head from 'next/head'
import  { ThemeContext } from '../components/DarkThemeToggle';
import {  LegacyRef, Ref, RefObject, useContext, useEffect, useRef, useState} from 'react';
import TopFrame from '../components/TopFrame';
import DevIllustration from '../assets/sw_dev.svg';
import DevIllustrationDark from '../assets/sw_dev_dark.svg';
import CostIllu from '../assets/discount_percentage.svg';
import CostIlluDark from '../assets/discount_percentage_dark.svg';
import SolutionIllu from '../assets/solution_mindset.svg';
import SolutionIlluDark from '../assets/solution_mindset_dark.svg';
import ServerIllu from '../assets/server_cluster.svg';
import ServerIlluDark from '../assets/server_cluster_dark.svg';
import { CardWithGraphicContainer } from '../components/CardWithGraphic';
import { AnimatedText } from '../components/AnimatedText';
import { RevealingPage } from '../components/RevealingPage';
import { AnimatedColoredText } from '../components/AnimatedColoredText';
import { motion, useScroll, useTransform } from 'framer-motion';
import { animated, easings, useSpring } from 'react-spring';
import { AnimatedSentences } from '../components/AnimatedSentences';
import useWindowDimensions from '../components/useWindowDimensions';
import { useScrollSnap } from '../components/useScrollSnap';
import { StickyLayer } from '../components/StickyLayer';
import { GreetingsLayout } from '../components/GreetingsLayout';

const Home: NextPage = () => {
  const pageConfig: string = "px-4 md:px-5 lg:px-6 py-8";
  return (
      <div className='flex flex-col'>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <TopFrame>
        <GreetingsLayout></GreetingsLayout>
        <RevealingPage className={`${pageConfig} bg-gradient-to-br from-primary-t5`}>
          <Intro />
          <CardWithGraphicContainer
            title={"Some title should be fine"}
            content={"Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi enim tempore nihil cupiditate voluptas, molestiae libero, facilis deleniti quos inventore odio delectus consectetur, et recusandae. Animi culpa dolor facere molestiae."}
            graphic={<CostIllu />}
            graphicOnDark={<CostIlluDark/>}
          />
          <CardWithGraphicContainer
            title={"Some title should be fine"}
            content={"Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi enim tempore nihil cupiditate voluptas, molestiae libero, facilis deleniti quos inventore odio delectus consectetur, et recusandae. Animi culpa dolor facere molestiae."}
            graphic={<ServerIllu/>}
            graphicOnDark={<ServerIlluDark/>}
          />
          <CardWithGraphicContainer
            title={"Some title should be fine"}
            content={"Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi enim tempore nihil cupiditate voluptas, molestiae libero, facilis deleniti quos inventore odio delectus consectetur, et recusandae. Animi culpa dolor facere molestiae."}
            graphic={<SolutionIllu/>}
            graphicOnDark={<SolutionIlluDark/>}
          />
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
    <div className={`mt-6 mb-10 w-full float-left relative flex flex-col  justify-start items-center gap-4 md:flex-row-reverse`}>
      <div className='min-w-[40%] float-right mx-6 md:mr-10 '>
        {(theme==='light')? <DevIllustration/>: <DevIllustrationDark/>}
      </div>
      <div className='float-left w-full style-heading'>
        <AnimatedText
          textInput={"Hello world, I'm Qarnayn."}
          specialTexts={['Qarnayn.']}
          specialStyleClass={`text-primary-t2 font-medium`}
        />
        <h1 className='style-subheading style-secondary'>An engineer who codes with a taste of art</h1>
        <div className='mt-4 style-body'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi enim tempore nihil cupiditate voluptas, molestiae libero, facilis deleniti quos inventore odio delectus consectetur, et recusandae. Animi culpa dolor facere molestiae.</div>
      </div>
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
