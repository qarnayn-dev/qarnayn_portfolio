import React, { useEffect, useState } from 'react'
import { config, animated, useSpring, useTransition } from 'react-spring';


interface iAnimatedTextProps{
  textInput: string | string[];
  specialTexts?: string[];
  specialStyleClass?: string;
}

/// Animate text based on [textInput]
export const AnimatedText = ({textInput,specialTexts,specialStyleClass}:iAnimatedTextProps) => {
  let wordListAll: string[];
  switch (typeof textInput) {
    case "string":
      wordListAll = textInput.split(' ');
      break;
    case "object":
      wordListAll = textInput;
      break;
  }

  const [wordList, setWorldList] = useState([wordListAll[0]])

  const transitions = useTransition(wordList, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    delay: 200,
    config: config.molasses,
  })

  useEffect(() => {
    if (wordList.length < wordListAll.length) {
      setTimeout(() => {
        setWorldList((state)=> [...state, `${wordListAll[wordList.length]}`])
      },800)
    }
  }, [wordList])

  function getDefaultStyle(singleItem:string):string | undefined {
    return (specialTexts && specialTexts.includes(singleItem)) ?
      specialStyleClass
      : undefined
  }

  return (
    <div className='flex flex-row'>
      {transitions(({ opacity}, item,_,index) => (
        <animated.div style={{ opacity: opacity }}>
          <WordAppear
            myKey={`${index}`}
            text={item}
            // defaultColor={item === 'Qarnayn' ? "rgb(var(--primary))" : undefined}
            textStyleClass={getDefaultStyle(item)}
          />
        </animated.div>
      ))}
    </div>
  )
}

interface iWordFocused{
  myKey: string,
  text: string,
  focusColor?: string,
  defaultColor?: string,
  textStyleClass?:string,
}

/// singular text animation
const WordAppear = ({myKey,text,focusColor,defaultColor,textStyleClass}:iWordFocused) => {
  const [onFocus, setOnFocus] = useState(true)
  useEffect(() => {setTimeout(() => {setOnFocus(false)},500)}, [])

  const springStyle = useSpring({
    config: {duration:600},
    from: {
      scale: onFocus ? 1 : 1.5,
      marginLeft: onFocus ? '0' : (text.length < 8 ? '1.5rem' : '2.25rem'),
      // color: onFocus ? "rgb(var(--neutral-black))": "rgb(var(--primary))"
    },
    to: {
      scale: onFocus ? 1.5 : 1,
      marginLeft: onFocus ? (text.length < 8 ? '1.5rem' : '2.25rem') : '0',
      // color: onFocus ? "rgb(var(--primary))": "rgb(var(--neutral-black))"
    },
  })

  return (
    <animated.div
      key={myKey}
      style={springStyle}
      className={`${onFocus ? 'font-medium backdrop-blur-sm rounded-md z-10 inset-0 bg-themed-gray-t2 bg-opacity-20 text-themed-gray-inverse' : 'z-0 '} ${textStyleClass}`}>
      {`${text}`}&nbsp;
    </animated.div>
  )
}