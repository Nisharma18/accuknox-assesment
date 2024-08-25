import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: ""
}

export const searchSlice = createSlice({
    name: 'cspmWidgetForm',
    initialState,
    reducers: {
        updateSearchValue: (state, action) => {
            const {value} = action.payload;
            state.value = value;
        }
    }
})

export const { updateSearchValue } = searchSlice.actions

export default searchSlice.reducer