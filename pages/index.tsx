import type { NextPage } from 'next'
import Head from 'next/head'
import { Ref, RefObject, useContext, useEffect, useRef, useState} from 'react';
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
import { ContactForm } from '../components/ContactForm';
import { IoLogoGithub, IoLogoLinkedin, IoMailOpen } from 'react-icons/io5';
import copy from 'copy-to-clipboard';
import { IconButton } from '../components/IconButton';
import { useTrigger } from '../utilities/useTrigger';
import React from 'react';
import { NotificationBanner } from '../components/NotificationBanner';
import Sheet from '../assets/sheet.svg'
import LeftBlock from '../assets/left_bloc.svg'
import FrontBlock from '../assets/front_bloc.svg'
import RearBlock from '../assets/rear_bloc.svg'


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
          <ParallaxWrapper yDisplacement={-150} className="absolute z-0 md:top-40 lg:top-32 right-0 overflow-clip w-[120vw] opacity-40 dark:opacity-100">
            {(theme==='light')?<TableLight/>:<TableDark/>}
          </ParallaxWrapper>
          <Intro />
          <BestOfMe />
          <ShadowPage/>
        </div>
        <RevealingPage>
          <Expertise></Expertise>
        </RevealingPage>
        <ContactSection/>
      </TopFrame >
    </div>
  )
}

export default Home

const SectionTitle = (props:any) => {
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
        <Lottie animationData={appDevIllustration} className='min-w-[40%] max-w-[60%] md:max-w-[46%] lg:max-w-[70%] float-right mx-6 mb-10'></Lottie>
        <div className='float-left w-full h-full flex flex-col justify-center'>
          <h2 className='style-secondary mb-[2px] '>Hello World! I am Qarnayn</h2>
          <h1 className='style-heading'>An engineer who codes designer's boundless imaginations</h1>
          <p className='mt-12 style-body'>Hi there 👋🏼.<br/> I am an engineer who loves to solve problems and is passionate about human behaviour. I’m working as a software developer, ideally in Front-end development. I have led a developers team, designed a full business software architecture ecosystem, engineered an efficient system architecture and more. Having an engineer's frame of mind, everything I see is just somewhat of a cog that fits in this complex world. It's the ‘how’ and ‘why’ that fascinates me every time. It’s hard and complex, but I love every single bit of it!
</p>
        </div>
      </div>
  )
}

const BestOfMe = () => {
  return (
    <>
      <SectionTitle className="frame-bounded-x mt-20 mb-8">The best of me</SectionTitle>
      <div className='absolute w-full h-full opacity-20 -z-30 bottom-0 bg-gradient-to-t from-primary-base dark:from-primary-t4 '></div>
      <div className='frame-bounded-x flex flex-col lg:flex-row justify-evenly w-full gap-4 '>
        <MiniCard
          animationData={walletLottie}
          title="I help the company reduced their operational cost by implementing a smart system into design"
          extensionData={{
            description: "As the lead developer, one of the challenges that I faced is to build a feature that provides the best user experience while keeping its operational cost minimal. While a common solution is to use an inexpensive API, I discovered that it is more effective to introduce a smart mechanism into the front-end implementation which functions as a soft stopgap from an extensive execution of external API services successively. By implementing as such into my works, I managed to reduce the operational cost while still being able to deliver a decent user experience as the designer envisioned without any significant trade-offs.",
            showcaseList: [
              { title: "How I cut down 87% of the cost of expensive API usage.", content: "In one of the projects that I’m involved in, it uses google map autocomplete API (with a price range of $2.17-$17 per 1000 requests) directly on the client-side application. So, I designed and implemented a mechanism on the front-end development side where it only executes the API request once the user has completed (paused once a significant keyword has been typed) their typing action. By implementing as such, the cost was reduced up to 87% while without noticeably compromising any of the user experience as we monitored." },
              { title: "Database writing is expensive, so I invented a way to make it low-cost.", content: "Yes, databases are supposedly cheap, but when dealing with scaling a software, it can be expensive in terms of cost and traffic due to concurrency limitations. Based on the user's behaviour predictions, I developed a mechanism that only updates the database only once the user has finished their actions. This was implemented in the user favourites, likes, bookmarks and other similar features. It results in reducing approximately 3 times the normal server traffic." },
              { title: "How I engineered a low cost architecture systems design.", content: "Nowadays, with a massive number of severless services to choose from for developing an architecture design, it can be daunting. As an engineer, I utilise my skill of creative problem-solving and helped the company to design and develop a low cost yet efficient system architecture suited for its needs. During my involvement in developing a sport facility booking system with built-in social features, I engineered a hybrid database system (SQL and NoSQL) in which caters to its use cases. The design is only suited for this project due to its nature; i.e., reading the database is more prominent while a frequent update to the database is expected." },
            ]
          }} />
          <MiniCard
            title="I help the business strengthen their customer retention by embedding psychology into product design"
            animationData={smileyLottie}
            extensionData={{
              description:"Looking back at my previous experiences, one of the most difficult challenges that a business faces is the increasing amount of churn rate (rate of losing customers). A common counter measure is to increase the marketing expenses. While it can bring in new customers, it doesn’t tackle the root cause which is the churn rate itself. From my experience, there is always a psychological pattern in customers’ behaviour. I put effort in the details of every design and its development process. As someone who's passionate in understanding human psychology and customers behaviour, I’m apt to design and develop softwares that users love and will subconsciously keep loving.",
              showcaseList: [
                { title: "Searching for people is hard, so I made it easier", content: "In my process of developing the sports facility's booking system, I pioneered a feature of turning a private event into a public event. It eliminates the users' fear of event cancellations due to lack of participants hence resulting in an increase in the number of successful facilities booked as cancellations are less likely to happen. At the same time, it also allows users to search for other interested people to join their teams or games. This will effectively encourage participants turnout and lead to increase number of sales." },
                { title: "How I turned social needs into a feature’s marketing behemoth.", content: "Have you heard of a sport that has only one player, yet popular? Personally, I have not. By understanding the psychological behaviour of our user bases, I created a social system to support the sport community built-in directly into the sport’s booking facility application. I realised that introducing a group feature will lead to word of mouth being spread among the users’ peers. So, I capitalised this social need and engineered it as a feature that indirectly functions as an effective marketing strategy as well." },
              ]}}/>
          <MiniCard
            title="I help the junior developer team grow exponentially by providing mentorship and guidance"
            animationData={compassLottie}
            extensionData={{
              description:"Hiring is hard and finding good candidates that fits the team is even harder. Once a new team member enters, it could affect the entire team’s productivity significantly. From my experience, a well synergised group of teammates comes from profound leadership. However, behind any team is simply a cluster of people.  Through my understanding of their different demeanour and styles, it helps me to quickly adapt and fit in any teams make up. I also strongly believe that faithful reliance must come from the top to bottom in any team. As the lead developer, my approach was to establish trust before we start working and I observed a significant morale boost to the team which subsequently led to higher productivity. By implementing this framework, my team became more creative and willing to explore beyond their comfort zones.",
              showcaseList: [
                { title: "How I turn an electrical engineer into a software engineer.", content: "One of my team members has an electrical engineering background and had no prior experience in software development. Naturally, his way of working comes from an electrical engineer's perspective and not a software engineer's. However, I managed to make the best out of his personal skills as an electrical engineer through direct mentoring. He then became one of our team's greatest asset and contributed to exponential growth of our productivity. As a team leader, I provided direction to my teammates and encouraged them to think from a first principal framework; Any complex problem can be easily solve by dividing into its simplest origins while solving them respectively in isolation. I also acted as their safeguard such that whenever there is a problem that cannot be resolved due to lack of skills and knowledge, I will be there to help them solve it." },
                { title: "How I influenced a non problem-solver person to think critically.", content: "No, it is not magic to turn people into something we desire. I had an experience of mentoring a computer science intern where I found him difficult to mentor and initially thought that it was due to the limitations from remote working. However, I later discovered that  it was actually due to his lack of critical thinking and analytical skills. Realising that he might not be able to keep up with the fast pace of the rest of team, I changed my mentorship approach to fit his learning style. I did it by simplifying my explanations, teaching him to be more inquisitive, encouraging questions and introducing different perspectives to a problem. I observed a significant improvement from before although it cannot compete with an innate engineering minded person. Yet it is still a worthy change." },
              ]}}/>
      </div>
    </>
  )
}


const Expertise = () => {
  /*
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
  */

  return (
    <ScrollSnapWrapper className='frame-bounded-x py-[16vw] flex flex-col items-start relative'>
      {/* <animated.div style={titleSpring} className={`w-screen pt-[10vh] pb-2 flex flex-col justify-start items-center bg-transparent `}>
        <AnimatedColoredText objRef={titleRef} isOpen={showTitle}>My journey, I'm sharing with you</AnimatedColoredText>
      </animated.div>
      <StickyLayer viewPercent={45}></StickyLayer>
      <StoryContainer
        title='How it started'
        className='mt-[45vh] md:mt-0 mr-0 md:mr-[45vw'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat dolor veniam earum ullam hic iusto nemo officia! In totam aliquam laborum velit veniam, nesciunt, ab eum itaque possimus quibusdam aperiam.</StoryContainer>
      <StoryContainer title='Then...'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consequatur omnis voluptatem dolorem, dolores vitae aliquid illo rerum eum, quod, illum accusantium natus quisquam! Nulla quos eveniet sit neque autem perferendis.</StoryContainer> */}
      <div className='mt-[16vh] mb-[40vh] mx-[5%]  style-heading bg-gradient-to-bl from-primary-base to-secondary-t4 font-extrabold bg-clip-text text-transparent w-[60vw] max-w-[520px] drop-shadow-lg z-20'>Actions are louder than words, so I build things.</div>
      <div className='w-full h-fit xl:max-w-[1400px] xl:opacity-60 absolute top-72 right-0 z-0'>
        <Sheet className=""></Sheet>
        <LeftBlock className="absolute right-0 top-0 translate-y-[6%] -translate-x-[30vw] w-[12%]"></LeftBlock>
        <FrontBlock className="absolute right-0 top-0 translate-y-[80%] -translate-x-[20vw] w-[18%]"></FrontBlock>
        <RearBlock className="absolute right-0 top-0 translate-y-[10%] -translate-x-[26%] w-[14%]"></RearBlock>
      </div>
      <SectionTitle className="mb-4">Expertise</SectionTitle>
      <ExpertiseContainer
        title="I engineered a system architecture and ecosystem for a sport facilities booking software from zero"
        content="Despite having zero prior experience, I found myself working in an early stage startup where I had the chance to create the underlying system’s architecture for the product ecosystem including databases, data structures, server-side services, event handler, system applications as well as integrations. Having limited resources forced me to always make a system design with high reliability. The biggest challenge that I faced was to design a robust ecosystem that is effective, yet maintainable and scallable. As an engineer minded person, I am naturally curious and accustomed to view things from a broader perspective which I then apply into my works. Now, I am apt to engineer an efficient ecosystem with a minimal tradeoff in which the initial unique problem can be solved effectively."/>
      <ExpertiseContainer
        title="7+ billion people own a smartphone, so I built a mobile-first software application with my team using the Flutter framework"
        content="Through my understanding of the statistics and trajectory of the future of technology, I decided to develop a product that focuses on smartphone usage. Since resources for an early stage startup are scarce, my team and I adopted and learned new knowledge such as the Dart language and the Flutter framework for our company’s sport facility booking system in order to capitalise on a fast production environment. Having good critical thinking skills, it helped me to steer the project to adapt with challenges efficiently by eliminating overly risky and unreliable decisions. With this, I am ideal to aid your company to make an effective decision in such a way that it serves and solves your unique problem."/>
      <ExpertiseContainer
        title="How writing codes changes my life forever and I encourage anyone to try"
        content="Coding is not just picking up a new language and starting to type on the keyboard – it is more. Writing codes turned me from being a passive worker to a proactive thinker. It also exponentially sharpened my analytical skills, problem solving skills, organising skills and communicating skills by being involved in an industrial grade project collaboratively with other engineers. This discipline turns me into someone who actively approach any real life problems in analytical ways; enabling me to adapt to any changes effectively. To top it off, working in a team with a diverse background of disciplines has improved my ability to read, learn and understand complex codebases written by other engineers hence improving my ability to write effective, readable and maintainable codes."/>
    </ScrollSnapWrapper>
  )
}

interface iExpertiseContainer{
  title: string,
  content: string,
}

const ExpertiseContainer = (props: iExpertiseContainer) => {
  const [isPresent, setIsPresent] = useState(false);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["0 1", "1 0"] });
  let unsub: ()=> void | undefined;

  useEffect(() => {
    console.log("present? : ",isPresent);
    if (!isPresent) {
      unsub = scrollYProgress.onChange((p) => {
        console.log(p);
        if (p > 0.25) setIsPresent(true);
      });
    }
    if (unsub) return () => { unsub(); };
  }, [isPresent]);


  return (
    <div ref={ref} className='mt-2 mb-[40vh] w-full apply-inverse-gray max-w-[540px]'>
      <motion.h2
        transition={{ duration: 0.9, ease:'backOut' }}
        animate={{ opacity: isPresent ? 1 : 0, x: isPresent ? 0: 100}}
        className='w-[90%] mb-10 style-heading-h2 text-themed-gray-base font-medium'>{props.title}</motion.h2>
      <motion.p
        transition={{ duration: 1.6, type: 'spring', delay: 1 }}
        animate={{ opacity: isPresent ? 1 : 0, y: isPresent ? 0: 100}}
        className='w-[95%] mobile-xl:w-[90%] md:w-[86%] style-body text-themed-gray-t4 text-justify md:text-start'>{props.content}</motion.p>
    </div>
  )
}

const ContactSection = () => {
  const {active, fire} = useTrigger();

  const onClickEmailIcon = () => {
    copy("qarnayn.khddin@gmail.com");
    fire();
  }

  return (
    <div className='frame-bounded-x pb-10 flex flex-col gap-5 md:flex-row'>
      <div className='max-w-[85%] sm:w-full mb-6'>
        <SectionTitle className="mb-6">Contact</SectionTitle>
        <div className='style-heading mb-8'>Love to hear from you, don’t hesitate to get in touch!</div>
        <div className='mb-8 style-body max-w-[90%]'>I’m open to any opportunity. Feel free to contact me via the message section or you can send me an email directly. Also, I am on LinkedIn! Come and connect with me in LiknedIn to keep in touch.</div>
        <div className='flex flex-row gap-4'>
          <IconButton icon={IoMailOpen} title="email" tooltip="Copy email address" leftAligned onClickFn={()=>onClickEmailIcon()}/>
          <a href='https://www.linkedin.com/in/qarnaynkhairuddin' target="_blank">
            <IconButton icon={IoLogoLinkedin} title="linkedin" tooltip="Go to LinkedIn profile"/>
          </a>
          <a href='https://github.com/qarnaynsv001' target="_blank">
            <IconButton icon={IoLogoGithub} title="github" tooltip="Go to Github profile"/>
          </a>
          <NotificationBanner show={active} message={"Qarnayn's email address has been copied to your clipboard."} />
        </div>
      </div>
      <ContactForm/>
    </div>
  )
}
