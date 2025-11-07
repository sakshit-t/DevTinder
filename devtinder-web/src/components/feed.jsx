// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { BASE_URL } from "../utils/constants";
// import UserCard from "./userCard";
// //import emptyFeed from "src/assets/nomoredev.png"; // 👈 your image file

// const Feed = () => {
//   const [feed, setFeed] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [showImage, setShowImage] = useState(false); 

//   // === Fetch feed ===
//   useEffect(() => {
//     const fetchFeed = async () => {
//       try {
//         const res = await axios.get(`${BASE_URL}/feed`, { withCredentials: true });
//         setFeed(res.data || []);
//       } catch (err) {
//         console.error("Error fetching feed:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchFeed();
//   }, []);

//   // === Send Interested / Ignore ===
//   const handleAction = async (userId, status) => {
//     try {
//       await axios.post(
//         `${BASE_URL}/request/send/${status}/${userId}`,
//         {},
//         { withCredentials: true }
//       );
//       const remaining = feed.filter((_, i) => i !== currentIndex);
//       setFeed(remaining);
//       if (remaining.length > 0) setCurrentIndex(0);
//     } catch (err) {
//       console.error("Error sending request:", err);
//     }
//   };

//   // === Loading state ===
//   if (loading)
//     return <p className="text-center mt-8 text-gray-600 text-lg">Loading users...</p>;

//   // === Empty feed handling ===
//   if (feed.length === 0) {
//     // Start 5-sec timer to show image
//     useEffect(() => {
//       const timer = setTimeout(() => setShowImage(true), 5000);
//       return () => clearTimeout(timer);
//     }, []);
//   //  useEffect(() => {
//   //   if (feed.length === 0 && !loading) {
//   //     const timer = setTimeout(() => setShowImage(true), 5000);
//   //     return () => clearTimeout(timer);
//   //   }
//   // }, [feed.length, loading]);
//   //  if (feed.length === 0) {
//     return (
//       <div className="flex flex-col items-center justify-center min-h-screen bg-base-200 transition-all duration-500">
//         {!showImage ? (
//           <h2 className="text-gray-700 text-2xl font-semibold animate-pulse">
//             No more users in your feed...
//           </h2>
//         ) : (
//           <div className="text-center">
//             <img
//               src="src/assets/nomoredev.png"
//               alt="No users"
//               className="w-72 h-72 object-contain opacity-90 mx-auto transition-all duration-700"
//             />
//             <h2 className="text-gray-600 text-xl mt-4 font-medium">
//               No more users available!
//             </h2>
//           </div>
//         )}
//       </div>
//     );
//   }

//   // === Current user card ===
//   const current = feed[currentIndex];

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-base-200">
//       <UserCard user={current} onAction={handleAction} />
//     </div>
//   );
// };

// export default Feed;


// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { BASE_URL } from "../utils/constants";
// import UserCard from "./userCard";

// const Feed = () => {
//   const [feed, setFeed] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [showImage, setShowImage] = useState(false);
//   // === Fetch feed ===
//   useEffect(() => {
//     const fetchFeed = async () => {
//       try {
//         const res = await axios.get(`${BASE_URL}/feed`, { withCredentials: true });
//         setFeed(res.data || []);
//       } catch (err) {
//         console.error("Error fetching feed:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchFeed();
//   }, []);

//   // === Send Interested / Ignore ===
//   const handleAction = async (userId, status) => {
//     try {
//       await axios.post(
//         `${BASE_URL}/request/send/${status}/${userId}`,
//         {},
//         { withCredentials: true }
//       );
//       const remaining = feed.filter((_, i) => i !== currentIndex);
//       setFeed(remaining);
//       if (remaining.length > 0) setCurrentIndex(0);
//     } catch (err) {
//       console.error("Error sending request:", err);
//     }
//   };

//   if (loading) return <p className="text-center mt-8">Loading users...</p>;
//   if (feed.length === 0)
//     return <p className="text-center mt-8">No more users in your feed!</p>;

//   const current = feed[currentIndex];

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-base-200">
//       <UserCard user={current} onAction={handleAction} />
//     </div>
//   );
// };

// export default Feed;
import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import UserCard from "./userCard";
import emptyFeed from "../assets/nomoredev.png"; // ✅ correct import path

const Feed = () => {
  const [feed, setFeed] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showImage, setShowImage] = useState(false);

  // === Fetch feed ===
  useEffect(() => {
    const fetchFeed = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/feed`, { withCredentials: true });
        setFeed(res.data || []);
      } catch (err) {
        console.error("Error fetching feed:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchFeed();
  }, []);

  // === Handle timer for empty feed ===
  useEffect(() => {
    if (!loading && feed.length === 0) {
      const timer = setTimeout(() => setShowImage(true), 5000);
      return () => clearTimeout(timer);
    }
  }, [feed.length, loading]);

  // === Send Interested / Ignore ===
  const handleAction = async (userId, status) => {
    try {
      await axios.post(
        `${BASE_URL}/request/send/${status}/${userId}`,
        {},
        { withCredentials: true }
      );
      const remaining = feed.filter((_, i) => i !== currentIndex);
      setFeed(remaining);
      if (remaining.length > 0) setCurrentIndex(0);
    } catch (err) {
      console.error("Error sending request:", err);
    }
  };

  // === Loading state ===
  if (loading)
    return (
      <p className="text-center mt-8 text-gray-600 text-lg">
        Loading users...
      </p>
    );

  // === Empty feed handling ===
  if (feed.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-base-200 transition-all duration-500">
        {!showImage ? (
          <h2 className="text-gray-700 text-2xl font-semibold animate-pulse">
            No more users in your feed...
          </h2>
        ) : (
          <div className="text-center">
            <img
              src={emptyFeed}
              alt="No users"
              className="w-72 h-72 object-contain opacity-90 mx-auto transition-all duration-700"
            />
            <h2 className="text-gray-600 text-xl mt-4 font-medium">
              No more users available!
            </h2>
          </div>
        )}
      </div>
    );
  }

  // === Current user card ===
  const current = feed[currentIndex];

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200">
      <UserCard user={current} onAction={handleAction} />
    </div>
  );
};

export default Feed;

