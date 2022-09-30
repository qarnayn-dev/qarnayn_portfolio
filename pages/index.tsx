import type { NextPage } from 'next'
import Head from 'next/head'
import  { ThemeContext } from '../components/DarkThemeToggle';
import { useContext} from 'react';
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
import { Parallax } from 'react-scroll-parallax';

const Home: NextPage = () => {
  const pageConfig: string = "px-4 md:px-5 lg:px-6 py-8";
  return (
      <div className='flex flex-col'>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <TopFrame>
        <RevealingPage className={`${pageConfig}`}>
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
      <Parallax opacity={[0,2]} className="w-screen h-screen"></Parallax>
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
