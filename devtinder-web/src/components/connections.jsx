// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { addConnections,removeConnections } from "../utils/connectionSlice";
// import axios from "axios";
// import { BASE_URL } from "../utils/constants";
// import {} from "../utils/connectionSlice";
// const Connections = () => {
//   const dispatch = useDispatch();
//   const connections = useSelector((store) => store.connections);
 
//     const fetchConnections = async () => {
//       try {
//         const res = await axios.get(`${BASE_URL}/connections`, {
//           withCredentials: true,
//         });
//         dispatch(addConnections(res.data.data));
//       } catch (err) {
//         console.error(err);
//       } finally {
//         dispatch(setLoading(false));
//       }
//     };

//     useEffect(()=>{
//         fetchConnections();
//  }, [dispatch]);
//  if(!connections) return ;
//  if(connections.length===0) return <p className="text-center mt-10 text-gray-500">No connections found.</p>;
//   if (loading) return <p className="text-center mt-10">Loading...</p>;

//   return (
//     <div className="min-h-screen bg-base-200 p-8">
//       <h1 className="text-3xl font-bold mb-6 text-center">Your Connections</h1>
//       <div className="grid md:grid-cols-3 gap-6">
//         {connections.length === 0 ? (
//           <p className="text-center col-span-3 text-gray-500">No connections yet</p>
//         ) : (
//           connections.map((connection) => (
//             <div
//               key={connection._id}
//               className="card bg-neutral text-neutral-content shadow-lg rounded-2xl p-4"
//             >
//               <img
//                 src={connection.photoId || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
//                 alt={connection.firstName}
//                 className="rounded-xl w-full h-48 object-cover mb-3"
//               />
//               <h2 className="text-xl font-semibold">
//                 {connection.firstName} {connection.lastName}
//               </h2>
//               <p className="text-sm text-gray-400">{connection.about}</p>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default Connections;
import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Connections = () => {
  const [connections, setConnections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConnections = async () => {
      try {
        setLoading(true);
       const res = await axios.get(`${BASE_URL}/user/connections`, {
  withCredentials: true,
  headers: {
    "Cache-Control": "no-cache",
    "Pragma": "no-cache",
    "Expires": "0",
  },
});
        console.log("Fetched connections:", res.data);
        setConnections(res.data.connectionRequests || []); // assuming backend returns an array of users
      } catch (err) {
        console.error("Error fetching connections:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchConnections();
  }, []);

  if (loading) {
    return <p className="text-center mt-10 text-gray-500">Loading connections...</p>;
  }

 return (
  <div className="min-h-screen bg-base-200 flex justify-center items-start p-8">
    <div className="w-full max-w-4xl">
      <ul className="list bg-base-100 rounded-box shadow-md p-4">
        <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">
          You have <span className="font-bold">{connections.length}</span> connections
        </li>

        {connections.length === 0 ? (
          <p className="text-center text-sm text-gray-500 mt-4">
            You don’t have any connections yet.
          </p>
        ) : (
          connections.map((conn) => (
            <li key={conn._id} className="list-row flex items-center gap-4 border-b border-gray-200 p-4">
              
              {/* Profile Image */}
              <div>
                <img
                  className="w-12 h-12 rounded-full object-cover"
                  src={
                    conn.photoId ||
                    "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                  }
                  alt={conn.firstName}
                />
              </div>

              {/* User Info */}
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-base truncate">
                  {conn.firstName} {conn.lastName}
                </div>
              
                <p className="text-xs text-gray-600 mt-1 truncate">
                  {conn.about || "No description available."}
                </p>
              </div>

              {/* View Profile Button */}
              <button className="btn btn-square btn-ghost" title="Chat">
    <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-5 h-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="2"
   >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M8 10h8m-8 4h6m2 5l-4-4H6a2 2 0 01-2-2V6a2 2 0 012-2h12a2 2 0 012 2v12a2 2 0 01-2 2z"
     />
   </svg>
  </button>
            </li>
          ))
        )}
      </ul>
    </div>
  </div>
);

};

export default Connections;

