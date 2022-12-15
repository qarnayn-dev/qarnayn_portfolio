import Link from "next/link";
import { IconType } from "react-icons";
import { IoLogoGithub, IoLogoLinkedin } from "react-icons/io5";

export const Footer = () => {
  const twComp: string = "w-[20vw] h-24 pl-8 rounded-sm border-l-[2px] border-neutral-800 border-dashed";

  return (
    <div className='w-full frame-bounded-x py-5 bg-black bg-opacity-90  text-neutral-200 flex flex-col'>
      <div className='w-full mr-4 pt-12 flex flex-row items-center'>
        <div className='w-[60vw] sm:w-[40vw] max-w-md flex flex-col'>
          <div className='mb-3 style-heading-h2 font-bold bg-gradient-to-br from-primary-base to-secondary-base text-transparent bg-clip-text drop-shadow-2xl'>Qarnayn<br />Khairuddin</div>
          <div className='w-40 style-small-text text-neutral-300'>An Engineer who engraves ambitious visions into design.</div>
        </div>
        <div className={`${twComp} flex flex-col justify-center list-none `}>
            <FooterNavItem displayName={"Home"} pathName={"/"}/>
            <FooterNavItem displayName={"Projects"} pathName={"/projects"}/>
            <FooterNavItem displayName={"Contact"} pathName={"/contacts"}/>
            {/* <FooterNavItem displayName={"Resume"} action={() => {
                // TODO: download resume
            }} /> */}
        </div>
        <div className={`${twComp} hidden sm:flex flex-row gap-5 items-center text-neutral-600 style-small-text`}>
            <LinkedMedia icon={IoLogoLinkedin} href="https://www.linkedin.com/in/qarnayn"/>
            <LinkedMedia icon={IoLogoGithub} href="https://github.com/qarnayn-dev"/>
        </div>
      </div>
      <div className='w-full mt-8 style-small-text text-neutral-500'>© 2022 Qarnayn Khairuddin – all rights reserved.</div>
    </div>
  )
}

interface iFooterNavItem{
    displayName: string,
    pathName?: string,
    action?: ()=> void,
}

const FooterNavItem = (props:iFooterNavItem) => {
    return (
        <li className="text-neutral-600 style-small-text hover:text-primary-base cursor-pointer transition-all duration-500 ease-out-expo">
            {props.pathName ?
                <Link href={props.pathName}>{props.displayName}</Link> :
                <div onClick={props.action}>{props.displayName}</div>
            }
        </li>
    )
}

interface iLinkedMedia{
    icon: IconType,
    href: string,
}

const LinkedMedia = (props: iLinkedMedia) => {
    return (
        <a
            href={props.href}
            target="_blank"
            className="w-10 h-10 rounded-md border-[2px] border-neutral-800 flex justify-center items-center hover:text-primary-base hover:border-primary-base transition-all duration-500 ease-out-expo">
            <props.icon size={26}/>
        </a>
    )
}
