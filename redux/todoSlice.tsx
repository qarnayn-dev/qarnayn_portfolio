import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';

interface iTodo{
    id: 1, title: 'todo1', completed: false
}

export const todoSlice = createSlice({
	name: 'todos',
	initialState: [
		{ id: '1', title: 'todo1', completed: false },
		{ id: '2', title: 'todo2', completed: false },
		{ id: '3', title: 'todo3', completed: true },
		{ id: '4', title: 'todo4', completed: false },
		{ id: '5', title: 'todo5', completed: false },
	],
	reducers: {
		addTodo: (state, action) => {
			const todo = {
				id: (new Date()).toDateString(),
				title: action.payload.title,
				completed: false,
			};
			state.push(todo);
		},
    },

});


export const { addTodo } = todoSlice.actions;
// Other code such as selectors can use the imported `RootState` type
export const todo = (state: RootState) => state.todos.values;
export default todoSlice.reducer;