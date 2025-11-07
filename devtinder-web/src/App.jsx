
// import Body from "./components/body";
// import Login from "./components/login";
// import Profile from "./components/profile";
// import { BrowserRouter, Route,Routes } from "react-router-dom";
// import {Provider} from "react-redux";
// import appStore from "./utils/appStore";
// import Feed from "./components/feed";
// import Connections from "./components/connections";
// import Requests from "./components/requests";
// import Signup from "./components/signup";
// function App() {

//   return (
//     <>
//     <Provider store={appStore}>
//     <BrowserRouter basename='/'>
//     <Routes>
//        <Route path="/" element={<Body />}>
//         <Route path="feed" element={<Feed />} />
//         <Route path="profile" element={<Profile />} />
//         <Route path="connections" element={<Connections />} />
//         <Route path="requests" element={<Requests />} />
//       </Route>

//       <Route path="/login" element={<Login />} />
//       <Route path="/signup" element={<Signup />} />
//     </Routes>
//     </BrowserRouter>
//   </Provider>
//     </>
//   )
// }

// export default App;
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Provider, useSelector } from "react-redux";
import appStore from "./utils/appStore";

import Body from "./components/Body";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Feed from "./components/Feed";
import Profile from "./components/Profile";
import Connections from "./components/Connections";
import Requests from "./components/Requests";
import ProtectedRoute from "./components/ProtectedRoute";

// ✅ Public Route Wrapper
const PublicRoute = ({ children }) => {
  const user = useSelector((state) => state.user);
  return user && user._id ? <Navigate to="/feed" replace /> : children;
};

// ✅ Root redirect: send authenticated users to /feed, otherwise /login
const RootRedirect = () => {
  const user = useSelector((state) => state.user);
  return user && user._id ? (
    <Navigate to="/feed" replace />
  ) : (
    <Navigate to="/login" replace />
  );
};

function App() {
  return (
    <Provider store={appStore}>
      <BrowserRouter>
        <Routes>
          {/* Default redirect: decide based on auth */}
          <Route path="/" element={<RootRedirect />} />

          {/* Public routes */}
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <PublicRoute>
                <Signup />
              </PublicRoute>
            }
          />

          {/* Protected routes under Body */}
          <Route
            element={
              <ProtectedRoute>
                <Body />
              </ProtectedRoute>
            }
          >
            <Route path="/feed" element={<Feed />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/connections" element={<Connections />} />
            <Route path="/requests" element={<Requests />} />
          </Route>

          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;

