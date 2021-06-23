import { SubmitHandler, useForm } from "react-hook-form";

import { useAppDispatch } from "../redux/hooks";
import { addPhoto } from "../redux/features/photos/photosSlice";
import { addAlbum } from "../redux/features/albums/albumsSlice";

import ErrorBox from "./ErrorBox";

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
    data.album.id = albumId;
    data.photo.albumId = albumId;
    dispatch(addAlbum(data.album));
    dispatch(addPhoto(data.photo));
    albumId = null;
  };

  return (
    <div className="pb-4 min-w-full">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-row justify-center">
          <label className="mr-5 flex flex-col">
            <span className="mr-2">Album Title</span>
            <input
              {...register("album.title", { required: true, maxLength: 20 })}
              type="text"
              id="title"
              placeholder="lorem ipsum dolor sit amet"
            />
            {errors.album?.title.type === "required" ? (
              <ErrorBox msg="Album title is required" />
            ) : null}
          </label>
          <label className="mr-5 flex flex-col">
            <span className="mr-2">Image Title</span>
            <input
              {...register("photo.title", { required: true, maxLength: 20 })}
              type="text"
              id="title"
              placeholder="lorem ipsum dolor sit amet"
            />
            {errors.photo?.title.type === "required" ? (
              <ErrorBox msg="Photo title is required" />
            ) : null}
            {errors.photo?.title.type === "maxLength" ? (
              <ErrorBox msg="Photo title can be maximum 20 characters" />
            ) : null}
          </label>
          <label className="mr-5 flex flex-col">
            <span className="mr-2">Image URL</span>
            <input
              {...register("photo.url", { required: true })}
              type="text"
              id="url"
              placeholder="https://www..."
              //   defaultValue="https://pbs.twimg.com/profile_images/949787136030539782/LnRrYf6e.jpg"
            />
            {errors.photo?.url.type === "required" ? (
              <ErrorBox msg="Photo URL is required" />
            ) : null}
          </label>
          <button
            type="submit"
            className="border border-gray-500 px-2 py-0 rounded"
          >
            Save Album
          </button>
        </div>
      </form>
    </div>
  );
}

export default NewItemForm;
