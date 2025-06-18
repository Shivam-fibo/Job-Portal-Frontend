import React, { useEffect, useState } from 'react';

const StudentProfiles = () => {
  // Get user role from sessionStorage
  const user = JSON.parse(sessionStorage.getItem("user") || "{}");
  const role = user?.role || "student";

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // If role is student, block access
  if (role === "student") {
    return (
      <div
        className="flex items-center justify-center min-h-screen text-center px-4"
        style={{ backgroundColor: '#C8D9E6' /* A calm blue for denial */ }}
      >
        <h1 className="text-2xl font-semibold text-red-700">
          Access Denied: Students cannot access this page.
        </h1>
      </div>
    );
  }

  // Colors config for roles other than student
  const colors = {
    placementOfficer: {
      top: '#164BA1',
      middle: '#ADB4BF',
      bottom: '#F0F4FA',
    },
    hod: {
      top: '#311C5A',
      middle: '#FFF6E8',
      bottom: '#e2e8f0',
    },
  };

  // Pick colors based on role
  const bgColors =
    role === "placementOfficer"
      ? colors.placementOfficer
      : role === "hod"
      ? colors.hod
      : colors.hod; // fallback to hod colors if unknown

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/application/getAllStudentProfile');
        if (!response.ok) throw new Error('Failed to fetch student profiles');
        const data = await response.json();
        setStudents(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  if (loading)
    return (
      <div
        className="flex items-center justify-center min-h-screen"
        style={{ backgroundColor: bgColors.middle }}
      >
        <p className="text-lg font-semibold text-gray-700">Loading student profiles...</p>
      </div>
    );

  if (error)
    return (
      <div
        className="flex items-center justify-center min-h-screen px-4"
        style={{ backgroundColor: bgColors.middle }}
      >
        <p className="text-lg font-semibold text-red-600">{error}</p>
      </div>
    );

  return (
    <div
      className="w-full min-h-screen"
      style={{ backgroundColor: bgColors.bottom }}
    >
      {/* Top section (e.g. header) */}
      <header
        className="p-6 text-white font-bold text-3xl text-center mt-2"
        style={{ backgroundColor: bgColors.top }}
      >
        Student Profiles
      </header>

      {/* Middle content */}
      <main
        className=" p-6"
        style={{ backgroundColor: bgColors.bottom }}
      >
        {students.length === 0 ? (
          <p className="text-center text-black">No student profiles found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {students.map(({ _id, name, skills, resumeUrl }) => (
              <div
                key={_id}
                className="rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow"
                style={{ backgroundColor: bgColors.top, color: '#fff' }}
              >
                <h2 className="text-xl font-semibold mb-2">{name}</h2>
                <p className="mb-2">
                  <span className="font-medium">Skills:</span> {skills.join(', ')}
                </p>
                <a
                  href={resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-2 px-4 py-2 text-black bg-white rounded"
                >
                  View Resume
                </a>
              </div>
            ))}
          </div>
        )}
      </main>

      
    </div>
  );
};

export default StudentProfiles;
