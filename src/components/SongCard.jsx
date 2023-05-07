import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import Tilt from 'react-parallax-tilt';

import { playPause, setActiveSong } from '../redux/features/playerSlice';
import PlayPause from './PlayPause';

// we are passing a few props from the discover component
const SongCard = ({ song, isPlaying, activeSong, i, data }) => {
  // dispatch allows us to make changes to the
  // pieces/state/slices of 'cake'/Slice we're accessing
  // to access from the global cake/store/state; do something to it
  const dispatch = useDispatch();

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = () => {
    dispatch(setActiveSong({ song, data, i }));
    // .then(() => {
    dispatch(playPause(true));
    // });
  };

  return (
    <Tilt
      className="parallax-effect-glare-scale"
      perspective={500}
      glareEnable={true}
      glareMaxOpacity={0.45}
      // scale={1.02}
      gyroscope={true}
    >
      <div
        className="flex flex-col w-[250px]
  p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm
  animate-slideup rounded-lg cursor-pointer"
      >
        <div className="relative w-full h-56 group">
          <div
            className={`absolute inset-0 
          justify-center items-center bg-black 
          bg-opacity-50 group-hover:flex 
          ${
            activeSong?.title === song.title
              ? 'flex bg-black bg-opacity-70'
              : 'hidden'
          }`}
          >
            <PlayPause
              isPlaying={isPlaying}
              activeSong={activeSong}
              song={song}
              handlePause={handlePauseClick}
              handlePlay={handlePlayClick}
            />
          </div>
          <img alt="song_img" src={song.images?.coverart} />
        </div>
        <div className="mt-4 flex flex-col">
          <p className="font-semibold text-lg text-white truncate">
            <Link to={`/songs/${song?.key}`}>
              {song.title}
            </Link>
          </p>
          <p className="text-sm truncate
          text-gray-300 mt-1"
          >
            <Link to={song.artists
              ? `/artists/${song?.artists[0]?.adamid}`
              : '/top-artists'}
            >
              {song.subtitle}
            </Link>
          </p>
        </div>
      </div>
    </Tilt>
  );
};

export default SongCard;
