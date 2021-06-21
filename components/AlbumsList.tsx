import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  getPhotosByAlbumId,
  setAlbumId,
} from "../redux/features/photos/photosSlice";

function AlbumsList() {
  const albums = useAppSelector((state) => state.albums.albums);
  const dispatch = useAppDispatch();

  const handleClick = (id: number) => {
    if (id) {
      dispatch(setAlbumId(id));
      dispatch(getPhotosByAlbumId());
    }
  };

  return (
    <aside className="min-h-full max-w-xs flex-none flex mr-4 ">
      <ul>
        {albums.map((album) => (
          <li key={album.id}>
            <button onClick={() => handleClick(album.id)}>{album.title}</button>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default AlbumsList;
