import { useEffect } from "react";
import Image from "next/image";

import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { getPhotosByAlbumId } from "../redux/features/photos/photosSlice";

function Photos() {
  const selectedAlbumPhotos = useAppSelector(
    (state) => state.photos.selectedAlbumPhotos
  );
  const albumId = useAppSelector((state) => state.photos.selectedAlbumId);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getPhotosByAlbumId());
  }, [albumId]);

  return (
    <div className="w-100 pl-4">
      {selectedAlbumPhotos.map((p) => (
        <div key={p.id} className="w-50 flex flex-wrap pl-4 mb-4">
          <div className="h-64 w-96 mr-6 relative">
            <Image src={p.url} layout="fill" />
          </div>
          {p.title}
        </div>
      ))}
    </div>
  );
}

export default Photos;
