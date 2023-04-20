import { useSelector, useDispatch } from 'react-redux';
import { Error, Loader, SongCard } from '../components';
import { useGetSongsByGenreQuery } from '../redux/services/shazamCore';
// coming from player to change the genres
import { selectGenreListId } from '../redux/features/playerSlice';
import { genres } from '../assets/constants';

// this component handles the global state of are we showing
// Here we will handle the music player functinality/slice and the Shazam core functionality/slice
// the player, are we playing or not playing... and the fetching of the different data endpoints
const Discover = () => {
  // dispatch(modifies) --> dispatches an action to the store.. --> reducer --> updates the store --> useSelector(we fetch) --> updates the component
  const dispatch = useDispatch();

  // useSelector is globally accessing all the states from
  // the store, here we are accessing the player state from the playerSlice,
  // and getting the state of the activeSong, and isPlaying in the playerSlice
  const { activeSong, isPlaying, genreListId } = useSelector((state) => state.player);

  // calling useGetTopChartsQuery as a hook, we get three things back:
  // we get the data from the api,
  // isFetching property that allows us to know if we are currently fetch,
  // and error for if an error has happenend
  const { data, isFetching, error } = useGetSongsByGenreQuery(genreListId || 'POP');

  // if it's loading, render the loader componer, passing a title(aka, a prop string)
  if (isFetching) return <Loader title="Loading songs..." />;
  // if there's an error, render the error componer
  if (error) return <Error />;

  // DYNAMIC title - destructure the value of the genreId, and  check if the value is equal to the genre list id, we get the title once we find the one that matches
  const genreTitle = genres.find(({ value }) => value === genreListId)?.title;

  return (
    <div className="flex flex-col">
      {/* Tailwind for small devices have flex-row flex col with margin top and bottom */}
      <div
        className="w-full flex justify-between items-center
            sm:flex-row flex-col mt-4 mb-10"
      >
        <h2 className="font-bold text-3x1 text-white text-left">
          Discover {genreTitle}
        </h2>
        <select
          onChange={(e) => dispatch(selectGenreListId(e.target.value))}
          value={genreListId || 'pop'} // coming from the player state or default to pop
          className="bg-black text-gray-300 p-3 text-sm
        rounded-lg outline-none sm:mt-0 mt-5"
        >
          {genres.map((genre) => (
            <option key={genre.value} value={genre.value}>
              {genre.title}
            </option>
          ))}
        </select>
      </div>

      {/* Wrapper for songs fetched from API*/}
      <div
        className="flex flex-wrap sm:justify-start
      justify-center gap-8"
      >
        {data?.map((song, i) => ( // song and index
          <SongCard
            key={song.key} // ex: key:"648809694"
            song={song} // specific item/arr in the data
            i={i}
            isPlaying={isPlaying} // coming from music player
            activeSong={activeSong} // coming from music player
            data={data} // entire array of objs to be used for when need it later on
          />
        ))}
      </div>
    </div>
  );
};

export default Discover;
