import { useEffect } from "react";
import Head from "next/head";

import { useAppDispatch } from "../redux/hooks";
import { retrievePhotos } from "../redux/features/photos/photosSlice";
import { retrieveAlbums } from "../redux/features/albums/albumsSlice";

import PageTitle from "../components/PageTitle";
import AlbumsList from "../components/AlbumsList";
import Photos from "../components/Photos";
import NewItemForm from "../components/NewItemForm";

function Home() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(retrieveAlbums(5)); // limit: 5
    dispatch(retrievePhotos());
  }, []);

  return (
    <div>
      <Head>
        <title>Photo Album</title>
        <meta
          name="description"
          content="Photo album application by using NextJS, Redux Toolkit and TailwindCSS"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <PageTitle />
      <main className="container min-w-full">
        <NewItemForm />
        <div className="container grid grid-cols-2 gap-4 min-w-full">
          <AlbumsList />
          <Photos />
        </div>
      </main>
    </div>
  );
}

export default Home;
