// import React from 'react'
// import EditProfile from './editProfile.jsx';
// import{useSelector} from "react-redux"
// const Profile = () => {
//   const user = useSelector((store)=>store.user);
//   return ( user &&(
//     <div>

//      <EditProfile user={user} />
//     </div>
//   )
//   );
// };

// export default Profile
import React from "react";
import EditProfile from "./editProfile.jsx";
import { useSelector } from "react-redux";

const Profile = () => {
  const user = useSelector((store) => store.user);

  if (!user) return <p className="text-center mt-10 text-gray-500">Loading user...</p>;

  return (
    <div>
      <EditProfile user={user} />
    </div>
  );
};

export default Profile;