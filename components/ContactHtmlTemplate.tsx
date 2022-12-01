import { renderToString } from 'react-dom/server'

interface iContactHtmlTemplate{
  senderName: string,
  senderEmail: string,
  message: string,
  tags: string[],
}

export const ContactHtmlTemplate = (props: iContactHtmlTemplate) => {

  const KeyPair = (key: string, value: string) => {
    return <div className='flex flex-row gap-2 text-base text-gray-700'>
              <span className='font-medium'>{key} &nbsp;:&nbsp;</span>
              <span>{value}</span>
            </div>
  };

  return renderToString(
      <div className='w-full h-full bg-white'>
        {KeyPair("Name",props.senderName)}
        {KeyPair("Email",props.senderEmail)}
        {KeyPair("Tags", props.tags.reduce((prev, item) => prev+=`, ${item}`))}
        <br />
        <br />
        <p>{props.message}</p>
      </div>
  )
}
