// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const AddNewPage = () => {
//   const navigate = useNavigate();
//   const [user, setUser] = useState(null);
//   const [genres, setGenres] = useState([]);
//   const [locations, setLocations] = useState([]);
//   const [songTitle, setSongTitle] = useState('');
//   const [genre, setGenre] = useState('');
//   const [location, setLocation] = useState('');
//   const [file, setFile] = useState(null);
//   const [image, setImage] = useState(null);
//   const [message, setMessage] = useState(''); // For showing success/error messages

//   useEffect(() => {
//     // Check if user is logged in
//     const loggedInUser = JSON.parse(localStorage.getItem('user'));
//     if (!loggedInUser) {
//       navigate('/LoginPage'); // Redirect to login page if no user is found
//     } else {
//       setUser(loggedInUser); // If logged in, update the user state
//     }

//     // Fetch genres from the backend
//     axios.get('http://localhost/music-app/sangeet-backend/fetchGenres.php')
//       .then(response => {
//         setGenres(response.data);  // Populate genres state with the fetched genres
//       })
//       .catch(error => {
//         console.error('Error fetching genres:', error);  // Handle error
//       });

//     // Fetch locations from the backend
//     axios.get('http://localhost/music-app/sangeet-backend/fetchLocations.php')
//       .then(response => {
//         setLocations(response.data); // Populate locations state with the fetched locations
//       })
//       .catch(error => {
//         console.error('Error fetching locations:', error);
//       });
//   }, [navigate]);

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Check if user is logged in and has a name
//     if (!user || !user.name) {
//       alert("User is not logged in or name is missing.");
//       return;
//     }

//     // Prepare form data
//     const formData = new FormData();
//     formData.append('song_title', songTitle);
//     formData.append('genre', genre);
//     formData.append('location', location);
//     formData.append('file', file);
//     formData.append('image', image);
//     formData.append('artist', user.name); // Send the artist's name
//     formData.append('user_id', user.id); // Send the user_id from the logged-in user
    
//     try {
//       const response = await axios.post('http://localhost/music-app/sangeet-backend/uploadSong.php', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//         withCredentials: true,
//       });
      
//       if (response.data.success) {
//         setMessage("Song uploaded successfully!");
//         // Clear the form fields after successful upload
//         setSongTitle('');
//         setGenre('');
//         setLocation('');
//         setFile(null);
//         setImage(null);

//         // Optionally redirect to home page after success
//         setTimeout(() => {
//           navigate('/'); // Redirect to the homepage or any other page
//         }, 5000); // Redirect after 5 seconds to show success message
//       } else {
//         setMessage(response.data.error || "Error uploading song");
//       }
//     } catch (error) {
//       console.error('Error uploading song', error); // Handle error
//       setMessage("Error uploading song");
//     }
//   };

//   return (
//     <div className="container mx-auto p-32">
//       <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg mx-auto">
//         <h1 className="text-3xl text-[#2C3E50] font-semibold mb-6 text-center">Upload New Song</h1>
//         <form onSubmit={handleSubmit} className="space-y-6">
//           {message && (
//             <div className="text-center text-lg font-medium text-green-600">
//               {message}
//             </div>
//           )}
//           {/* Song Title Field */}
//           <div>
//             <label className="block text-lg font-medium mb-2">Song Title</label>
//             <input
//               type="text"
//               value={songTitle}
//               onChange={(e) => setSongTitle(e.target.value)}
//               className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
//               required
//             />
//           </div>

//           {/* Genre Field */}
//           <div>
//             <label className="block text-lg font-medium mb-2">Genre</label>
//             <select
//               value={genre}
//               onChange={(e) => setGenre(e.target.value)}
//               className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
//               required
//             >
//               <option value="">Select Genre</option>
//               {genres.map((g) => (
//                 <option key={g.g_id} value={g.g_id}>{g.g_name}</option>
//               ))}
//             </select>
//           </div>

//           {/* Location Field */}
//           <div>
//             <label className="block text-lg font-medium mb-2">Location</label>
//             <select
//               value={location}
//               onChange={(e) => setLocation(e.target.value)}
//               className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
//               required
//             >
//               <option value="">Select Location</option>
//               {locations.map((l) => (
//                 <option key={l.location_id} value={l.location_id}>{l.location_name}</option>
//               ))}
//             </select>
//           </div>

//           {/* Artist Field (Auto-filled with logged-in user) */}
//           <div>
//             <label className="block text-lg font-medium mb-2">Artist</label>
//             <input
//               type="text"
//               value={user ? user.name : ''}
//               disabled
//               className="w-full px-4 py-2 rounded-md border border-gray-300 bg-gray-200"
//             />
//           </div>

//           {/* Song File Field */}
//           <div>
//             <label className="block text-lg font-medium mb-2">Upload Song</label>
//             <input
//               type="file"
//               onChange={(e) => setFile(e.target.files[0])}
//               className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
//               required
//             />
//           </div>

//           {/* Image File Field */}
//           <div>
//             <label className="block text-lg font-medium mb-2">Upload Image (Optional)</label>
//             <input
//               type="file"
//               onChange={(e) => setImage(e.target.files[0])}
//               className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
//             />
//           </div>

//           {/* Submit Button */}
//           <div className="flex justify-center">
//             <button
//               type="submit"
//               className="w-full bg-[#8E44AD] text-white py-2 rounded-lg hover:bg-[#7D3C98] transition duration-300"
//             >
//               Upload
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddNewPage;


import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

// Separate component to handle map clicks
const LocationMarker = ({ onLocationSelect, position }) => {
  useMapEvents({
    click: (e) => {
      const { lat, lng } = e.latlng;
      onLocationSelect({ latitude: lat, longitude: lng });
    },
  });

  return position ? (
    <Marker position={position}>
      <Popup>Selected location</Popup>
    </Marker>
  ) : null;
};

const AddNewPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [genres, setGenres] = useState([]);
  const [locations, setLocations] = useState([]);
  const [songTitle, setSongTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [location, setLocation] = useState("");
  const [file, setFile] = useState(null);
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");
  const [mapCenter, setMapCenter] = useState([27.7103, 85.3222]);
  const [mapZoom, setMapZoom] = useState(13);
  const [markerPosition, setMarkerPosition] = useState(null);

  const handleLocationSelect = (location) => {
    console.log("Selected Location:", location);
    const newPosition = [location.latitude, location.longitude];
    setMapCenter(newPosition);
    setMarkerPosition(newPosition);
  };

  useEffect(() => {
    // Check if user is logged in
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    if (!loggedInUser) {
      navigate("/LoginPage");
    } else {
      setUser(loggedInUser);
    }

    // Fetch genres
    const fetchGenres = async () => {
      try {
        const response = await axios.get(
          "http://localhost/music-app/sangeet-backend/fetchGenres.php"
        );
        setGenres(response.data);
      } catch (error) {
        console.error("Error fetching genres:", error);
        setMessage("Error fetching genres");
      }
    };

    // Fetch locations
    const fetchLocations = async () => {
      try {
        const response = await axios.get(
          "http://localhost/music-app/sangeet-backend/fetchLocations.php"
        );
        setLocations(response.data);
      } catch (error) {
        console.error("Error fetching locations:", error);
        setMessage("Error fetching locations");
      }
    };

    fetchGenres();
    fetchLocations();
  }, [navigate]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user || !user.name) {
      setMessage("User is not logged in or name is missing.");
      return;
    }

    if (!markerPosition) {
      setMessage("Please select a location on the map");
      return;
    }

    // Prepare form data
    const formData = new FormData();
    formData.append("song_title", songTitle);
    formData.append("genre", genre);
    formData.append("location", location);
    formData.append("file", file);
    formData.append("image", image);
    formData.append("artist", user.name);
    formData.append("user_id", user.id);
    formData.append("latitude", markerPosition[0]);
    formData.append("longitude", markerPosition[1]);
    
    try {
      console.log("Form Data Contents:");
for (let [key, value] of formData.entries()) {
  console.log(`${key}:`, value);
}

      const response = await axios.post(
        "http://localhost/music-app/sangeet-backend/uploadSong.php",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (response.data.success) {
        setMessage("Song uploaded successfully!");
        // Clear form fields
        setSongTitle("");
        setGenre("");
        setLocation("");
        setFile(null);
        setImage(null);
        setMarkerPosition(null);

        // Redirect after success
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        setMessage(response.data.error || "Error uploading song");
      }
    } catch (error) {
      console.error("Error uploading song:", error);
      setMessage("Error uploading song. Please try again.");
    }
  };

  // File validation
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile.type.startsWith("audio/")) {
        setFile(selectedFile);
      } else {
        setMessage("Please select a valid audio file");
        e.target.value = null;
      }
    }
  };

  // Image validation
  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile.type.startsWith("image/")) {
        setImage(selectedFile);
      } else {
        setMessage("Please select a valid image file");
        e.target.value = null;
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl mx-auto">
        <h1 className="text-3xl text-[#2C3E50] font-semibold mb-6 text-center">
          Upload New Song
        </h1>
        {message && (
          <div
            className={`text-center text-lg font-medium mb-4 ${
              message.includes("Error") ? "text-red-600" : "text-green-600"
            }`}
          >
            {message}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-lg font-medium mb-2">Song Title</label>
            <input
              type="text"
              value={songTitle}
              onChange={(e) => setSongTitle(e.target.value)}
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          <div>
            <label className="block text-lg font-medium mb-2">Genre</label>
            <select
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            >
              <option value="">Select Genre</option>
              {genres.map((g) => (
                <option key={g.g_id} value={g.g_id}>
                  {g.g_name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-lg font-medium mb-2">Location</label>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            >
              <option value="">Select Location</option>
              {locations.map((l) => (
                <option key={l.location_id} value={l.location_id}>
                  {l.location_name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-lg font-medium mb-2">Artist</label>
            <input
              type="text"
              value={user ? user.name : ""}
              disabled
              className="w-full px-4 py-2 rounded-md border border-gray-300 bg-gray-200"
            />
          </div>

          <div>
            <label className="block text-lg font-medium mb-2">
              Upload Song
            </label>
            <input
              type="file"
              onChange={handleFileChange}
              accept="audio/*"
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          <div>
            <label className="block text-lg font-medium mb-2">
              Upload Image (Optional)
            </label>
            <input
              type="file"
              onChange={handleImageChange}
              accept="image/*"
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div className="mb-6">
            <label className="block text-lg font-medium mb-2">
              Select Location on Map
            </label>
            <div className="w-full h-64 border border-gray-300 rounded-lg overflow-hidden">
              <MapContainer
                center={mapCenter}
                zoom={mapZoom}
                style={{ width: "100%", height: "100%" }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <LocationMarker
                  onLocationSelect={handleLocationSelect}
                  position={markerPosition}
                />
              </MapContainer>
            </div>
            {markerPosition && (
              <div className="mt-2 text-sm text-gray-600">
                Selected coordinates: {markerPosition[0].toFixed(4)},{" "}
                {markerPosition[1].toFixed(4)}
              </div>
            )}
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full bg-[#8E44AD] text-white py-2 rounded-lg hover:bg-[#7D3C98] transition duration-300"
            >
              Upload
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewPage;
