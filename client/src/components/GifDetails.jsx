import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { FaTrashAlt } from 'react-icons/fa';
import { GrEdit } from 'react-icons/gr';
import { useGifsContext } from '../hooks/useGifsContext';
import { useAuthContext } from '../hooks/useAuthContext';
import { useState } from 'react';

export const GifDetails = ({ gif }) => {
  const { dispatch } = useGifsContext();
  const { user } = useAuthContext();
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState(null);

  const handleClick = async () => {
    if (!user) {
      return;
    }

    if (window.confirm('Are you sure you want to delete this GIF?')) {
      try {
        setDeleting(true);
        const response = await fetch(
          'http://localhost:3000/api/gifs/' + gif._id,
          {
            method: 'DELETE',
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        console.log(response);
        if (response.ok) {
          dispatch({ type: 'DELETE_GIF', payload: gif._id });
        } else {
          const json = await response.json();
          setError(json.error);
        }
      } catch (error) {
        setError('An error ocurred while deleting the GIF');
      } finally {
        setDeleting(false);
      }
    }
  };

  return (
    <div className='gif-details bg-black mx-auto my-8 p-4 relative rounded-xl '>
      <p className='m-0 text-black'>{gif.category}</p>
      <span className='mt-6 text-black'>
        <img src={gif.img} alt='Gif' />
      </span>
      <p className='text-xs mt-6 text-black'>
        {formatDistanceToNow(new Date(gif.createdAt), { addSuffix: true })}
      </p>
      <div>
        <span className='absolute top-5 right-12 p-1.5 cursor-pointer'>
          <GrEdit />
        </span>
        <span
          className='p-1.5 top-5 right-4 cursor-pointer absolute text-error'
          onClick={handleClick}
        >
          <FaTrashAlt />
        </span>
      </div>
      {deleting && <p className='text-black'>Deleting...</p>}
      {error && <p className='text-red'>{error}</p>}
    </div>
  );
};