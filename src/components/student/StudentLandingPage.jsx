import React, {useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
const StudentLandingPage = () => {

  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role === 'student' && !localStorage.getItem('studentSkills')) {
      navigate('/student/profile');
    }
  }, [user, navigate]);

  const handleJobOpening = () =>{
    navigate('/jobs/opening')
  }
  return (
    <div className='flex justify-center items-center min-h-screen gap-10'>
        <button   className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-md transition" onClick={handleJobOpening}>Job Openign</button> 

        <button className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-md transition"  >
            checbox
        </button>
    </div>
  )
}

export default StudentLandingPage