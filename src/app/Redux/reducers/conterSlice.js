import { createSlice } from '@reduxjs/toolkit';

export const counterSlice = createSlice({
    name: 'counter',
    initialState: {
        count: 0
    },
    reducers: 
    {
        increment: (state, action) => {
            state.count = state.count + 1;
            console.log(state.count);
        },
        decrement: (state, action) => {
            state.count -= 1;
        },
        setCount: (state, action) => {
            state.count = action.payload;
        },
    }
});
export const { increment, decrement, setCount } = counterSlice.actions;
export default counterSlice.reducer;