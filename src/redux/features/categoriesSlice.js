import { createSlice } from '@reduxjs/toolkit';
import categories from "../../data/categories.json";

const initialState = {
    value: categories
}

export const categoriesSlice = createSlice({
    name: 'cspmWidgetForm',
    initialState,
    reducers: {
        addWidget: (state, action) => {
            const { categoryId, widget } = action.payload;
            const category = state.value.find(cat => cat.id === categoryId);
            if (category) {
                category.widgets.push(widget);
            }
        },
        removeWidget: (state, action) => {
            const { categoryId, widgetId } = action.payload;
            const category = state.value.find(cat => cat.id === categoryId);
            if (category) {
                category.widgets = category.widgets.filter((widget) => widget.id !== widgetId)
            }
        },
        updateCategories: (state, action) => {
            const {categories} = action.payload;
            state.value = categories;
        }
    }
})

export const { addWidget, removeWidget, updateCategories } = categoriesSlice.actions

export default categoriesSlice.reducer

