import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";

const Navbar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ✅ Handle logout
  const handleLogout = async () => {
    try {
      await axios.post(`${BASE_URL}/logout`, {}, { withCredentials: true });
      dispatch(removeUser());
      navigate("/login");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return (
    <div className="navbar bg-base-400 shadow-sm px-4">
      {/* Logo */}
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">
          DevTinder
        </Link>
      </div>

      {/* User info */}
      {user ? (
        <div className="flex-none flex items-center space-x-6">
          <p className="font-semibold">Welcome, {user?.firstName}</p>

          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                {/* <img
                  alt="User"
                  src={
                    user?.photoId
                      ? `${BASE_URL}/uploads/${user.photoId}`
                      : "/default-avatar.png"
                  }
                /> */}
                <img
  alt="User"
  src={
    user?.photoId
      ? user.photoId.startsWith("http")
        ? user.photoId
        : `${BASE_URL}/${user.photoId.replace(/^\/?/, "")}`
      : "/default-avatar.png"
  }
/>
              </div>
            </div>

            <ul
              tabIndex={-1}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-40 p-2 shadow"
            >
              <li>
                <Link to="/profile" className="justify-between">
                  Profile <span className="badge">New</span>
                </Link>
              </li>
              <li><Link to="/connections">Connections</Link></li>
              <li><Link to="/requests">Requests</Link></li>
              <li><a onClick={handleLogout}>Logout</a></li>
            </ul>
          </div>
        </div>
      ) : (
        <p className="text-gray-500 font-medium">Loading...</p>
      )}
    </div>
  );
};

export default Navbar;

// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { BASE_URL } from "../utils/constants";
// import { removeUser, addUser } from "../utils/userSlice"; // ✅ import addUser

// const Navbar = () => {
//   const user = useSelector((store) => store.user?.user);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   // ✅ Fetch logged-in user on refresh
//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const res = await axios.get(`${BASE_URL}/profile/view`, {
//           withCredentials: true,
//         });
//         dispatch(addUser(res.data)); // ✅ restore user in Redux
//       } catch (err) {
//         console.error("User not logged in:", err);
//       }
//     };

//     if (!user) fetchUser(); // only call if Redux user is empty
//   }, [dispatch, user]);

//   // ✅ Handle logout
//   const handleLogout = async () => {
//     try {
//       await axios.post(`${BASE_URL}/logout`, {}, { withCredentials: true });
//       dispatch(removeUser());
//       navigate("/login");
//     } catch (err) {
//       console.error("Logout error:", err);
//     }
//   };

//   return (
//     <div className="navbar bg-base-400 shadow-sm px-4">
//       {/* Logo */}
//       <div className="flex-1">
//         <Link to="/" className="btn btn-ghost text-xl">
//           DevTinder
//         </Link>
//       </div>

//       {/* User info */}
//       {user && (
//         <div className="flex-none flex items-center space-x-6">
//           <p className="font-semibold">Welcome, {user?.firstName}</p>

//           <div className="dropdown dropdown-end">
//             <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
//               <div className="w-10 rounded-full">
//                 <img alt="User" src={user?.photoId} />
//               </div>
//             </div>
//             <ul
//               tabIndex={-1}
//               className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-40 p-2 shadow"
//             >
//               <li>
//                 <Link className="justify-between" to="/profile">
//                   Profile
//                   <span className="badge">New</span>
//                 </Link>
//               </li>
//               <li>
//                 <Link className="justify-between" to="/connections">Connections</Link>
//               </li>
//               <li>
//                 <Link className="justify-between" to="/requests">Requests</Link>
//               </li>
//               <li>
//                 <a onClick={handleLogout}>Logout</a>
//               </li>
//             </ul>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Navbar;
