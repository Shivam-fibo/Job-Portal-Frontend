import React from "react";
import { useAuth } from "../context/AuthContext"; 
import { useNavigate } from "react-router-dom";
const Header = () => {
  const { logout } = useAuth(); // ✅ use logout function
  const user = JSON.parse(sessionStorage.getItem("user") || "{}");
  const role = user?.role || "student";

  const config = {
    student: {
      colors: {
        top: "#C8D9E6",
      },
      buttons: {
        seeAnnouncement: true,
        addAnnouncement: false,
        seeStudents: false,
        logout: true,
      },
    },
    hod: {
      colors: {
        top: "#F7F9FB",
      },
      buttons: {
        seeAnnouncement: false,
        addAnnouncement: true,
        seeStudents: true,
        logout: true,
      },
    },
    "placement_officer": {
      colors: {
        top: "#164BA1",
      },
      buttons: {
        seeAnnouncement: true,
        addAnnouncement: false,
        seeStudents: true,
        logout: true,
      },
    },
  };

  const roleConfig = config[role];
  const navigate = useNavigate()
  const handleSeeAnnouncement = () =>{
    navigate("/viewAnnoucment")
  }

  const handleStudentList = () =>{
    navigate("/studentlist")
  }


  const handleAnnouncement = () =>{
    navigate("/addAnnoucment")
  }

  const handleLogoButton = () => {
    navigate("/dashboard")
  }
  return (
    <header
      className="w-full p-4 flex justify-between items-center border-2 border-gray-400"
      style={{ backgroundColor: roleConfig.colors.top }}
    >
      {/* <h1 className="text-xl font-semibold text-black">Dashboard</h1> */}
      <img src="/images/logo.png" alt="logo company" height={"100px"} width={"100px"} className="mx-4 rounded-2xl"  
      onClick={() => handleLogoButton()}
      />
      <div className="flex gap-2">
        {roleConfig.buttons.seeAnnouncement && (
          <button onClick={handleSeeAnnouncement} className="px-4 py-2 bg-gray-200 rounded">See Announcements</button>
        )}
        {roleConfig.buttons.addAnnouncement && (
          <button onClick={handleAnnouncement} className="px-4 py-2 bg-gray-200 rounded">Add Announcement</button>
        )}
        {roleConfig.buttons.seeStudents && (
          <button onClick={handleStudentList} className="px-4 py-2 bg-gray-200 rounded">Student List</button>
        )}
        {roleConfig.buttons.logout && (
          <button
            onClick={logout} // ✅ Trigger logout
            className="px-4 py-2 bg-red-500 text-white rounded"
          >
            Logout
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
