import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';

export interface iInterestTag{
    id: string,
    title: string,
    selected: boolean,
}

const INITIAL_STATE: iInterestTag[] = [
    {id: '1',title: 'Front-end Dev',selected: false},
    {id: '2',title: 'Back-end Dev',selected: false},
    {id: '3',title: 'Mobile App Dev',selected: false},
    {id: '4',title: 'Data Engineer',selected: false},
    {id: '5',title: 'Product Lead',selected: false},
]

export const tagSlice = createSlice({
    name: 'interestTags',
    initialState: INITIAL_STATE,
    reducers: {
        /**
         * @param payload provide the item to display
         */
        addNewTag: (state, action:{payload:string}) => {
            const newTag: iInterestTag = {id: `${state.length+1}`,title:action.payload, selected: true};
            state.push(newTag);
        },
        /**
         * @param payload the id
         */
        toggleTag: (state, action:{payload:string}) => {
            const index: number = state.findIndex((v)=> v.id === action.payload);
            state[index].selected = !state[index].selected;
        },
        resetTags: (state) => {
            state.forEach((item) => {
                if (item.selected) item.selected = false;
            })
        }
    }
});


export const { addNewTag,  toggleTag, resetTags} = tagSlice.actions;
export const interestTags = (state: RootState) => state.interestTags.values;
export default tagSlice.reducer;