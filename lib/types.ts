export interface Photo {
  albumId: number;
  id?: number;
  title: string;
  url: string;
}

export interface Album {
  userId?: number;
  id: number;
  title: string;
}
