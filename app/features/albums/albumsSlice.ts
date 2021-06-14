import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Album } from "../../../lib/types";
import { RootState } from "../../store";

export interface AlbumsState {
  albums: Album[];
  status: string;
}

const initialState: AlbumsState = {
  albums: [],
  status: "idle",
};

const BASE_URL = process.env.NEXT_PUBLIC_PLACEHOLDER_BASEURL;

export const retrieveAlbums = createAsyncThunk(
  "albums/retrieveAlbums",
  async () => {
    return fetch(`${BASE_URL}/albums`).then((res) => res.json());
  }
);

export const albumsSlice = createSlice({
  name: "albumsSlice",
  initialState,
  reducers: {},
  extraReducers: {
    //@ts-ignore
    [retrieveAlbums.pending]: (state, action) => {
      state.status = "loading";
    },
    //@ts-ignore
    [retrieveAlbums.fulfilled]: (state, { payload }) => {
      // Todo: check if payload has albums array, find out where to put them
      state.albums = payload;
      state.status = "idle";
    },
    //@ts-ignore
    [retrieveAlbums.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export const selectAlbum = (state: RootState) => state.albums;

export default albumsSlice.reducer;
