import {createSlice} from '@reduxjs/toolkit';

const cardSlice = createSlice({
    name: 'card',
    initialState: {
        items: []
    },
    reducers: {
        addItem: (state, action) => {
            state.items.push(action.payload)
            console.log(action.payload)
        },
        removeItem: (state, action) => {
            state.items.splice(action.payload, 1);
            console.log(action.payload)
        }
    }
});

export const {addItem, removeItem} = cardSlice.actions;
export default cardSlice.reducer;