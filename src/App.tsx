import { useEffect } from "react";
import { NavLink, Routes, Route } from "react-router-dom";
import "./App.css";
import ChatHistory from "./component/ChatHistory/ChatHistory";
import LiveChat from "./component/LiveChat";

import { routes } from "./config/config";

import Login from "./component/Auth/Login";
import { useAuth } from "./context/AuthContext";
import SignUp from "./component/Auth/SignUp";
import WelcomePage from "./component/WelcomePage";
import RouterPage from "./component/RouterPage";
import ForgetPassword from "./component/Auth/ForgetPassword";

const App = () => {

  const authData: any = useAuth();

  useEffect(() => {
    authData.checkIfLoggedIn();
    // eslint-disable-next-line
  }, []);

  return (
    <>

      {
        authData.data.isLoggedIn ?
          <div className="container">

            {/* Left Side panel Container */}
            <div className="container-left">

              {/* Logo -> situated at left top most corner */}
              <NavLink to="/" className="logo-container" style={{ backgroundColor: "white" }}>
                <img alt="logo" src="https://vil-email-sprint-dashboard.oriserve.com/static/media/ori-logo-solo.2b103573806a735ad176.png" style={{ width: "50%" }} />
                <center><p>v1.1</p></center>
              </NavLink>

              {/* Rendering all the routes */}
              {
                routes?.map((route: any, index) => {
                  return (
                    <>
                      <NavLink key={index} to={route?.routeUrl} className={({ isActive }) => (["nav-link", isActive ? "active" : null].join(" "))} >
                        <h1>{route.icon}</h1>
                        <p>{route?.routeName}</p>
                      </NavLink>
                    </>
                  );
                })
              }

            </div>

            {/* Right Side panel Container */}
            <div className="container-right">

              {/* Routes Listed over here are protected */}
              <Routes>

                {/* Why this is not required as i am already checking auth status above to render this block of code */}
                {/* <Route element={<PrivateRoutes />}> */}
                {/* </Route> */}

                <Route path="/" element={<WelcomePage />} />
                <Route path="/home" element={<WelcomePage />} />
                <Route path="/chatHistory" element={<ChatHistory />} />
                <Route path="/liveConversations" element={<LiveChat />} />
                <Route path="/*" element={<><p>404 Not Found.</p></>} />

              </Routes>

            </div>

          </div>
          :
          <Routes>
            <Route index path="/" element={<RouterPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/forget-password" element={<ForgetPassword />} />
            <Route path="/*" element={<><p>404 Not Found.</p></>} />
          </Routes>
      }

    </>
  );
}

export default App;