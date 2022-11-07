import React, { ChangeEvent, LegacyRef, memo, ReactNode, useCallback, useEffect, useMemo, useReducer, useRef, useState } from 'react'
import { motion, useScroll} from 'framer-motion'
import { DummyBlock } from '../components/DummyBlock'
import { ParallaxWrapper } from '../components/ParallaxWrapper';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { iInterestTag, toggleTag } from '../redux/tagSlice';
import { TextInputField } from '../components/TextInputField';


const Devpage = () => {
  const fullScreenConfig: string = "w-screen h-screen flex flex-col justify-center items-center";
  const centerChildrenConfig: string = "flex flex-col justify-center items-center";
  const bgColor: string = 'bg-gradient-to-br from-primary-base to-themed-gray-base';
  const { scrollY } = useScroll();


  return (
    <>
      <DummyPage></DummyPage>
    </>
  )
}

export default Devpage


const DummyPage = () => {

  return (
    <>
      <div className='w-screen h-screen bg-green-100 flex flex-col justify-center items-center'>
        <InputTest></InputTest>
      </div>
      <div className='w-screen h-screen bg-blue-100 flex justify-center items-center'>
        <div id="test-rotate"><DummyBlock size='lg' colorChoose={2}></DummyBlock></div>
        <ParallaxWrapper yDisplacement={700}>
          <div id="test-rotate"><DummyBlock size='lg' colorChoose={6}></DummyBlock></div>
        </ParallaxWrapper>
        <ParallaxWrapper yDisplacement={-700}>
          <div id="test-rotate"><DummyBlock size='lg' colorChoose={19}></DummyBlock></div>
        </ParallaxWrapper>
        <div id="test-rotate"><DummyBlock size='lg' colorChoose={12}></DummyBlock></div>
      </div>
      <div className='w-screen h-screen bg-green-100'></div>
      <div className='w-screen h-screen bg-red-100'></div>
    </>
  )
}

interface iState{
  name: string, title: string
}

interface iAction{
  type: string,
  payload: iPayload,
}

interface iPayload{
  keyName: string,
  value: string,
}

const reducer = (state: iState, action: iAction) => {
  switch (action.type) {
    case "UPDATE":
      return {...state,[action.payload.keyName]:action.payload.value}
    default:
      return state;
  }
}


const InputTest = () => {
  const INITIAL: iState = { name: "", title: "" }
  const [state, dispatch] = useReducer(reducer, INITIAL);

  const callbackUpdate = useCallback((e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    dispatch({ type: "UPDATE", payload: { keyName: e.currentTarget.name, value: e.currentTarget.value } });
  }, []);

  function updateValue(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    dispatch({ type: "UPDATE", payload: { keyName: e.currentTarget.name, value: e.currentTarget.value } });
    // console.log("update : ",e.currentTarget.value);
  }

  const allTags = useSelector<RootState, iInterestTag[]>((state)=> state.tags);

  return (
    <div className='w-[80%] h-[60%] p-10 rounded-xl shadow-lg bg-white'>
      <TextInputField inputKeyName={"name"} title={"Name"} value={state.name} onChange={callbackUpdate} />
      <TextInputField inputKeyName={"title"} title={"Title"} value={state.title} onChange={callbackUpdate} />
      {/* <InputText title='Name' inputKeyName="name" value={state.name} onChange={callbackUpdate} />
      <InputText title='Title' inputKeyName="title" value={"state.title"} onChange={callbackUpdate} /> */}
      {/* <DumbInput title='name' onChange={callbackUpdate} inputKeyName={'name'} value={state.name}></DumbInput>
      <DumbInput title='title' onChange={callbackUpdate} inputKeyName={'title'} value={state.title}></DumbInput> */}
      {allTags.map((item) => <Tag key={`interesttag#${item.id}`} id={item.id} title={item.title} selected={item.selected}></Tag>)}
    </div>
  )
}

interface iDumbInput{
  title: string,
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement >) => void,
}

interface iTextInputField{
    inputKeyName: string,
    title: string,
    value: string,
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement >) => void,
    hintText?: string,
    labelId?: string,
    useTextArea?: boolean,
    className?: string,
}

const DumbInput = memo((data: iTextInputField) => {
  console.log(`${data.title} renders`);
  return (
    <input name={data.inputKeyName} type="text" className='rounded-md w-full m-4 border-themed-gray-t9 border-2 p-2' onChange={(e) => data.onChange(e)} placeholder={data.title} />
  )
});

const Tag = memo((data: iInterestTag) => {
  const dispatch = useDispatch();

  function onToggle() {
    dispatch(toggleTag(data.id));
  }

  console.log(`${data.title} : `, data.selected);
  console.log(`${data.id},${data.title},${data.selected}`);

  return (
    <button onClick={()=>onToggle()} className={`px-3 py- m-3 rounded-md  ${data.selected?'bg-blue-200':'bg-gray-200'}`}>{data.title}</button>
  )
})


interface iTextInputField{
    inputKeyName: string,
    title: string,
    value: string,
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement >) => void,
    hintText?: string,
    labelId?: string,
    useTextArea?: boolean,
    className?: string,
}

const InputText = memo((props:iTextInputField) => {
  const [isFocus, setIsFocus] = useState(false);
  const shouldOnTop: boolean = !isFocus && props.value.length === 0;
  // const shouldOnTop = useMemo(() => {
  //   return (!isFocus && props.value.length === 0)
  // }, [isFocus, props.value.length === 0]);


  const inputBoxCN: string = "w-full px-2 pt-2 pb-2 bg-transparent border-[1px] border-themed-gray-t2 rounded-md outline-none focus:outline-offset-0 focus:duration-500 ease-out-circ focus:outline-primary-t2 focus:border-transparent dark:bg-themed-gray-t2";

  console.log(`${props.title} : `, isFocus);
  return (
     <div className={`relative group  ${props.className ?? 'mb-8 w-full'}`}>
            <motion.label
                transition={{duration: isFocus ? 0.3 : 0.12}}
                animate={{
                    translateY: shouldOnTop ? 0 : -14,
                    translateX: shouldOnTop ? 6:0,
                    scale: shouldOnTop ? 0.9 : 0.8,
                    opacity:  shouldOnTop? 0: 1,
                }}
                className='bg-themed-gray-base text-themed-gray-t7 absolute top-0 left-0 px-1 group-focus-within:text-primary-base group-focus-within:font-medium'>{props.title}</motion.label>
            <input
                name={props.inputKeyName}
                placeholder={isFocus ? "" : props.hintText ?? props.title}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={(e) => props.onChange(e)}
                className={`${inputBoxCN}`} />
      </div>
  )
})
