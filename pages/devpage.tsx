import React, { ChangeEvent, LegacyRef, memo, ReactNode, useCallback, useEffect, useMemo, useReducer, useRef, useState } from 'react'
import { motion, useScroll} from 'framer-motion'
import { DummyBlock } from '../components/DummyBlock'
import { ParallaxWrapper } from '../components/ParallaxWrapper';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { iInterestTag, toggleTag } from '../redux/tagSlice';
import { TextInputField } from '../components/TextInputField';
import { a } from 'react-spring';
import { SelectableTag } from '../components/SelectableTag';


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

  const reduxDispatch = useDispatch();
  const toggleTagItem = useCallback((id: string) => {
    reduxDispatch(toggleTag(id));
  },[])

  const callbackUpdate = useCallback((e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    dispatch({ type: "UPDATE", payload: { keyName: e.currentTarget.name, value: e.currentTarget.value } });
  }, []);

  const allTags = useSelector<RootState, iInterestTag[]>((state)=> state.tags);

  return (
    <div className='w-[80%] h-[60%] p-10 rounded-xl shadow-lg bg-white'>
      <TextInputField inputKeyName={"name"} title={"Name"} value={state.name} onChange={callbackUpdate} />
      <TextInputField inputKeyName={"title"} title={"Title"} value={state.title} onChange={callbackUpdate} />
      {/* {allTags.map((item) => <Tag key={`interesttag#${item.id}`} id={item.id} title={item.title} selected={item.selected}></Tag>)} */}
      {allTags.map((item, i) =>
        <SelectableTag key={i} id={item.id} item={item.title} isSelected={item.selected} onToggleFn={toggleTagItem} />)}
    </div>
  )
}


const Tag = memo((data: iInterestTag) => {
  const dispatch = useDispatch();

  function onToggle() {
    dispatch(toggleTag(data.id));
  }

  // console.log(`${data.title} : `, data.selected);
  console.log(`${data.id},${data.title},${data.selected}`);

  return (
    <button onClick={()=>onToggle()} className={`px-3 py- m-3 rounded-md  ${data.selected?'bg-blue-200':'bg-gray-200'}`}>{data.title}</button>
  )
})