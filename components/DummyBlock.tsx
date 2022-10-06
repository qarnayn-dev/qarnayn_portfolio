interface iDummyBlock{
  size: string,
  colorChoose: number,
 }
export const DummyBlock = ({ size, colorChoose}: iDummyBlock) => {
  const sizeConfig: {[key:string]:string} = {
     sm: 'w-8 h-8 rounded-sm',
     md: 'w-16 h-16 rounded-md',
     lg: 'w-28 h-28 rounded-lg',
  }


  return (<div className={`m-2 shadow-xl bg-gradient-to-br ${pairedColor[colorChoose][0]} ${pairedColor[colorChoose][1]} ${sizeConfig[size]}`} />)
}

  const pairedColor: { [key: number]: string[] } = {
    1: ['from-red-500','to-emerald-500'],
    2: ['from-orange-500','to-violet-500'],
    3: ['from-rose-500','to-orange-500'],
    4: ['from-violet-500','to-rose-500'],
    5: ['from-teal-500','to-sky-500'],
    6: ['from-emerald-500','to-orange-500'],
    7: ['from-purple-500','to-teal-500'],
    8: ['from-rose-500','to-sky-500'],
    9: ['from-sky-500','to-violet-500'],
    10: ['from-violet-500','to-teal-500'],
    11: ['from-teal-500','to-emerald-500'],
    12: ['from-fuchsia-500','to-rose-500'],
    13: ['from-sky-500','to-orange-500'],
    14: ['from-purple-500','to-fuchsia-500'],
    15: ['from-orange-500','to-red-500'],
    16: ['from-emerald-500','to-sky-500'],
    17: ['from-cyan-500','to-purple-500'],
    18: ['from-cyan-500','to-emerald-500'],
    19: ['from-teal-500','to-orange-500'],
    20: ['from-fuchsia-500','to-red-500'],
  }
