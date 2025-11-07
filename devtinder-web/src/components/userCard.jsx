// import React from "react";
// import axios from "axios";
// import { BASE_URL } from "../utils/constants";
// const handleIgnore = async (userId) => {
//   try {
//     await axios.post(`${BASE_URL}/request/ignore/${userId}`, {}, { withCredentials: true });
//     console.log("Ignored:", userId);
//   } catch (err) {
//     console.error("Error ignoring user:", err);
//   }
// };

// const handleInterested = async (userId) => {
//   try {
//     await axios.post(`${BASE_URL}/request/interested/${userId}`, {}, { withCredentials: true });
//     console.log("Interested:", userId);
//   } catch (err) {
//     console.error("Error sending interest:", err);
//   }
// };
// const UserCard = ({ user }) => {
//   if (!user) return null;
//   const { firstName, lastName, age, gender, photoId, about } = user;
//     const displayGender = gender
//     ? gender.charAt(0).toUpperCase() + gender.slice(1)
//     : "Not specified"; 
//   const photoSrc =
//     photoId && photoId.startsWith("http")
//       ? photoId
//       : "https://cdn-icons-png.flaticon.com/512/149/149071.png";

//   return (
//     // <div className="card bg-base-200 shadow-md m-4 p-4 w-80">
//     //   <img src={photoId} alt={firstName} className="rounded-xl w-full h-48 object-cover" />
//     //   <div className="mt-4">
//     //     <h2 className="font-bold text-xl">{firstName} {lastName}</h2>
//     //     <p className="text-gray-600">{about}</p>
       
//     //   </div>
//     // </div>
//     <div className="card bg-base-200 shadow-md m-4 p-4 w-80">
//       <img
//         src={photoSrc|| "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
//         alt={firstName || "User"}
//         className="rounded-xl w-full h-48 object-cover"
//       />

//       <div className="mt-4">
//         <h2 className="font-bold text-xl">
//           {firstName} {lastName}
//         </h2>

//         <p className="text-gray-600 text-sm mt-1">
//           {age ? `${age} years old` : "Age not specified"} •
//           {displayGender}

//         </p>
      
//         <p className="text-gray-600 mt-2">{about || "No bio available."}</p>
//       </div>
   

//   <div className="mt-5 flex justify-between gap-4">
//     <button
//       onClick={() => console.log("Ignored", firstName)}
//       className="flex-1 py-2 rounded-lg bg-pink-500 hover:bg-pink-600 text-white font-medium transition"
//     >
//       Ignore
//     </button>

//     <button
//       onClick={() => console.log("Interested", firstName)}
//       className="flex-1 py-2 rounded-lg bg-purple-500 hover:bg-purple-600 text-white font-medium transition"
//     >
//       Interested
//     </button>
//   </div>
// </div>

//   );
// };

// export default UserCard;
// import React from "react";
// import { useSelector } from "react-redux";

// const UserCard = ({ user: propUser }) => {
//   // Always stay in sync with Redux state
//   const reduxUser = useSelector((store) => store.user);

//   // Prefer Redux user if no prop passed or prop is stale
//   const user = propUser || reduxUser;

//   if (!user) return null;

//   const { firstName, lastName, age, gender, photoId, about } = user;

//   return (
//     <div className="card bg-base-200 shadow-md m-4 p-4 w-80">
//       <img
//         src={photoId || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
//         alt={firstName || "User"}
//         className="rounded-xl w-full h-48 object-cover"
//       />

//       <div className="mt-4">
//         <h2 className="font-bold text-xl">
//           {firstName} {lastName}
//         </h2>

//         <p className="text-gray-600 text-sm mt-1">
//           {age ? `${age} years old` : "Age not specified"} •{" "}
//           {gender ? gender : "Not specified"}
//         </p>

//         <p className="text-gray-600 mt-2">
//           {about || "No bio available."}
//         </p>
//       </div>

//       <div className="mt-5 flex justify-between gap-4">
//         <button
//           onClick={() => console.log("Ignored", firstName)}
//           className="flex-1 py-2 rounded-lg bg-pink-500 hover:bg-pink-600 text-white font-medium transition"
//         >
//           Ignore
//         </button>

//         <button
//           onClick={() => console.log("Interested", firstName)}
//           className="flex-1 py-2 rounded-lg bg-purple-500 hover:bg-purple-600 text-white font-medium transition"
//         >
//           Interested
//         </button>
//       </div>
//     </div>
//   );
// };

// export default UserCard;
import React from "react";

const UserCard = ({ user, onAction }) => {
  if (!user) return null;

  const { _id, firstName, lastName, age, gender, photoId, about } = user;
  const displayGender = gender
    ? gender.charAt(0).toUpperCase() + gender.slice(1)
    : "Not specified";

  const photoSrc =
    photoId && photoId.startsWith("http")
      ? photoId
      : "https://cdn-icons-png.flaticon.com/512/149/149071.png";

  return (
    <div className="card bg-base-200 shadow-md m-4 p-4 w-80">
      <img
        src={photoSrc}
        alt={firstName || "User"}
        className="rounded-xl w-full h-48 object-cover"
      />

      <div className="mt-4">
        <h2 className="font-bold text-xl">
          {firstName} {lastName}
        </h2>

        <p className="text-gray-600 text-sm mt-1">
          {age ? `${age} years old` : "Age not specified"} • {displayGender}
        </p>

        <p className="text-gray-600 mt-2">{about || "No bio available."}</p>
      </div>

      <div className="mt-5 flex justify-between gap-4">
        <button
          onClick={() => onAction(_id, "ignored")}
          className="flex-1 py-2 rounded-lg bg-pink-500 hover:bg-pink-600 text-white font-medium transition"
        >
          Ignore
        </button>

        <button
          onClick={() => onAction(_id, "interested")}
          className="flex-1 py-2 rounded-lg bg-purple-500 hover:bg-purple-600 text-white font-medium transition"
        >
          Interested
        </button>
      </div>
    </div>
  );
};

export default UserCard;




