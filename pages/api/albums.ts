import axios from "axios";

import { Album } from "../../lib/types";

const BASE_URL = process.env.NEXT_PUBLIC_PLACEHOLDER_BASEURL;

export default class AlbumAPI {
  static fetchAlbums = async (): Promise<Album[]> => {
    try {
      const { data } = await axios.get<Album[]>(`${BASE_URL}/albums`);
      return data;
    } catch (error) {
      console.log(error);
      return [];
    }
  };
}

export async function fetchAlbum(albumId: number) {
  try {
    const { data } = await axios.get<Album>(`${BASE_URL}/albums/${albumId}`);
    return data;
  } catch (error) {}
}
