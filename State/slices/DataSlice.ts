import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  highlights: [],
  catergories: [],
};

export const DataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    getHighlights: (state, action) => {
      state.highlights = [].concat(action.payload);
    },
    getCatergories: (state, action) => {
      state.catergories = [].concat(action.payload);
    },
  },
});

export const highlightsData = (state: any) => state.data.highlights;

export const catergoriesData = (state: any) => state.data.catergories;

export const {getHighlights, getCatergories} = DataSlice.actions;
