// // import { useEffect, useState } from "react";
// // import AudioPlayer from "./AudioPlayer";
// // import { Play } from "lucide-react";
// // import Axios from "axios";

// // const HomeLeft = () => {
// //   //   const songs = [
// //   //     {
// //   //       id: 1,
// //   //       song_name: "Song 1",
// //   //       artist: "Artist 1",
// //   //       image_url: "/images/1.png",
// //   //       song_url: "/songs/1.mp3",
// //   //     },
// //   //     {
// //   //       id: 2,
// //   //       song_name: "Song 2",
// //   //       artist: "Artist 2",
// //   //       image_url: "/images/2.png",
// //   //       song_url: "/songs/2.mp3",
// //   //     },
// //   //   ];
// //   const [songs, setSongs] = useState([]);
// //   const [currentSongIndex, setCurrentSongIndex] = useState(null);
// //   const [location, setLocation] = useState(null);

// //   useEffect(() => {
// //     if (navigator.geolocation) {
// //       navigator.geolocation.getCurrentPosition((position) => {
// //         const { latitude, longitude } = position.coords;
// //         setLocation({ latitude, longitude });
// //       });
// //     }
// //   }, []);

// //   useEffect(() => {
// //     if (location) {
// //       console.log(
// //         "Latitude:",
// //         location.latitude,
// //         "Longitude:",
// //         location.longitude
// //       );
// //       Axios.get(
// //         `http://localhost/music-app/sangeet-backend/get_approved_songs.php?latitude=${location.latitude}&longitude=${location.longitude}`
// //       )
// //         .then((response) => {
// //           setSongs(response.data.songs || []);
// //         })
// //         .catch((error) => {
// //           console.error("Error fetching songs:", error);
// //         });
// //     }
// //   }, [location]);
// //   // useEffect(() => {
// //   //   Axios.get(
// //   //     "http://localhost/music-app/sangeet-backend/get_approved_songs.php"
// //   //   )
// //   //     .then((response) => {
// //   //       setSongs(response.data.songs || []);
// //   //     })
// //   //     .catch((error) => {
// //   //       console.error("Error fetching songs:", error);
// //   //     });
// //   // }, []);

// //   const handleSongSelect = (index) => {
// //     setCurrentSongIndex(index);
// //   };

// //   const playNextSong = () => {
// //     if (currentSongIndex !== null) {
// //       const nextIndex = (currentSongIndex + 1) % songs.length; // Loop back to the first song
// //       setCurrentSongIndex(nextIndex);
// //     }
// //   };

// //   return (
// //     <div className=" p-8 w-full">
// //       <div className="flex justify-between items-center w-full">
// //       <h2 className="text-3xl font-bold text-[#8E44AD] mb-6">Trending Songs</h2>

// //       {/* <div className=" flex-grow mx-4 flex justify-center"> */}
// //         <input type="text" placeholder="Search" className="w-half max-w-md py-3 px-4 rounded-full border border-[#95A5A6] focus:outline-none focus:ring-2 focus:ring-[#8E44AD]"/>
// //       {/* </div> */}
// //       </div>
// //       <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
// //         {songs.map((song, index) => (
// //           <div
// //             key={song.id}
// //             onClick={() => handleSongSelect(index)}
// //             className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer overflow-hidden"
// //           >
// //             <div className="relative">
// //               <img
// //                 src={song.image_url || "https://via.placeholder.com/300"}
// //                 alt="Album Art"
// //                 className="w-full h-48 object-cover"
// //               />
// //               <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
// //                 <Play className="text-white w-12 h-12" />
// //               </div>
// //             </div>
// //             <div className="p-4">
// //               <h3 className="font-bold text-lg text-gray-800 truncate">
// //                 {song.song_name}
// //               </h3>
// //               <p className="text-gray-500 text-sm truncate">{song.artist}</p>
// //             </div>
// //           </div>
// //         ))}
// //       </div>

// //       {/* Audio Player */}
// //       {currentSongIndex !== null && (
// //         <div className="fixed bottom-0 left-0 w-full bg-white shadow-2xl z-50">
// //           <div className="container mx-auto px-4 py-4">
// //             <AudioPlayer
// //               audioUrl={songs[currentSongIndex].song_url}
// //               onEnd={playNextSong} // Trigger next song when current ends
// //             />
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default HomeLeft;

// // import { useEffect, useState } from "react";
// // import AudioPlayer from "./AudioPlayer";
// // import { Play } from "lucide-react";
// // import Axios from "axios";
// // import { useDebounce } from "use-debounce";

// // const HomeLeft = () => {
// //   const [songs, setSongs] = useState([]);
// //   const [currentSongIndex, setCurrentSongIndex] = useState(null);
// //   const [location, setLocation] = useState(null);
// //   const [searchTerm, setSearchTerm] = useState("");
// //   const [debouncedSearchTerm] = useDebounce(searchTerm, 500); // Debounce the search term by 500ms

// //   useEffect(() => {
// //     if (navigator.geolocation) {
// //       navigator.geolocation.getCurrentPosition((position) => {
// //         const { latitude, longitude } = position.coords;
// //         setLocation({ latitude, longitude });
// //       });
// //     }
// //   }, []);

// //   useEffect(() => {
// //     if (location) {
// //       console.log(
// //         "Latitude:",
// //         location.latitude,
// //         "Longitude:",
// //         location.longitude
// //       );
// //       fetchSongs();
// //     }
// //   }, [location, debouncedSearchTerm]);

// //   const fetchSongs = () => {
// //     const searchQuery = debouncedSearchTerm
// //       ? `&search=${encodeURIComponent(debouncedSearchTerm)}`
// //       : "";
// //     Axios.get(
// //       `http://localhost/music-app/sangeet-backend/get_approved_songs.php?latitude=${location.latitude}&longitude=${location.longitude}${searchQuery}`
// //     )
// //       .then((response) => {
// //         setSongs(response.data.songs || []);
// //       })
// //       .catch((error) => {
// //         console.error("Error fetching songs:", error);
// //       });
// //   };

// //   const handleSongSelect = (index) => {
// //     setCurrentSongIndex(index);
// //   };

// //   const playNextSong = () => {
// //     if (currentSongIndex !== null) {
// //       const nextIndex = (currentSongIndex + 1) % songs.length; // Loop back to the first song
// //       setCurrentSongIndex(nextIndex);
// //     }
// //   };

// //   return (
// //     <div className="p-8 w-full" > 
// //       <div className="flex justify-between items-center">
// //         <h2 className="text-3xl font-bold text-[#8E44AD] mb-6">Trending Songs</h2>
// //         <input
// //           type="text"
// //           placeholder="Search"
// //           className="w-half max-w-md py-3 px-4 rounded-full border border-[#95A5A6] focus:outline-none focus:ring-2 focus:ring-[#8E44AD]"
// //           value={searchTerm}
// //           onChange={(e) => setSearchTerm(e.target.value)} // Update search term on input change
// //         />
// //       </div>

// //       <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
// //         {songs.map((song, index) => (
// //           <div
// //             key={song.id}
// //             onClick={() => handleSongSelect(index)}
// //             className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer overflow-hidden"
// //           >
// //             <div className="relative">
// //               <img
// //                 src={song.image_url || "https://via.placeholder.com/300"}
// //                 alt="Album Art"
// //                 className="w-full h-48 object-cover"
// //               />
// //               <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
// //                 <Play className="text-white w-12 h-12" />
// //               </div>
// //             </div>
// //             <div className="p-4">
// //               <h3 className="font-bold text-lg text-gray-800 truncate">
// //                 {song.song_name}
// //               </h3>
// //               <p className="text-gray-500 text-sm truncate">{song.artist}</p>
// //             </div>
// //           </div>
// //         ))}
// //       </div>

// //       {/* Audio Player */}
// //       {currentSongIndex !== null && (
// //         <div className="fixed bottom-0 left-0 w-full bg-white shadow-2xl z-50">
// //           <div className="container mx-auto px-4 py-4">
// //             <AudioPlayer
              
// //               songName={songs[currentSongIndex].song_name}
// //               audioUrl={songs[currentSongIndex].song_url}
// //               onEnd={playNextSong} // Trigger next song when current ends
// //             />
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default HomeLeft;

// import { useEffect, useState } from "react";
// import AudioPlayer from "./AudioPlayer";
// import { Play } from "lucide-react";
// import Axios from "axios";
// import { useDebounce } from "use-debounce";
// // import { useUser } from "./UserContext"; // Assuming you have a user 
// import {useUser} from "../context/UserContext";

// const HomeLeft = () => {
//   const { user } = useUser();
//   const [activeTab, setActiveTab] = useState('home');
//   const [songs, setSongs] = useState([]);
//   const [recommendations, setRecommendations] = useState([]);
//   const [currentSongIndex, setCurrentSongIndex] = useState(null);
//   const [location, setLocation] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [debouncedSearchTerm] = useDebounce(searchTerm, 500);

//   useEffect(() => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition((position) => {
//         const { latitude, longitude } = position.coords;
//         setLocation({ latitude, longitude });
//       });
//     }
//   }, []);

//   useEffect(() => {
//     if (location) {
//       fetchSongs();
//     }
//   }, [location, debouncedSearchTerm]);

//   useEffect(() => {
//     if (user && user.id && activeTab === 'recommendations') {
//       fetchRecommendations();
//     }
//   }, [user, activeTab]);

//   const fetchSongs = () => {
//     const searchQuery = debouncedSearchTerm
//       ? `&search=${encodeURIComponent(debouncedSearchTerm)}`
//       : "";
//     Axios.get(
//       `http://localhost/music-app/sangeet-backend/get_approved_songs.php?latitude=${location.latitude}&longitude=${location.longitude}${searchQuery}`
//     )
//       .then((response) => {
//         setSongs(response.data.songs || []);
//       })
//       .catch((error) => {
//         console.error("Error fetching songs:", error);
//       });
//   };

//   const fetchRecommendations = () => {
//     Axios.get(
//       'http://localhost/music-app/sangeet-backend/get_recommended_songs.php',
//       { user_id: user.id },
//       { 
//         headers: { 'Content-Type': 'application/json' },
//         withCredentials: true 
//       }
//     )
//     .then((response) => {
//       if (response.data.status === 'success') {
//         setRecommendations(response.data.recommendations || []);
//       }
//     })
//     .catch((error) => {
//       console.error("Error fetching recommendations:", error);
//     });
//   };

//   const handleSongSelect = (index, songList) => {
//     setCurrentSongIndex(index);
//   };

//   const playNextSong = () => {
//     const currentList = activeTab === 'home' ? songs : recommendations;
//     if (currentSongIndex !== null) {
//       const nextIndex = (currentSongIndex + 1) % currentList.length;
//       setCurrentSongIndex(nextIndex);
//     }
//   };

//   const renderSongGrid = (songList) => (
//     <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//       {songList.map((song, index) => (
//         <div
//           key={song.id}
//           onClick={() => handleSongSelect(index, songList)}
//           className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer overflow-hidden"
//         >
//           <div className="relative">
//             <img
//               src={song.image_url || "https://via.placeholder.com/300"}
//               alt="Album Art"
//               className="w-full h-48 object-cover"
//             />
//             <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
//               <Play className="text-white w-12 h-12" />
//             </div>
//           </div>
//           <div className="p-4">
//             <h3 className="font-bold text-lg text-gray-800 truncate">
//               {song.song_name}
//             </h3>
//             <p className="text-gray-500 text-sm truncate">{song.artist}</p>
//           </div>
//         </div>
//       ))}
//     </div>
//   );

//   return (
//     <div className="p-8 w-full">
//       {/* Tab Navigation */}
//       <div className="flex mb-6">
//         <button
//           onClick={() => setActiveTab('home')}
//           className={`mr-4 px-4 py-2 rounded ${
//             activeTab === 'home' 
//               ? 'bg-[#8E44AD] text-white' 
//               : 'bg-gray-200 text-gray-700'
//           }`}
//         >
//           Home
//         </button>
//         <button
//           onClick={() => setActiveTab('recommendations')}
//           className={`px-4 py-2 rounded ${
//             activeTab === 'recommendations' 
//               ? 'bg-[#8E44AD] text-white' 
//               : 'bg-gray-200 text-gray-700'
//           }`}
//         >
//           Recommendations
//         </button>
//       </div>

//       {/* Search Input (only for Home tab) */}
//       {activeTab === 'home' && (
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-3xl font-bold text-[#8E44AD]">Trending Songs</h2>
//           <input
//             type="text"
//             placeholder="Search"
//             className="w-half max-w-md py-3 px-4 rounded-full border border-[#95A5A6] focus:outline-none focus:ring-2 focus:ring-[#8E44AD]"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </div>
//       )}

//       {/* Content based on active tab */}
//       {activeTab === 'home' 
//         ? renderSongGrid(songs)
//         : renderSongGrid(recommendations)
//       }

//       {/* Audio Player */}
//       {currentSongIndex !== null && (
//         <div className="fixed bottom-0 left-0 w-full bg-white shadow-2xl z-50">
//           <div className="container mx-auto px-4 py-4">
//             <AudioPlayer
//               songName={
//                 activeTab === 'home' 
//                   ? songs[currentSongIndex].song_name 
//                   : recommendations[currentSongIndex].song_name
//               }
//               audioUrl={
//                 activeTab === 'home' 
//                   ? songs[currentSongIndex].song_url 
//                   : recommendations[currentSongIndex].song_url
//               }
//               onEnd={playNextSong}
//               songId={activeTab === 'home' 
//                 ? songs[currentSongIndex].id 
//                 : recommendations[currentSongIndex].id}
//                 genreId={activeTab === 'home' 
//                   ? songs[currentSongIndex].genre_id 
//                   : recommendations[currentSongIndex].genre_id}
//             />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default HomeLeft;

import { useEffect, useState } from "react";
import AudioPlayer from "./AudioPlayer";
import { Play } from "lucide-react";
import Axios from "axios";
import { useDebounce } from "use-debounce";
// import { useUser } from "./UserContext"; // Assuming you have a user
import { useUser } from "../context/UserContext";

const HomeLeft = () => {
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState("home");
  const [songs, setSongs] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [currentSongIndex, setCurrentSongIndex] = useState(null);
  const [location, setLocation] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);

  const setActiveTabSafely = (tab) => {
    setActiveTab(tab);
    setCurrentSongIndex(null); // Reset current song index when switching tabs
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
      });
    }
  }, []);

  useEffect(() => {
    if (location) {
      fetchSongs();
    }
  }, [location, debouncedSearchTerm]);

  useEffect(() => {
    console.log("User:", user);
    console.log("Active Tab:", activeTab);
    if (user && user.id && activeTab === "recommendations") {
      fetchRecommendations();
    }
  }, [user, activeTab]);
  

  const fetchSongs = () => {
    const searchQuery = debouncedSearchTerm
      ? `&search=${encodeURIComponent(debouncedSearchTerm)}`
      : "";
    Axios.get(
      `http://localhost/music-app/sangeet-backend/get_approved_songs.php?latitude=${location.latitude}&longitude=${location.longitude}${searchQuery}`
    )
      .then((response) => {
        setSongs(response.data.songs || []);
      })
      .catch((error) => {
        console.error("Error fetching songs:", error);
      });
  };

  const fetchRecommendations = () => {
    Axios.get(
      `http://localhost/music-app/sangeet-backend/get_recommended_songs.php?user_id=${user.id}`,
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    )
      .then((response) => {
        if (response.data.status === "success") {
          setRecommendations(response.data.recommendations || []);
        } else {
          console.error("Error in response:", response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching recommendations:", error);
      });
  };

  const handleSongSelect = (index, songList) => {
    setCurrentSongIndex(index);
  };

  const playNextSong = () => {
    const currentList = activeTab === "home" ? songs : recommendations;
    if (currentSongIndex !== null) {
      const nextIndex = (currentSongIndex + 1) % currentList.length;
      setCurrentSongIndex(nextIndex);
    }
  };

  const renderSongGrid = (songList) => (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {songList.map((song, index) => (
        <div
          key={song.id}
          onClick={() => handleSongSelect(index, songList)}
          className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer overflow-hidden"
        >
          <div className="relative">
            <img
              src={song.image_url || "https://via.placeholder.com/300"}
              alt="Album Art"
              className="w-full h-48 object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
              <Play className="text-white w-12 h-12" />
            </div>
          </div>
          <div className="p-4">
            <h3 className="font-bold text-lg text-gray-800 truncate">
              {song.song_name}
            </h3>
            <p className="text-gray-500 text-sm truncate">{song.artist}</p>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="p-8 w-full">
      {/* Tab Navigation */}
      <div className="flex mb-6">
        <button
          onClick={() => setActiveTabSafely("home")}
          className={`mr-4 px-4 py-2 rounded ${
            activeTab === "home"
              ? "bg-[#8E44AD] text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Home
        </button>
        <button
          onClick={() => setActiveTabSafely("recommendations")}
          className={`px-4 py-2 rounded ${
            activeTab === "recommendations"
              ? "bg-[#8E44AD] text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Recommendations
        </button>
      </div>

      {/* Search Input (only for Home tab) */}
      {activeTab === "home" && (
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-[#8E44AD]">Trending Songs</h2>
          <input
            type="text"
            placeholder="Search"
            className="w-half max-w-md py-3 px-4 rounded-full border border-[#95A5A6] focus:outline-none focus:ring-2 focus:ring-[#8E44AD]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      )}

      {/* Content based on active tab */}
      {activeTab === "home"
        ? renderSongGrid(songs)
        : renderSongGrid(recommendations)}

      {/* Audio Player */}
      {currentSongIndex !== null && (
        <div className="fixed bottom-0 left-0 w-full bg-white shadow-2xl z-50">
          <div className="container mx-auto px-4 py-4">
            <AudioPlayer
              songName={
                activeTab === "home" && currentSongIndex !== null
                  ? songs[currentSongIndex]?.song_name
                  : activeTab === "recommendations" && currentSongIndex !== null
                  ? recommendations[currentSongIndex]?.song_name
                  : ""
              }
              audioUrl={
                activeTab === "home" && currentSongIndex !== null
                  ? songs[currentSongIndex]?.song_url
                  : activeTab === "recommendations" && currentSongIndex !== null
                  ? recommendations[currentSongIndex]?.song_url
                  : ""
              }
              songId={
                activeTab === "home" && currentSongIndex !== null
                  ? songs[currentSongIndex]?.id
                  : activeTab === "recommendations" && currentSongIndex !== null
                  ? recommendations[currentSongIndex]?.id
                  : ""
              }
              genreId={
                activeTab === "home" && currentSongIndex !== null
                  ? songs[currentSongIndex]?.genre_id
                  : activeTab === "recommendations" && currentSongIndex !== null
                  ? recommendations[currentSongIndex]?.genre_id
                  : ""
              }
              onEnd={playNextSong}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeLeft;    