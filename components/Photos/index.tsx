import { useEffect } from "react";
import Image from "next/image";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getPhotosByAlbumId } from "../../redux/features/photos/photosSlice";
import { LoadingState } from "../../lib/types";

import ErrorBox from "../ErrorBox";

import styles from "./Photos.module.css";

function Photos() {
  const status = useAppSelector((state) => state.photos.status);
  const error = useAppSelector((state) => state.photos.error);
  const selectedAlbumPhotos = useAppSelector(
    (state) => state.photos.selectedAlbumPhotos
  );
  const albumId = useAppSelector((state) => state.photos.selectedAlbumId);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getPhotosByAlbumId());
  }, [albumId]);

  if (error.msg !== null) {
    return <ErrorBox msg={error.msg} />;
  }

  return (
    <div className={styles.wrapper}>
      {status === LoadingState.loading ? (
        <div>Loading...</div>
      ) : (
        selectedAlbumPhotos.map((p) => (
          <div key={p.id} className={styles.itemWrapper}>
            <div className={styles.photoWrapper}>
              <Image src={p.url} layout="fill" />
            </div>
            <p className={styles.title}>{p.title}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default Photos;
