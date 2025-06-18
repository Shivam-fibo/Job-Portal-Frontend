// App.js
import React, { useState, useEffect } from 'react';

// Tailwind config with your color palette
const colors = {
  skuBlue: '#3A82F7',
  beige: '#FEFBFF',
  white: '#FEFBFF',
};

function App() {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/application/getAllAnnoucment');
        if (!response.ok) {
          throw new Error('Failed to fetch announcements');
        }
        const data = await response.json();
        setAnnouncements(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAnnouncements();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header with sku blue background */}
      <header 
        className="py-4 px-6 shadow-md text-center"
        style={{ backgroundColor: colors.skuBlue }}
      >
        <h1 className="text-2xl font-bold text-gray-800 ">Announcements</h1>
      </header>

      {/* Main content with beige background */}
      <main 
        className="flex-1 p-6"
        style={{ backgroundColor: colors.beige }}
      >
        {loading ? (
          <div className="text-center py-8">
            <p>Loading announcements...</p>
          </div>
        ) : error ? (
          <div className="text-center py-8 text-red-500">
            <p>Error: {error}</p>
          </div>
        ) : announcements.length === 0 ? (
          <div className="text-center py-8">
            <p>No announcements available</p>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto space-y-6">
         {[...announcements].reverse().map((announcement) => (
  <div 
    key={announcement._id} 
    className="bg-white p-6 rounded-lg shadow-md"
  >
    <h2 className="text-xl font-semibold text-gray-800 mb-2">
      {announcement.title}
    </h2>
    <p className="text-gray-600 mb-4">{announcement.description}</p>
    <div className="text-sm text-gray-500">
      Posted on: {new Date(announcement.createdAt).toLocaleDateString()}
    </div>
  </div>
))}

          </div>
        )}
      </main>

    </div>
  );
}

export default App;