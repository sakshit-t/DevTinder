
// import React, { useState, useEffect } from "react";
// import UserCard from "./userCard";
// import { BASE_URL } from "../utils/constants";
// import axios from "axios";
// import { useDispatch } from "react-redux";
// import { addUser } from "../utils/userSlice";
// import { useNavigate } from "react-router-dom";

// const EditProfile = ({ user }) => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   // Form fields
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [gender, setGender] = useState("");
//   const [about, setAbout] = useState("");
//   const [skill, setSkill] = useState("");
//   const [age, setAge] = useState("");
//   const [photoId, setPhotoId] = useState("");
//   const [photoFile, setPhotoFile] = useState(null); // new
//   const [error, setError] = useState("");

//   // Load user data into form
//   useEffect(() => {
//     if (user) {
//       setFirstName(user.firstName || "");
//       setLastName(user.lastName || "");
//       setGender(user.gender || "");
//       setAbout(user.about || "");
//       setSkill(Array.isArray(user.skill) ? user.skill.join(", ") : user.skill || "");
//       setAge(user.age || "");
//       setPhotoId(user.photoId || "");
//     }
//   }, [user]);

//   // ✅ Handle photo file select
//   const handlePhotoChange = (e) => {
//     setPhotoFile(e.target.files[0]);
//   };

//   // ✅ Upload profile photo separately
//   const uploadPhoto = async () => {
//   if (!photoFile) {
//     alert("Please choose a photo first.");
//     return;
//   }

//   const formData = new FormData();
//   formData.append("photo", photoFile);

//   try {
//     const res = await axios.patch(`${BASE_URL}/profile/photo`, formData, {
//       withCredentials: true,
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     });

//     const newPhoto = res.data.photoUrl;
//     setPhotoId(newPhoto);
//     dispatch(addUser({ ...user, photoId: newPhoto }));
//     alert("Photo updated successfully!");
//   } catch (err) {
//     console.error("Error uploading photo:", err);
//     setError("Photo upload failed. Try again.");
//   }
// };
//   // ✅ Save full profile details
//   const saveProfile = async () => {
//   try {
//     const normalizedGender = gender?.toLowerCase() || "";

//     const payload = {
//       firstName,
//       lastName,
//       age,
//       gender: normalizedGender,
//       about,
//       skill,
//     };

//     // 🚫 Don't send photoId unless it's newly updated
//     if (photoId && photoId !== user?.photoId) {
//       payload.photoId = photoId;
//     }

//     const res = await axios.patch(`${BASE_URL}/profile/edit`, payload, {
//       withCredentials: true,
//     });

//     dispatch(addUser(res.data?.data));
//     alert(res.data.message);
//     navigate("/profile");
//   } catch (error) {
//     console.error("Error saving profile:", error);
//     setError(error.response?.data?.message || error.message);
//   }
// };

//   return (
//     <div className="min-h-screen bg-base-200 flex justify-center items-center p-8">
//       <div className="flex flex-col md:flex-row gap-12 w-full max-w-6xl justify-center items-start">
//         {/* ===== Left: Edit Form ===== */}
//         <div className="card bg-neutral text-neutral-content w-full md:w-1/2 shadow-lg rounded-2xl">
//           <div className="card-body items-center text-center">
//             <h2 className="card-title text-2xl mb-4">Edit Profile</h2>

//             <input
//               type="text"
//               value={firstName}
//               placeholder="First Name"
//               className="input input-bordered w-full mb-3"
//               onChange={(e) => setFirstName(e.target.value)}
//             />
//             <input
//               type="text"
//               value={lastName}
//               placeholder="Last Name"
//               className="input input-bordered w-full mb-3"
//               onChange={(e) => setLastName(e.target.value)}
//             />
//             <input
//               type="text"
//               value={gender}
//               placeholder="Gender"
//               className="input input-bordered w-full mb-3"
//               onChange={(e) => setGender(e.target.value)}
//             />
//             <input
//               type="text"
//               value={about}
//               placeholder="About"
//               className="input input-bordered w-full mb-3"
//               onChange={(e) => setAbout(e.target.value)}
//             />
//             <input
//               type="number"
//               value={age}
//               placeholder="Age"
//               className="input input-bordered w-full mb-3"
//               onChange={(e) => setAge(e.target.value)}
//             />
//             <input
//               type="text"
//               value={skill}
//               placeholder="Skills (comma separated)"
//               className="input input-bordered w-full mb-4"
//               onChange={(e) => setSkill(e.target.value)}
//             />

//             {/* ==== Photo Upload Section ==== */}
//             <div className="flex flex-col items-center gap-4 w-full">
//   {/* Preview Image */}
//   <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-accent shadow-md">
//     <img
//       src={
//         photoId ||
//         user?.photoId ||
//         "https://cdn-icons-png.flaticon.com/512/149/149071.png"
//       }
//       alt="Profile preview"
//       className="object-cover w-full h-full"
//     />
//   </div>

//   {/* Upload Button & Input */}
//   <label className="cursor-pointer bg-accent text-white px-5 py-2 rounded-lg shadow hover:bg-accent/90 transition-all">
//     Choose Photo
//     <input
//       type="file"
//       accept="image/*"
//       onChange={handlePhotoChange}
//       className="hidden"
//     />
//   </label>

//   <button
//     className="btn btn-outline btn-accent w-full mt-2"
//     onClick={uploadPhoto}
//   >
//     Upload Photo
//   </button>
// </div>

//             <p className="text-red-500 mt-2">{error}</p>

//             <button className="btn btn-primary w-full mt-3" onClick={saveProfile}>
//               Save All Changes
//             </button>
//           </div>
//         </div>

//         {/* ===== Right: User Preview ===== */}
//         <div className="flex justify-center items-start w-full md:w-1/2">
//           <UserCard
//      user={{
//       firstName,
//       lastName,
//      gender,
//      about,
//      skill,
//      age,
//      photoId: photoId || user?.photoId,
//     }}
//    />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EditProfile;

import React, { useState, useEffect } from "react";
import UserCard from "./userCard";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";

const EditProfile = ({ user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Form fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [about, setAbout] = useState("");
  const [skill, setSkill] = useState("");
  const [age, setAge] = useState("");
  const [photoId, setPhotoId] = useState("");
  const [photoFile, setPhotoFile] = useState(null);

  // Messages
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Load user data into form
  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
      setGender(user.gender || "");
      setAbout(user.about || "");
      setSkill(Array.isArray(user.skill) ? user.skill.join(", ") : user.skill || "");
      setAge(user.age || "");
      setPhotoId(user.photoId || "");
    }
  }, [user]);

  // ✅ Handle photo file select
  const handlePhotoChange = (e) => {
    setPhotoFile(e.target.files[0]);
  };

  // ✅ Upload profile photo
  const uploadPhoto = async () => {
    if (!photoFile) {
      setError("Please choose a photo first.");
      return;
    }

    const formData = new FormData();
    formData.append("photo", photoFile);

    try {
      const res = await axios.patch(`${BASE_URL}/profile/photo`, formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });

      const newPhoto = res.data.photoUrl;
      setPhotoId(newPhoto);
      dispatch(addUser({ ...user, photoId: newPhoto }));

      // ✅ Show success inside page
      setSuccessMsg("Photo updated successfully!");
      setError("");

      // Hide message after 3s
      setTimeout(() => setSuccessMsg(""), 3000);
    } catch (err) {
      console.error("Error uploading photo:", err);
      setError("Photo upload failed. Try again.");
      setSuccessMsg("");
    }
  };

  // ✅ Save full profile details
  const saveProfile = async () => {
    try {
      const normalizedGender = gender?.toLowerCase() || "";

      const payload = {
        firstName,
        lastName,
        age,
        gender: normalizedGender,
        about,
        skill,
      };

      if (photoId && photoId !== user?.photoId) payload.photoId = photoId;

      const res = await axios.patch(`${BASE_URL}/profile/edit`, payload, {
        withCredentials: true,
      });

      dispatch(addUser(res.data?.data));

      // ✅ Show success message instead of alert or redirect first
      setSuccessMsg(" Profile updated successfully!");
      setError("");

      setTimeout(() => {
        setSuccessMsg("");
        navigate("/profile");
      }, 1500);
    } catch (error) {
  // check if backend responded with a 400 (bad request)
  if (error.response?.status === 400) {
    setError("All fields are required. Please fill out every detail.");
  } else {
    // default fallback for other errors
    setError(error.response?.data?.message || "Something went wrong. Try again.");
  }

  setSuccessMsg("");

    }
  };

  return (
    <div className="min-h-screen bg-base-200 flex justify-center items-center p-8">
      <div className="flex flex-col md:flex-row gap-12 w-full max-w-6xl justify-center items-start">
        {/* ===== Left: Edit Form ===== */}
        <div className="card bg-neutral text-neutral-content w-full md:w-1/2 shadow-lg rounded-2xl">
          <div className="card-body items-center text-center">
            <h2 className="card-title text-2xl mb-4">Edit Profile</h2>

            {/* ✅ Show success or error message */}
            {successMsg && (
              <p className="text-green-400 font-semibold mb-2">{successMsg}</p>
            )}
            {error && (
              <p className="text-red-400 font-medium mb-2">{error}</p>
            )}

            <input
              type="text"
              value={firstName}
              placeholder="First Name"
              className="input input-bordered w-full mb-3"
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              type="text"
              value={lastName}
              placeholder="Last Name"
              className="input input-bordered w-full mb-3"
              onChange={(e) => setLastName(e.target.value)}
            />
            <input
              type="text"
              value={gender}
              placeholder="Gender"
              className="input input-bordered w-full mb-3"
              onChange={(e) => setGender(e.target.value)}
            />
            <input
              type="text"
              value={about}
              placeholder="About"
              className="input input-bordered w-full mb-3"
              onChange={(e) => setAbout(e.target.value)}
            />
            <input
              type="number"
              value={age}
              placeholder="Age"
              className="input input-bordered w-full mb-3"
              onChange={(e) => setAge(e.target.value)}
            />
            <input
              type="text"
              value={skill}
              placeholder="Skills (comma separated)"
              className="input input-bordered w-full mb-4"
              onChange={(e) => setSkill(e.target.value)}
            />

            {/* ==== Photo Upload Section ==== */}
            <div className="flex flex-col items-center gap-4 w-full">
              {/* Preview Image */}
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-accent shadow-md">
                <img
                  src={
                    photoId ||
                    user?.photoId ||
                    "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                  }
                  alt="Profile preview"
                  className="object-cover w-full h-full"
                />
              </div>

              <label className="cursor-pointer bg-accent text-white px-5 py-2 rounded-lg shadow hover:bg-accent/90 transition-all">
                Choose Photo
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="hidden"
                />
              </label>

              <button
                className="btn btn-outline btn-accent w-full mt-2"
                onClick={uploadPhoto}
              >
                Upload Photo
              </button>
            </div>

            <button
              className="btn btn-primary w-full mt-4"
              onClick={saveProfile}
            >
              Save All Changes
            </button>
          </div>
        </div>

        {/* ===== Right: Live Preview ===== */}
        <div className="flex justify-center items-start w-full md:w-1/2">
          <UserCard
            user={{
              firstName,
              lastName,
              gender,
              about,
              skill,
              age,
              photoId: photoId || user?.photoId,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
