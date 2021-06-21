import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

import jph from "../../../api/JPH";

import { Photo } from "../../../lib/types";

export interface PhotosState {
  photos: Photo[];
  selectedAlbumPhotos: Photo[];
  selectedAlbumId: number;
  status: string;
}

const initialState: PhotosState = {
  photos: [],
  selectedAlbumPhotos: [],
  selectedAlbumId: undefined,
  status: "idle",
};

export const retrievePhotos = createAsyncThunk(
  "photos/retrievePhotos",
  async () => {
    const { data } = await jph.get(`photos`);
    return data;
  }
);

export const photosSlice = createSlice({
  name: "photosSlice",
  initialState,
  reducers: {
    setAlbumId(state, action: PayloadAction<number>) {
      state.selectedAlbumId = action.payload;
    },
    getPhotosByAlbumId(state) {
      const albumId = state.selectedAlbumId;
      state.selectedAlbumPhotos = state.photos.filter(
        (p) => p.albumId === albumId
      );
    },
    addPhoto(state, action: PayloadAction<Photo>) {
      state.photos.push(action.payload);
    },
  },
  extraReducers: {
    //@ts-ignore
    [retrievePhotos.pending]: (state) => {
      state.status = "loading";
    },
    //@ts-ignore
    [retrievePhotos.fulfilled]: (state, { payload }) => {
      state.photos.push(...payload);
      state.status = "idle";
    },
    //@ts-ignore
    [retrievePhotos.rejected]: (state) => {
      state.status = "failed";
    },
  },
});

export const { setAlbumId, addPhoto, getPhotosByAlbumId } = photosSlice.actions;

export default photosSlice.reducer;
