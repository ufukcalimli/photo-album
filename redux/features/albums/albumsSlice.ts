import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

import jph from "../../../api/JPH";

import { Album } from "../../../lib/types";

export interface AlbumsState {
  albums: Album[];
  selectedAlbum: Album;
  status: string;
}

const initialState: AlbumsState = {
  albums: [],
  selectedAlbum: undefined,
  status: "idle",
};

export const retrieveAlbums = createAsyncThunk(
  "albums/retrieveAlbums",
  async (limit: number) => {
    const { data } = await jph.get(`albums?_limit=${limit}`);
    return data;
  }
);

export const albumsSlice = createSlice({
  name: "albumsSlice",
  initialState,
  reducers: {
    addAlbum(state, action: PayloadAction<Album>) {
      const hasValue = state.albums.some(
        (e) => e.title === action.payload.title
      );
      if (!hasValue) {
        state.albums.push(action.payload);
      }
    },
  },
  extraReducers: {
    //@ts-ignore
    [retrieveAlbums.pending]: (state, action) => {
      state.status = "loading";
    },
    //@ts-ignore
    [retrieveAlbums.fulfilled]: (state, { payload }) => {
      state.albums = payload;
      state.status = "idle";
    },
    //@ts-ignore
    [retrieveAlbums.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export const { addAlbum } = albumsSlice.actions;

export default albumsSlice.reducer;
