import React from 'react'
import { IoLogoGithub, IoLogoLinkedin, IoMailOpen } from 'react-icons/io5'
import { SectionTitle } from '.'
import ClickToCopy from '../components/ClickToCopy'
import { ContactForm } from '../components/ContactForm'
import { IconButton } from '../components/IconButton'
import TopFrame from '../components/TopFrame'

const Contacts = () => {
  return (
    <>
      <TopFrame/>
      <ContactSection/>
    </>
  )
}

export default Contacts

export const ContactSection = () => {
  return (
    <div className='frame-bounded-x pt-32 pb-10 flex flex-col gap-5 md:flex-row bg-primary-base bg-opacity-10 dark:bg-opacity-5 relative'>
      <div className='max-w-[85%] sm:w-full mb-6'>
        <SectionTitle className="mb-6">Contact</SectionTitle>
        <div className='style-heading mb-8'>Love to hear from you, send me a message!</div>
        <div className='mb-8 style-body max-w-[90%]'>I’m open to any opportunity. Feel free to contact me via the message section, or you can send me an email directly. Also, I am on LinkedIn! Come and connect with me on LinkedIn to keep in touch.</div>
        <div className='flex flex-row gap-4'>
          <ClickToCopy textToCopy="qarnaynkhairuddin@gmail.com" message="Qarnayn's email address has been copied to your clipboard.">
            <IconButton icon={IoMailOpen} title="email" tooltip="Copy email address" leftAligned/>
          </ClickToCopy>
          <a href='https://www.linkedin.com/in/qarnaynkhairuddin' target="_blank">
            <IconButton icon={IoLogoLinkedin} title="linkedin" tooltip="Go to LinkedIn profile"/>
          </a>
          <a href='https://github.com/qarnaynsv001' target="_blank">
            <IconButton icon={IoLogoGithub} title="github" tooltip="Go to Github profile"/>
          </a>
        </div>
      </div>
      <ContactForm/>
    </div>
  )
}
