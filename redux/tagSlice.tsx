import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';

export interface iInterestTag{
    id: string,
    title: string,
    selected: boolean,
}

const INITIAL_STATE: iInterestTag[] = [
    {id: '1',title: 'Software',selected: false},
    {id: '2',title: 'Apple',selected: false},
    {id: '3',title: 'Snorlax',selected: true},
    {id: '4',title: 'Onyx',selected: false},
]

export const tagSlice = createSlice({
    name: 'interestTags',
    initialState: INITIAL_STATE,
    reducers: {
        addNewTag: (state, action:{payload:string}) => {
            const newTag: iInterestTag = {id: `${state.length+1}`,title:action.payload, selected: true};
            state.push(newTag);
        },
        toggleTag: (state, action:{payload:string}) => {
            const index: number = state.findIndex((v)=> v.id === action.payload);
            state[index].selected = !state[index].selected;
        }
    }
});


export const { addNewTag,  toggleTag} = tagSlice.actions;
export const tags = (state: RootState) => state.tags.values;
export default tagSlice.reducer;