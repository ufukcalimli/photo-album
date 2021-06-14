import axios from "axios";

import { Photo } from "../../lib/types";

const baseUrl = process.env.NEXT_PUBLIC_PLACEHOLDER_BASEURL;

export async function fetchPhotos() {
  try {
    const { data } = await axios.get<Photo[]>(`${baseUrl}/photos`);
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function fetchPhoto(photoId: number) {
  try {
    const { data } = await axios.get<Photo>(`${baseUrl}/albums/${photoId}`);
    return data;
  } catch (error) {}
}
