import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

import jph from "../../../api/JPH";

import { LoadingState, Photo } from "../../../lib/types";

export interface PhotosState {
  status: LoadingState.idle | LoadingState.loading | LoadingState.failed;
  photos: Photo[];
  selectedAlbumPhotos: Photo[];
  selectedAlbumId: number;
  error: {
    msg: string;
  };
}

const initialState: PhotosState = {
  photos: [],
  selectedAlbumPhotos: [],
  selectedAlbumId: undefined,
  status: LoadingState.idle,
  error: {
    msg: undefined,
  },
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
      state.photos.unshift(action.payload);
    },
  },
  extraReducers: {
    //@ts-ignore
    [retrievePhotos.pending]: (state) => {
      state.status = LoadingState.loading;
    },
    //@ts-ignore
    [retrievePhotos.fulfilled]: (state, { payload }) => {
      state.status = LoadingState.idle;
      state.photos.push(...payload);
    },
    //@ts-ignore
    [retrievePhotos.rejected]: (state, { error }) => {
      state.status = LoadingState.failed;
      state.error.msg = error.message;
    },
  },
});

export const { setAlbumId, addPhoto, getPhotosByAlbumId } = photosSlice.actions;

export default photosSlice.reducer;
