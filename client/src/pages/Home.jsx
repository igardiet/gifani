import { useEffect, useState } from 'react';
import { useGifsContext, useAuthContext } from '../hooks';
import { GifDetails, AddGifModal } from '../components';

export const Home = () => {
  const { gifs, fetchGifs } = useGifsContext();
  const { user } = useAuthContext();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchGifs();
  }, [user]);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {user && (
        <button className='btn btn-danger' onClick={handleModalOpen}>
          Add Gif
        </button>
      )}
      {isModalOpen && <AddGifModal onClose={handleModalClose} />}
      <div className='grid gap-10 grid-cols-4'>
        {gifs && gifs.map((gif) => <GifDetails key={gif._id} gif={gif} />)}
      </div>
    </>
  );
};
