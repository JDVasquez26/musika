import { FaPauseCircle, FaPlayCircle } from 'react-icons/fa';

const PlayPause = ({ isPlaying, activeSong, song,
  // if we are playing & the active song title is
  // the same as the current list song title, then we want to show pauseIcon else show playIcon
  handlePause, handlePlay }) => (isPlaying && activeSong?.title === song.title ? (
    <FaPauseCircle size={35} className="text-gray-300" onClick={handlePause} />)
  : (
    <FaPlayCircle size={35} className="text-gray-300" onClick={handlePlay} />
  ));

export default PlayPause;
