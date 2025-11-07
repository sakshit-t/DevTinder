import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addRequests } from "../utils/requestSlice";
import { useNavigate } from "react-router-dom";

const Requests = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data } = useSelector((state) => state.requests);
  const [loading, setLoading] = useState(true);

  // === Fetch All Received Requests ===
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/user/requests/received`, {
          withCredentials: true,
        });
        dispatch(addRequests(res.data.data));
      } catch (err) {
        console.error("Error fetching requests:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, [dispatch]);

  // === Accept / Reject Handler ===
  const handleReview = async (requestId, status) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/request/review/${status}/${requestId}`,
        {},
        { withCredentials: true }
      );

      // ✅ Update local Redux store
      const updatedData = data.map((req) =>
        req._id === requestId ? { ...req, status } : req
      );
      dispatch(addRequests(updatedData));

      console.log(res.data.message);
    } catch (err) {
      console.error("Error reviewing request:", err);
    }
  };

  // === Redirect to /feed if no requests ===
  useEffect(() => {
    if (!loading && (!data || data.length === 0)) {
      const timer = setTimeout(() => navigate("/feed"), 1000);
      return () => clearTimeout(timer);
    }
  }, [data, loading, navigate]);

  // === UI RENDER ===
  if (loading)
    return <p className="text-center mt-8 text-gray-500">Loading requests...</p>;

  if (!data || data.length === 0)
    return (
      <p className="text-center mt-8 text-gray-500">
        No new requests found — redirecting to feed...
      </p>
    );

  return (
    <div className="min-h-screen bg-base-200 flex justify-center items-start p-8">
      <div className="w-full max-w-4xl">
        <ul className="list bg-base-100 rounded-box shadow-md p-4">
          <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">
            You have <span className="font-bold">{data.length}</span> requests
          </li>

          {data.map((req) => (
            <li
              key={req._id}
              className="list-row flex items-center gap-4 border-b border-gray-200 p-4"
            >
              {/* === Profile Image === */}
              <div>
                <img
                  className="w-12 h-12 rounded-full object-cover"
                  src={
                    req.fromUserId?.photoId ||
                    "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                  }
                  alt={req.fromUserId?.firstName}
                />
              </div>

              {/* === User Info === */}
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-base truncate">
                  {req.fromUserId?.firstName} {req.fromUserId?.lastName}
                </div>
                <p className="text-xs text-gray-600 mt-1 truncate">
                  {req.fromUserId?.about || "No description available."}
                </p>
              </div>

              {/* === Actions === */}
              {req.status === "interested" ? (
                <div className="flex gap-2">
                  <button
                    onClick={() => handleReview(req._id, "accepted")}
                    className="btn btn-success btn-sm"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleReview(req._id, "rejected")}
                    className="btn btn-error btn-sm"
                  >
                    Reject
                  </button>
                </div>
              ) : req.status === "accepted" ? (
                <span className="text-green-600 text-sm font-medium">
                  Accepted
                </span>
              ) : req.status === "rejected" ? (
                <span className="text-red-600 text-sm font-medium">
                  Rejected
                </span>
              ) : null}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Requests;


