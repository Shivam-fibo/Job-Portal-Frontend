import React, { useState, useEffect } from 'react';

// Role-based color configurations
const roleConfigs = {
  hod: {
    topColor: "bg-gradient-to-b from-emerald-600 to-emerald-700",
    middleColor: "bg-white",
    bottomColor: "bg-emerald-50",
    textColor: "text-emerald-700",
    buttonColor: "bg-emerald-600 hover:bg-emerald-700"
  },
  placement_officer: {
    topColor: "bg-gradient-to-b from-violet-600 to-violet-700",
    middleColor: "bg-white",
    bottomColor: "bg-violet-50",
    textColor: "text-violet-700",
    buttonColor: "bg-violet-600 hover:bg-violet-700"
  }
};

// Default to placement_officer colors or you can set this based on user role
const currentRole = roleConfigs['placement_officer']; // Change to 'hod' for HOD colors

function App() {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/application/getAllAnnoucment', {
          credentials: 'include',
        });
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
    <div className={`min-h-screen flex flex-col ${currentRole.bottomColor}`}>
      {/* Header with role-based gradient background */}
      <header className={`py-4 px-6 shadow-md text-center ${currentRole.topColor}`}>
        <h1 className="text-2xl font-bold text-white">Announcements</h1>
      </header>

      {/* Main content with role-based background */}
      <main className={`flex-1 p-6 ${currentRole.middleColor}`}>
        {loading ? (
          <div className="text-center py-8">
            <p className={currentRole.textColor}>Loading announcements...</p>
          </div>
        ) : error ? (
          <div className="text-center py-8 text-red-500">
            <p>Error: {error}</p>
          </div>
        ) : announcements.length === 0 ? (
          <div className="text-center py-8">
            <p className={currentRole.textColor}>No announcements available</p>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto space-y-6">
            {[...announcements].reverse().map((announcement) => (
              <div 
                key={announcement._id} 
                className="bg-white p-6 rounded-lg shadow-md"
              >
                <h2 className={`text-xl font-semibold mb-2 ${currentRole.textColor}`}>
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