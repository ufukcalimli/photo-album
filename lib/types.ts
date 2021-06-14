export interface Photo {
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

export interface Album {
  userId: number;
  id: number;
  title: string;
}
