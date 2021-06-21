import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { addPhoto, retrievePhotos } from "../redux/features/photos/photosSlice";
import { addAlbum } from "../redux/features/albums/albumsSlice";

type Inputs = {
  album: {
    title: string;
    id: number;
  };
  photo: {
    title: string;
    url: string;
    albumId: number;
  };
};

function NewItemForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    let albumId = Math.floor(Math.random() * 100);
    // dispatch(retrievePhotos(albumId));
    data.album.id = albumId;
    data.photo.albumId = albumId;
    dispatch(addAlbum(data.album));
    dispatch(addPhoto(data.photo));
    albumId = null;
  };

  return (
    <div className="p-4 min-w-full">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-wrap">
          <label className="mb-5">
            <span className="mr-2">Album Title</span>
            <input
              {...register("album.title", { required: true, maxLength: 20 })}
              type="text"
              id="title"
              placeholder="lorem ipsum dolor sit amet"
            />
          </label>
          <label className="mb-5">
            <span className="mr-2">Image Title</span>
            <input
              {...register("photo.title", { required: true, maxLength: 20 })}
              type="text"
              id="title"
              placeholder="lorem ipsum dolor sit amet"
            />
          </label>
          <label className="mb-5">
            <span className="mr-2">Image URL</span>
            <input
              {...register("photo.url", { required: true })}
              type="text"
              id="url"
              placeholder="https://www..."
              //   defaultValue="https://pbs.twimg.com/profile_images/949787136030539782/LnRrYf6e.jpg"
            />
          </label>
        </div>
        <button type="submit" className="border border-gray-500 p-2 rounded">
          Save Album
        </button>
      </form>
    </div>
  );
}

export default NewItemForm;
