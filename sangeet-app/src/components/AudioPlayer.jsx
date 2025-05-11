// import { useState, useRef, useEffect } from "react";
// import { Play, Pause, Volume2, VolumeX } from "lucide-react";
// import { useUser } from "../context/UserContext";
// import axios from "axios";

// const AudioPlayer = ({ audioUrl,songId, onEnd }) => {
//   const {user} = useUser();
  
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [progress, setProgress] = useState(0);
//   const [volume, setVolume] = useState(1);
//   const [isMuted, setIsMuted] = useState(false);
//   const [duration, setDuration] = useState(0);
//   const audioRef = useRef(null);

//   useEffect(() => {
//     if (audioRef.current) {
//       audioRef.current.src = audioUrl;
//       audioRef.current.load();
//       audioRef.current.play(); // Auto-play when song changes
//       setIsPlaying(true);
//     }
//     if (user && user.id) {
//       trackListeningHistory();
//   }

//   // Add event listener for song end
//   audioRef.current.addEventListener('ended', handleEnd);

//   // Cleanup
//   return () => {
//       audioRef.current.pause();
//       audioRef.current.removeEventListener('ended', handleEnd);
//   };
//   }, [audioUrl]);

//   const handleLoadedMetadata = () => {
//     setDuration(audioRef.current.duration || 0);
//   };

//   const togglePlayPause = () => {
//     if (audioRef.current) {
//       if (isPlaying) {
//         audioRef.current.pause();
//       } else {
//         audioRef.current.play();
//       }
//       setIsPlaying(!isPlaying);
//     }
//   };

//   const updateProgress = () => {
//     if (audioRef.current) {
//       const progressPercent =
//         (audioRef.current.currentTime / audioRef.current.duration) * 100;
//       setProgress(progressPercent || 0);
//     }
//   };

//   const handleSeek = (e) => {
//     if (audioRef.current) {
//       const seekTime = (e.target.value / 100) * duration;
//       audioRef.current.currentTime = seekTime;
//       setProgress(parseFloat(e.target.value));
//     }
//   };

//   const handleVolumeChange = (e) => {
//     if (audioRef.current) {
//       const newVolume = parseFloat(e.target.value);
//       audioRef.current.volume = newVolume;
//       setVolume(newVolume);
//       setIsMuted(newVolume === 0);
//     }
//   };

//   const toggleMute = () => {
//     if (audioRef.current) {
//       audioRef.current.muted = !isMuted;
//       setIsMuted(!isMuted);
//     }
//   };

//   const formatTime = (time) => {
//     if (!time) return "0:00";
//     const minutes = Math.floor(time / 60);
//     const seconds = Math.floor(time % 60);
//     return `${minutes}:${seconds.toString().padStart(2, "0")}`;
//   };

//   const handleEnd = () => {
//     setIsPlaying(false);
//     if (onEnd) {
//       onEnd(); // Notify parent to play next song
//     }
//   };

//   const trackListeningHistory = async () => {
//     try {
//         await axios.post(
//             'http://localhost/music-app/sangeet-backend/listening_history.php', 
//             { 
//                 user_id: user.id, 
//                 song_id: songId 
//             },
//             { 
//                 headers: { 'Content-Type': 'application/json' } 
//             }
//         );
//     } catch (error) {
//         console.error('Failed to track listening history', error);
//     }
// };

//   return (
//     <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-[#8E44AD] text-white rounded-full shadow-2xl z-50 w-[90%] max-w-xl">
//       {/* <p className="text-center font-bold">{songName}</p> */}
//       <audio
//         ref={audioRef}
//         onTimeUpdate={updateProgress}
//         onLoadedMetadata={handleLoadedMetadata}
//         onEnded={handleEnd} // Call when song ends
//       />

//       <div className="flex items-center p-2 space-x-4">
//         <button
//           onClick={togglePlayPause}
//           className="bg-white text-[#8E44AD] p-2 rounded-full"
//         >
//           {isPlaying ? <Pause size={20} /> : <Play size={20} />}
//         </button>

//         <input
//           type="range"
//           min="0"
//           max="100"
//           value={progress}
//           onChange={handleSeek}
//           className="flex-grow h-1 bg-white/30 rounded-full cursor-pointer"
//         />

//         <div className="flex items-center space-x-2">
//           <button
//             onClick={toggleMute}
//             className="text-white hover:text-gray-200"
//           >
//             {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
//           </button>
//           <input
//             type="range"
//             min="0"
//             max="1"
//             step="0.1"
//             value={volume}
//             onChange={handleVolumeChange}
//             className="w-24 h-1 bg-white/30 rounded-full cursor-pointer"
//           />
//         </div>

//         <div className="text-sm">
//           <span>{formatTime(audioRef.current?.currentTime)}</span>
//           <span className="mx-1">/</span>
//           <span>{formatTime(duration)}</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AudioPlayer;


import { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import { useUser } from "../context/UserContext";
import axios from "axios";

const AudioPlayer = ({ audioUrl, songId,genreId, onEnd }) => {
  const { user } = useUser();

  const audioRef = useRef(null); // Properly use useRef for the audio element
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;

    if (audio) {
      audio.src = audioUrl;
      audio.load();
      audio.play();
      setIsPlaying(true);

      // Add event listeners
      audio.addEventListener("timeupdate", updateProgress);
      audio.addEventListener("loadedmetadata", handleLoadedMetadata);
      audio.addEventListener("ended", handleEnd);
    }

    if (user && user.id) {
      trackListeningHistory();
    }

    // Cleanup function
    return () => {
      if (audio) {
        audio.pause();
        audio.removeEventListener("timeupdate", updateProgress);
        audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
        audio.removeEventListener("ended", handleEnd);
      }
    };
  }, [audioUrl]);

  const handleLoadedMetadata = () => {
    const audio = audioRef.current;
    if (audio) {
      setDuration(audio.duration || 0);
    }
  };

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (audio) {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const updateProgress = () => {
    const audio = audioRef.current;
    if (audio) {
      const progressPercent = (audio.currentTime / audio.duration) * 100;
      setProgress(progressPercent || 0);
    }
  };

  const handleSeek = (e) => {
    const audio = audioRef.current;
    if (audio) {
      const seekTime = (e.target.value / 100) * duration;
      audio.currentTime = seekTime;
      setProgress(parseFloat(e.target.value));
    }
  };

  const handleVolumeChange = (e) => {
    const audio = audioRef.current;
    if (audio) {
      const newVolume = parseFloat(e.target.value);
      audio.volume = newVolume;
      setVolume(newVolume);
      setIsMuted(newVolume === 0);
    }
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const formatTime = (time) => {
    if (!time) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const handleEnd = () => {
    setIsPlaying(false);
    if (onEnd) {
      onEnd(); // Notify parent to play the next song
    }
  };

  const trackListeningHistory = async () => {
    try {
      await axios.post(
        "http://localhost/music-app/sangeet-backend/listening_history.php",
        {
          user_id: user.id,
          song_id: songId,
          genre_id: genreId,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
    } catch (error) {
      console.error("Failed to track listening history", error);
    }
  };

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-[#8E44AD] text-white rounded-full shadow-2xl z-50 w-[90%] max-w-xl">
      <audio ref={audioRef} />

      <div className="flex items-center p-2 space-x-4">
        <button
          onClick={togglePlayPause}
          className="bg-white text-[#8E44AD] p-2 rounded-full"
        >
          {isPlaying ? <Pause size={20} /> : <Play size={20} />}
        </button>

        <input
          type="range"
          min="0"
          max="100"
          value={progress}
          onChange={handleSeek}
          className="flex-grow h-1 bg-white/30 rounded-full cursor-pointer"
        />

        <div className="flex items-center space-x-2">
          <button
            onClick={toggleMute}
            className="text-white hover:text-gray-200"
          >
            {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={handleVolumeChange}
            className="w-24 h-1 bg-white/30 rounded-full cursor-pointer"
          />
        </div>

        <div className="text-sm">
          <span>{formatTime(audioRef.current?.currentTime)}</span>
          <span className="mx-1">/</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;