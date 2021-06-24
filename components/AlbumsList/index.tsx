import { LoadingState } from "../../lib/types";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  getPhotosByAlbumId,
  setAlbumId,
} from "../../redux/features/photos/photosSlice";

import ErrorBox from "../ErrorBox";

import styles from "./AlbumsList.module.css";

function AlbumsList() {
  const status = useAppSelector((state) => state.albums.status);
  const albums = useAppSelector((state) => state.albums.albums);
  const error = useAppSelector((state) => state.albums.error);
  const dispatch = useAppDispatch();

  const handleClick = (id: number) => {
    if (id) {
      dispatch(setAlbumId(id));
      dispatch(getPhotosByAlbumId());
    }
  };

  if (error.msg !== null) {
    return <ErrorBox msg={error.msg} />;
  }

  return (
    <aside className={styles.wrapper}>
      <ul>
        {status === LoadingState.loading ? (
          <div>Loading...</div>
        ) : (
          albums.map((album) => (
            <li key={album.id} className={styles.listItem}>
              <button onClick={() => handleClick(album.id)}>
                {album.title}
              </button>
            </li>
          ))
        )}
      </ul>
    </aside>
  );
}

export default AlbumsList;
