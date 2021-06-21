import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

import jph from "../../../api/JPH";

import { Album, LoadingState } from "../../../lib/types";

export interface AlbumsState {
  status: LoadingState.idle | LoadingState.loading | LoadingState.failed;
  albums: Album[];
  selectedAlbum: Album;
  error: {
    msg: string;
  };
}

const initialState: AlbumsState = {
  albums: [],
  selectedAlbum: undefined,
  status: LoadingState.idle,
  error: {
    msg: null,
  },
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
    [retrieveAlbums.pending]: (state) => {
      state.status = LoadingState.loading;
    },
    //@ts-ignore
    [retrieveAlbums.fulfilled]: (state, { payload }) => {
      state.status = LoadingState.idle;
      state.albums = payload;
    },
    //@ts-ignore
    [retrieveAlbums.rejected]: (state, { error }) => {
      state.status = LoadingState.failed;
      state.error.msg = error.message;
    },
  },
});

export const { addAlbum } = albumsSlice.actions;

export default albumsSlice.reducer;
