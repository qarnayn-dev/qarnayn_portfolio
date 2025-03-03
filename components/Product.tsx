import Image from "next/image"


interface iProduct{
    children?: any,
    className?: string,
    name: string,
    description?: string,
    source: string,
    appstoreLink?: string,
    playstoreLink?: string,
}

export default function Product ({children,className, name, description, source, appstoreLink ,playstoreLink} : iProduct) {
    return (
      <div className={`${className} mt-2 flex flex-row items-start space-x-2`}>
        <div className="hidden xs:block mt-[2px]">
          <Image 
            src={source} 
            className="rounded-md shadow-md" 
            width="40px" 
            height="40px"/>
        </div>
        <div>
          <div className="flex flex-row items-center font-medium">
            <span className="h-6">{name}</span>
            <span className="ml-2 block xs:hidden">
              <Image 
              src={source} 
              className="rounded-md shadow-16" 
              width="16px" 
              height="16px"/>
            </span>
          </div>
          <div className="text-sm">{description}</div>
        </div>
      </div>
    )
}