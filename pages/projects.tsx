import { AnimatePresence, motion } from 'framer-motion'
import React, { ReactNode, useState } from 'react'
import { IconType } from 'react-icons'
import { IoLockClosed, IoLogoGithub, IoLogoPython, IoChevronUpOutline } from 'react-icons/io5'
import { ChainedPost } from '../components/ChainedPost'
import TopFrame from '../components/TopFrame'
import DartLogo from '../assets/Logos/dart_logo.svg'
import FlutterLogo from '../assets/Logos/flutter_logo.svg'
import FirebaseLogo from '../assets/Logos/firebase_logo.svg'
import AWSLogo from '../assets/Logos/aws_logo.svg'
import HTML5Logo from '../assets/Logos/html_logo.svg'
import MySQLLogo from '../assets/Logos/mysql_logo.svg'
import PythonLogo from '../assets/Logos/python_logo.svg'
import ReactLogo from '../assets/Logos/react_js_logo.svg'
import ReduxLogo from '../assets/Logos/redux_logo.svg'
import TailwindLogo from '../assets/Logos/tailwindcss_logo.svg'
import TypeScriptLogo from '../assets/Logos/typescript_logo.svg'
import SportivityAppMock1 from '../assets/Projects/sportivity_app_ip13.svg'
import SportivityAppMockExtnd from '../assets/Projects/sportivity_app_mockup.svg'

const Projects = () => {
  return (
    <>
    <TopFrame/>
    <div className='frame-bounded-x pt-32 pb-28 bg-gradient-to-tr from-primary-t4'>
        <ProjectCard
          name='Sportivity Application'
          title='A sports facility booking platform with social and community features.'
          thumbnail={
            <SportivityAppMock1 className="absolute top-6 left-[22%] lg:left-0 z-0 my-16 ml-10 max-w-[450px]"></SportivityAppMock1>
          }
          description="Mobile-first software applications – both IOS and Android users to search for a local sports facility service, reserve their facility slot and socially connect with their community or strangers with a common interest."
          extensionDesc="I started a startup company and made this project our core product. Our vision is to support diverse sports communities while providing multipurpose utilities to our target audience – sports enthusiast and casual players. This project has the potential to expand further such as the introduction of personal trainer features."
          techStach={[
            {icon: DartLogo,displayTitle:"Dart"},
            {icon: FlutterLogo,displayTitle:"Flutter"},
            {icon: FirebaseLogo,displayTitle:"Firebase"},
            {icon: MySQLLogo,displayTitle:"MySQL"},
            {icon: AWSLogo,displayTitle:"AWS"},
            {icon: PythonLogo,displayTitle:"Phyton"},
          ]}
          roleOverview="I led this project from brainstorming ideas to the production stages. My roles during the project: I designed the User Interface and User Experience (UI & UX); designed the application architectures; designed the business logic; designed the features; developed all the complex application states; optimized the architecture designs; wrote, reviewed, and managed the code base; solved complex problems; mitigated risk and potential risk; reduced the operation cost; made high-impact decisions; writing documentations; guide and mentored junior team members; other general tasks as a software engineer."
          shortRole={[
            "Led the engineering team in an AGILE development process.",
            "Designed and optimized the software architecture.",
            "Wrote, reviewed, and managed the codebase.",
          ]}
          roles={[
            "Since I lead the engineering team and we have no dedicated UI & UX designer, I had to design the UI & UX from scratch. Since then, I have never stopped learning and improving on how to make the design better. I also pay close attention to our audience – sports enthusiasts and incorporate the element which appeals to them in our design.",
            "The project had no blueprint when it first started. Therefore, I planned, designed, and developed the software architecture from zero. I produced an efficient architecture design by constantly learning, researching, and improving the design that caters to the nature of sports industries – various sports and their unique needs.",
            "Various sports require various business models; I took the role of designing a system that can handle these different needs by conducting research and communicating with potential audiences.",
            "To compete with other existing businesses, I played a critical role in brainstorming, designing, and creating a feature that could be our selling point. My most impactful design is a feature where an organizer can make a conditional reservation that would only be confirmed when fulfilling the minimum number of participants.",
            "The project has complex uses of application states that have a direct connection with external API. I handled and developed the state application logic resulted in reducing the potential risk of high cost, low performance, and bad user experience.",
            "The project was built from scratch and based on established software architecture system design close to its business nature as references. Throughout the development stages, I monitored the application's performance and made some optimizations to ensure no deterioration of the user experience.",
            "As the lead engineer, I delegated simple tasks to my team members according to their level as I worked on solving more complex problems. As they gained more knowledge, I handed them more challenging tasks while I acted as their safeguard to cover and solve any unresolved complex works.",
            "As I gained more experience designing software architecture, I learned that a good design could mitigate risks. For example, I planned, designed, and implemented an internal cooldown mechanism for critical features to prevent excessive API call executions.",
            "During the development stages, I reduced the operational cost of the project by introducing an intelligent mechanism into the architecture design. I achieved this by implementing a group transactions mechanism – a delayed API call execution on the front end and choosing the most efficient service for the back-end database.",
            "One of the challenges I faced when leading the engineering team of a startup company was deciding on the project technology stacks to ensure it is reliable, scalable, and expandable. My decisions are focused on the nature of the application designed for utilities and social connection uses.",
            "This application is a hybrid combination of a sports booking platform and social media software. I wrote documentation on the designs, technologies, and implementations for our team members to refer to as standards and guidelines.",
            "I guided and mentored our junior team members to start their work. As I mentored other members, I kept strengthening my fundamental computer science knowledge as a byproduct. It also improves my written and verbal communication throughout mentoring a diverse team background.",
          ]}
          isLocked={true}
          status={ProjectStatus.active}
        />
        <ProjectCard
          name="Sportivity Partner Application"
          title="A facility management software application for businesses to manage, analyze metrics, and promote their facility services."
          description="This project is part of our core product's ecosystem integrated with the Sportivity Application and aims to provide robust management support for our partner's facility services needs."
          extensionDesc="The project started when the main application was at an 80% completion rate from its MVP development. Since it has a different target audience than the Sportivity Application – business owners and facility management, it was built from scratch and primarily focused on providing the solution to our partner."
          techStach={[
            {icon: DartLogo,displayTitle:"Dart"},
            {icon: FlutterLogo,displayTitle:"Flutter"},
            {icon: FirebaseLogo,displayTitle:"Firebase"},
            {icon: AWSLogo,displayTitle:"AWS"},
            {icon: PythonLogo,displayTitle:"Phyton"},
          ]}
          shortRole={[
            "Led the engineering team in an AGILE development process.",
            "Integrated and improved the existing software infrastructure to suit business needs.",
            "Designed, developed, and optimized the software architecture for B2B relations.",
          ]}
          roleOverview="The project is the second phase of the whole Sportivity ecosystem; I led the engineering team for this project to ensure seamless support and integration with the main application. My roles during the project: I designed the software architectures; designed the business logic; designed the User Interface and User Experience (UI & UX);  designed the features; optimized the architecture designs; Integrated with the existing software infrastructures; wrote, reviewed, and managed the code base; solved complex problems; made high-impact decisions; writing documentations; guided and mentored junior team members; other general tasks as a software engineer."
          roles={[
            "Since the project has a different target audience than our main application, I designed and developed the software architectures focusing on business-to-business (B2B) needs. I produced an efficient software architecture by researching, predicting, and understanding our partner's behaviors on top of my experiences from the previous project.",
            "Every sport has its uniqueness and different business model; A facility can offer multiple sports services hence the complexity. Since it is hard to meet all business needs in the sports industry, I planned and developed the business logic according to phases and included a plan for future expansion.",
            "I made the UI & UX design for this project designated for workers or business owners to manage their facilities. My experiences from the previous project aided me in the design process; however, the most impactful criterion for making a good design is I understood our audience's needs while tailoring the design accordingly.",
            "I have an active role in planning, developing, and delivering features to provide the most value for our partners to stay competitive in the sports industry. For example, I created a built-in feature for any business to expand, acquire or merge its facility with a new or an existing facility.",
            "I optimized the project's software architecture design by simplifying any complex flow in the design. I eliminated inefficient processes by researching, learning, and understanding the working behavior of our audiences. It is a continuous process; I will always find improvements in the design.",
            "Introducing an additional product into our ecosystem was challenging since it is connected and bounded by the former. However, since I had planned the whole ecosystem initially, I had already designed our main application to be easily integrated. Hence I integrated this project with our main application with some minor adjustments to both software.",
            "As an engineering lead, I wrote, reviewed, and managed the codebase to ensure it satisfied the industry standard, readable and maintainable. I  also handled the binding of the front-end and the back-end components to ensure a seamless and smooth user experience.",
            "As the lead engineer, I worked on most of the integration components between this project and the main application while handling any complex problem that arose from both front-end and back-end components.",
            "It is common for businesses to have outdated technology used in their facility. Given our small team capacity, I decided to develop this as a web application using the Flutter UI toolkit for fast development time; it also covers most of the computers used in the facilities due to support by Flutter.",
            "I wrote documentation on the designs, technologies, and implementations for our team members to refer to as standards and guidelines.",
            "I led, guided, and mentored our junior team members.",
          ]}
          isLocked={true}
          status={ProjectStatus.active}
        />
        <ProjectCard
          name="Portfolio Website"
          title="My portfolio website – is 100% designed and built by myself."
          description="Here I present the best works and projects I contributed – showcasing my skills and experiences in the Tech industry. This portfolio was designed and developed by myself. I challenged myself to learn and adapt to new knowledge."
          extensionDesc="I started with learning the fundamentals of web development, relearning the UI & UX design, learning a new language, learning a new framework, and learning to copywriting. I designed this portfolio to attract both non-technical and technical audiences. There are rooms for expansion and improvements in the portfolio that I want to discover in the future."
          techStach={[
            {icon: TypeScriptLogo,displayTitle:"Typescript"},
            {icon: HTML5Logo,displayTitle:"HTML5"},
            {icon: ReactLogo,displayTitle:"React JS"},
            {icon: TailwindLogo,displayTitle:"Tailwind"},
            {icon: ReduxLogo,displayTitle:"Redux"},
          ]}
          roleOverview="I owned, designed, developed, and maintained this portfolio project. Works that I have done for the project: I made the project's UI & UX designs; developed the front end; developed the back end; improved the UI & UX designs; made the copywriting; handled the UI & UX for different screen sizes; improved the performance of the website."
          shortRole={[
            "Designed the UI and the UX from scratch.",
            "Planned, wrote, and developed the codebase from zero.",
            "Improved the UI & UX as I became more experienced from time to time.",
          ]}
          roles={[
            "Since I have experience in UI & UX design from previous projects, I was able to prototype the UI & UX for this project in a short period. Regardless, I learned other UI & UX concepts and applied them to this project. The knowledge I gained is a step up to my work – I can improve my previous design to make it better.",
            "I developed the front end close to the vision I had imagined when designing the UI & UX of this project without compromising any performance issues.",
            "The project uses the Next JS framework; the project only has a simple back-end use case. However, in the future, I plan to add some Content Management Systems for my blog post.",
            "Since I constantly learn UI & UX design to produce a better product, I improved the design for this project. As I gained more experience and knowledge, I turned the project into a website with a strong brand and more audience-focused.",
            "I made copywriting tailored to this project's purpose – to convince my audiences of my offered skills.",
            "I handled all the screen responsiveness for both the UI & UX design and development stages.",
          ]}
          isLocked={false}
          status={ProjectStatus.completed}
          githubUrl="https://github.com/qarnaynsv001/qarnayn_portfolio"
        />
      </div>
    </>
  )
}

export default Projects

interface iProjectCard{
  name: string,
  title: string,
  description: string,
  extensionDesc?: string,
  techStach: iTechIcon[],
  roleOverview: string,
  shortRole: string[],
  roles: string[],
  isLocked?: boolean,
  status: ProjectStatus,
  githubUrl?: string,
  thumbnail?: ReactNode,
}

enum ProjectStatus{
  active = "active",
  completed = "completed",
  inProgress = "in-progress",
  comingSoon = "coming soon"
}

const ProjectCard = (props: iProjectCard) => {
  const [isExpand, setIsExpand] = useState(false);
  const twSub: string = "style-small-text text-themed-gray-t6";
  const twTransition: string = "transition-all duration-500 ease-out-cubic";
  const isCodeAvailable: boolean = !props.isLocked && (props.githubUrl!==undefined);

  const Tag = () => {
    let twBgColor: string;
    switch (props.status) {
      case ProjectStatus.active:
        twBgColor = "bg-semantic-success";
        break;
      case ProjectStatus.completed:
        twBgColor = "bg-semantic-info";
        break;
      default:
        twBgColor = "";
        break;
    }
    return <div className={`${isExpand ? 'scale-100' : 'scale-75'} ${twTransition} ${twBgColor} px-3 pb-[1px] style-small-text rounded-xl text-nwhite`}>{props.status}</div>
  }

  const ProjectName = () => {
    return (
      <div className='flex flex-row gap-1 items-center'>
        <div className={`${isExpand ? 'style-heading font-normal mb-1' : 'style-subheading font-light'} ${twTransition} font-light text-primary-base`}>{props.name}</div>
        {props.isLocked && <IoLockClosed className={`${twTransition} text-themed-gray-t9`} size={isExpand? 20: 14} />}
        <Tag/>
      </div>
    )
  }

  const ProjectTitle = () => {
    return (
      <h2 className={`${isExpand ? 'style-body w-[70%] mb-4' : 'style-heading-h2 w-full mb-8'} ${twTransition} font-light`}>{props.title}</h2>
    )
  }

  const Description = () => {
    return (
      <motion.p
        transition={{ duration: 0.7, type: "spring" }}
        initial={{opacity:0, x: 50}}
        exit={{opacity:0, x: 50}}
        animate={{ opacity: 1,  x:0}}
        className={`w-[90%] ${isExpand? 'md:w-[60%]':'md:w-[90%]'} mt-2 mb-5 style-body apply-inverse-gray text-themed-gray-t4`}
        >
        {props.description}
        {isExpand && props.extensionDesc}
      </motion.p>
    )
  }

  const ShortContibutions = () => {
    return (
      <AnimatePresence >
        {!isExpand &&
          <motion.div
            transition={{ duration: 0.6, type: 'spring' }}
            initial={{x:50, opacity:0}}
            exit={{x:50, opacity:0}}
            animate={{ x: 0, opacity: 1 }}
            className='mt-8'>
            <div className={`${twSub}`}>ROLES</div>
            <div className='style-body text-themed-gray-t9 pl-1'>
              {props.shortRole.map((v,i) => <li key={i}>{v}</li>)}
              <div className='italic text-themed-gray-t6'>... more</div>
            </div>
          </motion.div>
        }
      </AnimatePresence>
    )
  }

  const TechStack = () => {
    return (
      <>
        <AnimatePresence>
          {!isExpand && <motion.div
          transition={{ duration: 1.8, type: "spring" }}
          initial={{opacity: 0}}
          exit={{opacity: 0}}
          animate={{opacity: 1}}
          className={`${twSub} mt-6`}>TECH-STACK</motion.div>}
        </AnimatePresence>
        <motion.div
          transition={{ duration: 2.6, type: 'spring' }}
          initial={{ opacity:0}}
          animate={{ opacity:1 }}
          className="w-full mt-2 mb-12 flex flex-row flex-wrap">
          {props.techStach.map((v,i)=> <TechIcon key={i} icon={v.icon} displayTitle={v.displayTitle}></TechIcon>)}
        </motion.div>
      </>
    )
  }

  const ScreenWidePhoto = () => {
    return (
      <motion.div
        transition={{ duration: 2.4, type: 'spring' }}
        initial={{opacity:0}}
        exit={{opacity:0}}
        animate={{opacity:1}}
        className='w-full h-60 mb-5 bg-red-100'/>
    )
  }

  const ExpandCTA = () => {
    return (
      <button
          onClick={() => { setIsExpand(true); }}
        className='py-1 px-4 rounded-md bg-primary-t4 text-center text-nwhite hover:drop-shadow-sm transition-all ease-out-circ duration-300'>
        Expand to see more
      </button>
    )
  }

  const ToGithubCTA = () => {
    return (
      <a href={props.githubUrl} target="_blank" className='py-[2px] px-4 rounded-md border-2 border-themed-gray-t3 text-center text-themed-gray-t6 hover:drop-shadow-sm transition-all ease-out-circ duration-300 flex flex-row items-center hover:text-themed-gray-t7'>See codes
        <IoLogoGithub className='pl-1' size={22}></IoLogoGithub>
      </a>
    )
  }

  const DividerForCTAs = () => {
    return (<div className='w-[2px] h-6 rounded-2xl mx-2 bg-themed-gray-t3'></div>)
  }

  const MinimizedUiLayout = (
    <>
      <Description/>
      <ShortContibutions/>
      <TechStack/>
      <div className='flex flex-row gap-2 items-center'>
        <ExpandCTA />
        {isCodeAvailable &&
          <>
            <DividerForCTAs/>
            <ToGithubCTA/>
          </>
        }
      </div>
    </>
  )

  const ExpandedUiLayout = (
    <>
      <TechStack/>
      <ScreenWidePhoto/>
      <Description />
      <SectionTitle className="mt-12 mb-2">Roles</SectionTitle>
      <ChainedPost
        className={`w-[90%] ${isExpand? 'md:w-[45%]':'md:w-[90%]'}`}
        header={props.roleOverview}>
        {props.roles}
      </ChainedPost>
      {isCodeAvailable &&
        <div className='ml-6 w-fit'><ToGithubCTA/></div>
      }
      <div className='absolute bottom-0 left-0 w-full h-6 mb-[2%] flex items-center justify-center'>
        <button onClick={()=> setIsExpand(false)} className='style-body text-themed-gray-t6 felx flex-row justify-center items-center hover:text-primary-t4 '>
          <IoChevronUpOutline size={18} className='mx-1 float-left'/>
          minimize
        </button>
      </div>
    </>
  )

  return (
    <div className='relative w-full max-w-7xl mb-16 px-6 pt-8 lg:pt-[5%] pb-16 lg:pb-[9%] rounded-2xl bg-themed-gray-base flex flex-col lg:flex-row items-center'>
      {!isExpand &&
        <div className="h-[60vh] lg:h-full w-full lg:w-[40%] max-w-[300px] overflow-visible flex justify-center items-center">
         {props.thumbnail}
        </div>
      }
      <div className={`w-full ${!isExpand?'lg:max-w-[60%]':''} lg:pl-6`}>
        <ProjectName/>
        <ProjectTitle/>
        {isExpand ? ExpandedUiLayout : MinimizedUiLayout}
      </div>
    </div>
  )
}

interface iTechIcon{
  icon: IconType,
  displayTitle: string,
}

const TechIcon = (data: iTechIcon) => {
  const twHover = "opacity-50 group-hover:opacity-80 transition-all ease-out-circ duration-500";
  return (
    <div className='w-14 group flex flex-col items-center justify-center' >
      <data.icon className={`${twHover} w-6 h-6 flex items-center justify-center`}/>
      <div className={`${twHover} t-1 h-5 style-small-text apply-inverse-gray text-themed-gray-t4 scale-75 overflow-hidden text-center`}>{data.displayTitle}</div>
    </div>
  )
}

const SectionTitle = (props:any) => {
  return (
    <div
      className={`${props.className} style-subheading style-secondary text-themed-gray-t8 font-sans flex -translate-x-0 flex-col
      before:w-8 before:h-1 before:rounded-md before:mb-2 before:bg-primary-t5 before:float-left before:bg-opacity-60
      `}>
        {props.children}
    </div>
  )
}