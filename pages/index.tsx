import type { NextPage } from 'next'
import Head from 'next/head'
import {useContext, useEffect, useRef, useState} from 'react';
import { RevealingPage, ShadowPage } from '../components/RevealingPage';
import { motion, useScroll} from 'framer-motion';
import Lottie from 'lottie-react';
import appDevIllustration from '../assets/app_dev_lottie.json';
import walletLottie from '../assets/wallet_ani.json';
import smileyLottie from '../assets/smily_lottie.json';
import compassLottie from '../assets/compass_lottie.json';
import { MiniCard } from '../components/MiniCard';
import Table from '../assets/table.svg'
import { ThemeContext } from '../components/DarkThemeToggle';
import { ParallaxWrapper } from '../components/ParallaxWrapper';
import { IoChevronBack, IoChevronForward} from 'react-icons/io5';
import React from 'react';
import Sheet from '../assets/sheet.svg'
import LeftBlock from '../assets/left_bloc.svg'
import FrontBlock from '../assets/front_bloc.svg'
import RearBlock from '../assets/rear_bloc.svg'
import Link from 'next/link';
import { ContactSection } from './contacts';
import DartLogo from '../assets/Logos/dart_logo.svg'
import FlutterLogo from '../assets/Logos/flutter_logo.svg'
import FirebaseLogo from '../assets/Logos/firebase_logo.svg'
import HTML5Logo from '../assets/Logos/html_logo.svg'
import ReactLogo from '../assets/Logos/react_js_logo.svg'
import ReduxLogo from '../assets/Logos/redux_logo.svg'
import TailwindLogo from '../assets/Logos/tailwindcss_logo.svg'
import TypeScriptLogo from '../assets/Logos/typescript_logo.svg'
import JavascriptLogo from '../assets/Logos/javascript_logo.svg'
import CSSLogo from '../assets/Logos/css3_logo.svg'
import { IconType } from 'react-icons';
import { ScrollSnapWrapper } from '../utilities/useScrollSnap';
import Image from 'next/image'


const Home: NextPage = () => {
  const {theme} = useContext(ThemeContext);

  return (
      <>
        <Head>
          <title>Qarnayn Portfolio | home</title>
        </Head>
        <div className='relative pt-[3vh] md:pt-[6vh] pb-24 md:pb-28  flex flex-col'>
          <ParallaxWrapper yDisplacement={-150} className="absolute z-0 md:top-40 lg:top-32 right-0 overflow-clip w-[120vw] opacity-40 dark:opacity-100">
            <Table/>
          </ParallaxWrapper>
          <Intro />
          <ProficiencySection/>
          <BestOfMe />
          <ShadowPage/>
        </div>
        <RevealingPage>
          <Expertise/>
        </RevealingPage>
        <ContactSection/>
    </>
  )
}

export default Home

export const SectionTitle = (props:any) => {
  return (
      <div className={`${props.className} style-subheading text-themed-gray-t9 font-sans flex -translate-x-0 flex-col drop-shadow-lg`}>
        <span className='w-8 h-1 rounded-md mb-2 bg-primary-t5 float-left'></span>
        {props.children}
      </div>
    )
}

const Intro = () => {
  return (
    <div className='flex flex-col frame-bounded-x mb-[10vw] mt-8 md:mt-14 w-full float-left relative  justify-start items-center gap-6 md:flex-row-reverse transition-all ease-out-circ duration-500'>
        <Lottie animationData={appDevIllustration} className='min-w-[40%] max-w-[60%] md:max-w-[46%] lg:max-w-[70%] float-right mx-6 mb-10'/>
        <div className='float-left w-full h-full flex flex-col justify-center'>
          <h2 className='mb-[2px] style-secondary style-subheading'>Hello World! I am Qarnayn</h2>
          <h1 className='mt-2 style-heading font-semibold bg-gradient-to-br from-primary-base to-secondary-base text-transparent bg-clip-text'>An engineer who codes designers' boundless imagination.</h1>
          <p className='mt-12 style-body'>Hi there 👋🏼.<br/> I am an engineer who loves to solve problems and is passionate about human behaviour. I’m working as a software developer, ideally in Front-end development. I have led a developers team, designed a full business software architecture ecosystem, engineered an efficient system architecture and more. Having an engineer's frame of mind, everything I see is somewhat a cog in the machine we call this complex world. It's the ‘how’ and ‘why’ that fascinate me every time. They are difficult and complex, but I love every single bit of it!
          </p>
        </div>
      </div>
  )
}

const ProficiencySection = () => {


const TechIcon = (Icon: IconType, title: string) => {
  return (
    <div className='w-20 group flex flex-col items-center justify-center' >
      <Icon className={`opacity-80 w-8 sm:w-10 h-8 sm:h-10 flex items-center justify-center`}/>
      <div className={`opacity-60 mt-1 h-5 style-small-text apply-inverse-gray text-themed-gray-t8 scale-90 overflow-hidden text-center`}>{title}</div>
    </div>
  )
}
  return (
    <>
      <SectionTitle className="frame-bounded-x mt-20 mb-8">Proficiencies</SectionTitle>
      <div className="mb-16 px-[5vw] off w-full flex flex-wrap gap-0 gap-y-4">
        {TechIcon(DartLogo, "Dart Lang")}
        {TechIcon(JavascriptLogo, "Javascript")}
        {TechIcon(TypeScriptLogo, "Typescript")}
        {TechIcon(FlutterLogo, "Flutter")}
        {TechIcon(ReactLogo, "React JS")}
        {TechIcon(HTML5Logo, "HTML5")}
        {TechIcon(CSSLogo, "CSS3")}
        {TechIcon(TailwindLogo, "Tailwind")}
        {TechIcon(ReduxLogo, "Redux")}
        {TechIcon(FirebaseLogo, "Firebase")}
      </div>
    </>
  )
}

const BestOfMe = () => {
  return (
    <>
      <SectionTitle className="frame-bounded-x mt-20 mb-8">The best of me</SectionTitle>
      <div className='absolute w-full h-full opacity-20 -z-30 bottom-0 bg-gradient-to-t from-primary-base dark:from-primary-t4'></div>
      <div className='frame-bounded-x flex flex-col lg:flex-row justify-evenly w-full gap-4 '>
        <MiniCard
          animationData={walletLottie}
          title="I help the company reduce its operational cost by implementing a smart system into its design."
          extensionData={{
            description: "As the lead developer, one of the challenges that I faced is to build a feature that provides the best user experience while keeping its operational cost minimal. While a common solution is to use an inexpensive API, I discovered that it is more effective to introduce a smart mechanism into the front-end implementation which functions as a soft stopgap from an extensive execution of external API services successively. By implementing such into my work, I managed to reduce the operational cost while still being able to deliver a decent user experience as the designer envisioned without any significant trade-offs.",
            showcaseList: [
              { title: "How I cut down 87% of the cost of expensive API usage.", content: "In one of the projects that I’m involved in, it uses google Maps autocomplete API (with a price range of $2.17-$17 per 1000 requests) directly on the client-side application. So, I designed and implemented a mechanism on the front-end development side where it only executes the API request once the user has completed (paused once a significant keyword has been typed) their typing action. By implementing such, the cost was reduced up to 87% without noticeably compromising any of the user experience as we monitored." },
              { title: "Database writing is expensive, so I invented a way to make it low-cost.", content: "Yes, databases are supposedly cheap, but when dealing with scaling software, it can be expensive in terms of cost and traffic due to concurrency limitations. Based on the user's behaviour predictions, I developed a mechanism that only updates the database only once the user has finished their actions. This was implemented in the user's favourites, likes, bookmarks, and other similar features. It results in reducing approximately 3 times the normal server traffic." },
              { title: "How I engineered a low-cost architecture systems design.", content: "Nowadays, with a massive number of serverless services to choose from for developing an architecture design, it can be daunting. As an engineer, I utilise my skill of creative problem-solving and helped the company to design and develop a low-cost yet efficient system architecture suited to its needs. During my involvement in developing a sports facility booking system with built-in social features, I engineered a hybrid database system (SQL and NoSQL) which caters to its use cases. The design is only suited for this project due to its nature; as reading the database is more prominent while a frequent update to the database is expected." },
            ]
          }} />
          <MiniCard
            title="I help the business strengthen its customer retention by embedding psychology into product design."
            animationData={smileyLottie}
            extensionData={{
              description:"Looking back at my previous experiences, one of the most difficult challenges that a business faces are the increasing amount of churn rate (rate of losing customers). A common countermeasure is to increase marketing expenses. While it can bring in new customers, it doesn’t tackle the root cause which is the churn rate itself. From my experience, there is always a psychological pattern in customers’ behaviour. I put the effort into the details of every design and its development process. As someone who's passionate about understanding human psychology and customers' behaviour, I’m apt to design and develop software that users love and will instinctively keep loving.",
              showcaseList: [
                { title: "Searching for people is hard, so I made it easier", content: "In developing the sports facility's booking system, I pioneered a feature of turning a private event into a public one. It eliminates the users' fear of event cancellations due to a lack of participants hence resulting in an increase in the number of successful facilities booked as cancellations are less likely to happen. At the same time, it also allows users to search for other interested people to join their teams or games. This will effectively encourage participants' turnout and lead to an increased number of sales. " },
                { title: "How I turned social needs into a feature’s marketing behemoth.", content: "Have you heard of a sport that has only one player, yet is popular? Personally, I have not. By understanding the psychological behaviours of our user bases, I created a social system to support the sports community which is built-in directly into the application. I realised that introducing a group feature will lead to word of mouth being spread among the users’ peers. So, I capitalised on this social need and engineered it as a feature that indirectly functions as an effective marketing strategy as well." },
              ]}}/>
          <MiniCard
            title="I help the junior developer team grow exponentially by providing mentorship and guidance"
            animationData={compassLottie}
            extensionData={{
              description:"Hiring is hard and finding good candidates that fit perfectly into the team is even harder. An addition of a new member could affect the entire team’s productivity significantly. From my experience, a well-synergised group of teammates comes from profound leadership. However, behind any team is simply a cluster of people.  My understanding of their different demeanour and styles helps me to adapt and fit into any team's makeup quickly. I also strongly believe that faithful reliance must come from the top to bottom in any team. As the lead developer, my approach was to establish trust before we start working and I observed a significant morale boost in the team which subsequently led to higher productivity. By implementing this framework, my team became more creative and willing to explore beyond their comfort zones.",
              showcaseList: [
                { title: "How I turn an electrical engineer into a software engineer.", content: "One of my team members has an electrical engineering background and had no prior experience in software development. Naturally, his way of working comes from an electrical engineer's perspective and not a software engineer's. However, I managed to make the best out of his personal skills as an electrical engineer through direct mentoring. He then became one of our team's greatest assets and contributed to the exponential growth of our productivity. As a team leader, I provided direction to my teammates and encouraged them to think from a first principal framework; where any complex problem can be easily solved by breaking it down into its simplest origins while solving them respectively in isolation. I also acted as their safeguard such that whenever there is a problem that cannot be resolved due to a lack of skills or knowledge, I will be there to help them solve it." },
                { title: "How I influenced a non-problem-solver person to think critically.", content: "No, it is not magic to turn people into something we desire. I had an experience of mentoring a computer science intern where I found him difficult to mentor and initially thought that it was due to the limitations of remote working. However, I later discovered that it was actually due to his lack of critical thinking and analytical skills. Realising that he might not be able to keep up with the fast pace of the rest of the team, I changed my mentorship approach to fit his learning style. I did it by simplifying my explanations, teaching him to be more inquisitive, encouraging questions, and introducing different perspectives to a problem." },
              ]}}/>
      </div>
    </>
  )
}


const Expertise = () => {
  return (
    <ScrollSnapWrapper className='frame-bounded-x pt-[16vw] flex flex-col items-start relative'>
      <div className='mt-[16vh] mb-[40vh] mx-[5%]  style-heading bg-gradient-to-bl from-primary-base to-secondary-t4 font-extrabold bg-clip-text text-transparent w-[60vw] max-w-[520px] drop-shadow-lg z-20'>Actions are louder than words, so I build things.</div>
      <div className='w-full h-fit xl:max-w-[1400px] xl:opacity-60 absolute top-72 right-0 z-0'>
        <Sheet/>
        <LeftBlock className="absolute right-0 top-0 translate-y-[6%] -translate-x-[30vw] w-[12%]"></LeftBlock>
        <FrontBlock className="absolute right-0 top-0 translate-y-[80%] -translate-x-[20vw] w-[18%]"></FrontBlock>
        <RearBlock className="absolute right-0 top-0 translate-y-[10%] -translate-x-[26%] w-[14%]"></RearBlock>
      </div>
      <SectionTitle className="mb-4">Expertise</SectionTitle>
      <ExpertiseContainer
        graphicSrc="/schematic.png"
        title="I engineered a system architecture and ecosystem for a sports facilities booking software from zero."
        content={<>
          Despite having zero prior experience, I found myself working in an early-stage startup where I had the chance to
          <HighlightedText>create the underlying system’s architecture for the product ecosystem including databases, data structures, server-side services, event handlers, system applications as well as integrations.</HighlightedText>
          Having limited resources forced me to always make a system design with high reliability. The biggest challenge that I faced was to design a robust ecosystem that is effective, yet maintainable and scalable. As an engineer-minded person, I am naturally curious and accustomed to viewing things from a broader perspective which I then apply to my work. Now,
          <HighlightedText>I am apt to engineer an efficient ecosystem with a minimal tradeoff in which the initial unique problem can be solved effectively.</HighlightedText>
        </>} />
      <ExpertiseContainer
        graphicSrc="/mobile_dev.png"
        title="Over 7 billion people own a smartphone, so I built a mobile-first software application with my team using the Flutter framework."
        content={<>
          Through my understanding of the statistics and trajectory of the future of technology, I decided to develop a product that focuses on smartphone usage. Since
          <HighlightedText>resources for an early-stage startup are scarce, my team and I adopted and learned new knowledge</HighlightedText> such as the Dart language and the Flutter framework for our company’s sports facility booking system
          <HighlightedText>in order to capitalise on a fast production environment.</HighlightedText>
          Having good critical thinking skills, it helped me to steer the project to adapt to challenges efficiently by eliminating overly risky and unreliable decisions. With this, <HighlightedText>I am ideal to aid your company to make an effective decision in such a way that it serves and solves your unique problem.</HighlightedText>
        </>} />
      <ExpertiseContainer
        graphicSrc="/imagination.png"
        title="Why I will never stop building things even at times when everyone else loses their passion."
        content={<>
          When I first learned to write codes,
          <HighlightedText>it felt like my inner child curiosity had been revived –  I could let my imagination run wild.</HighlightedText>
          At the start, I had zero knowledge of coding, so I began
          <HighlightedText>learning by reading technical documents and starting to build projects.</HighlightedText>
          I have run into problems, so I learned to find solutions and started analysing the root causes. When I run out of ideas, I reach out to people and start understanding their needs. To me, the act of writing the code itself is just a small part – it is the process of learning and re-learning that I truly love as an engineer.
          <HighlightedText>Building any project requires brainpower and ideas from all fields of disciplines – and that is just what I desire; the growth from gaining knowledge.</HighlightedText>
          I will continue writing codes, solving problems, and keep on building things even without anyone asking for it.
          <HighlightedText>It’s a passion.</HighlightedText>
        </>} />
      <div className='relative h-20 w-full mb-8 text-center flex justify-center
      items-center'>
        <Link href="/projects">
          <button className='relative animate-pulse flex flex-row justify-center items-center text-primary-base style-subheading'>
            <IoChevronBack/>
            <IoChevronBack/>
            <IoChevronBack/>
            <span className='px-5'>Go to project</span>
            <IoChevronForward/>
            <IoChevronForward/>
            <IoChevronForward/>
          </button>
        </Link>
      </div>
    </ScrollSnapWrapper>
  )
}

interface iExpertiseContainer{
  title: string,
  content: any,
  graphicSrc?: string,
}

const ExpertiseContainer = (props: iExpertiseContainer) => {
  const [isPresent, setIsPresent] = useState(false);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["0 1", "1 0"] });
  let unsub: ()=> void | undefined;

  useEffect(() => {
    if (!isPresent) {
      unsub = scrollYProgress.onChange((p) => {
        if (p > 0.25) setIsPresent(true);
      });
    }
    if (unsub) return () => { unsub(); };
  }, [isPresent]);


  return (
    <div className='relative w-full h-full mb-10 lg:mb-[20vh] overflow-x-clip items-center justify-end flex flex-col lg:flex-row-reverse'>
      <div className={`realtive w-[100vw] lg:w-[40vw] max-w-2xl h-[80vw] md:h-[60vw] max-h-[600px]  pt-[5vw] pb-[8vw] flex justify-center items-center float-right`}>
        <div className='relative w-full h-full translate-y-10'>
        {props.graphicSrc && <Image src={props.graphicSrc} layout="fill" objectFit='contain'/>}
        </div>
      </div>
      <div ref={ref} className='lg:mt-2 w-full apply-inverse-gray max-w-[540px] overflow-visible'>
        <motion.h2
          transition={{ duration: 0.9, ease:'backOut' }}
          animate={{ opacity: isPresent ? 1 : 0, x: isPresent ? 0: 100}}
          className='w-[90%] mb-10 style-heading-h2 text-themed-gray-base font-medium overflow-visible'>{props.title}</motion.h2>
        <motion.p
        transition={{ duration: 1.6, type: 'spring', delay: 0.4 }}
        animate={{ opacity: isPresent ? 1 : 0, y: isPresent ? 0: 100}}
        className='w-[95%] mobile-xl:w-[90%] md:w-[86%] style-body text-themed-gray-t4 text-justify md:text-start'>{props.content}</motion.p>
      </div>
    </div>
  )
}

const HighlightedText = (props: any) => {
  return (
    <>
      &nbsp;
      <span className='bg-primary-t5 bg-opacity-20 dark:bg-opacity-80'>{props.children}</span>
      &nbsp;
    </>
  )
}
