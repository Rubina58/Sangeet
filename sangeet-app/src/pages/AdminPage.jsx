import React, { useState, useEffect } from 'react';

const AdminPage = () => {
  const [pendingSongs, setPendingSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  // Fetch pending songs from the backend
  useEffect(() => {
    const fetchPendingSongs = async () => {
      try {
        const response = await fetch("http://localhost/music-app/sangeet-backend/get_pending_songs.php");
        const data = await response.json();

        if (data.status === 'success') {
          setPendingSongs(data.songs); // Set the list of pending songs
        } else {
          setErrorMessage('No pending songs found.');
        }
      } catch (error) {
        setErrorMessage('Failed to fetch pending songs.');
      } finally {
        setLoading(false);
      }
    };

    fetchPendingSongs();
  }, []);

  // Handle approval or rejection of a song
  const handleSongApproval = async (songId, action) => {
    setLoading(true);

    try {
      const response = await fetch("http://localhost/music-app/sangeet-backend/update_song_status.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          song_id: songId,
          action: action, // 'approve' or 'reject'
        }),
      });

      const data = await response.json();
      if (data.status === 'success') {
        // Update the UI by removing the approved/rejected song
        setPendingSongs(pendingSongs.filter(song => song.id !== songId));
        alert(`Song has been ${action}d successfully.`);
      } else {
        setErrorMessage('Failed to update song status.');
      }
    } catch (error) {
      setErrorMessage('Error updating song status.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-page p-8">
      <h1 className="text-2xl mb-6">Admin Panel</h1>

      {loading ? (
        <p>Loading...</p>
      ) : errorMessage ? (
        <p className="text-red-500">{errorMessage}</p>
      ) : (
        <div>
          <h2 className="text-xl mb-4">Pending Song Approvals</h2>
          <table className="min-w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">Song Name</th>
                <th className="border border-gray-300 px-4 py-2">Artist</th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pendingSongs.map((song) => (
                <tr key={song.id}>
                  <td className="border border-gray-300 px-4 py-2">{song.title}</td>
                  <td className="border border-gray-300 px-4 py-2">{song.artist}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    <button
                      className="bg-green-500 text-white px-4 py-2 rounded-md mr-2"
                      onClick={() => handleSongApproval(song.id, 'approve')}
                    >
                      Approve
                    </button>
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded-md"
                      onClick={() => handleSongApproval(song.id, 'reject')}
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
