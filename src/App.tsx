import { useEffect } from "react";
import { NavLink, Routes, Route } from "react-router-dom";
import "./App.css";
import ChatHistory from "./component/ChatHistory/ChatHistory";
import LiveChat from "./component/LiveChat";

import { routes } from "./config/config";

import Login from "./component/Login";
import { useAuth } from "./context/AuthContext";

const App = () => {

  const authData: any = useAuth();

  // console.log("Auth Data: ", authData);

  useEffect(() => {

    // console.log("Hi authData: ", authData);

    authData.checkIfLoggedIn();

    // eslint-disable-next-line
  }, []);

  return (
    <>

      {
        authData.data.isLoggedIn ?
          <div className="container">

            <div className="container-left">

              {/* Oribo Logo */}
              <NavLink to="/" className="nav-link" style={{ margin: 0, backgroundColor: "white" }}>
                <img alt="logo" src="https://vil-email-sprint-dashboard.oriserve.com/static/media/ori-logo-solo.2b103573806a735ad176.png" style={{ width: "50%" }} />
                <p style={{ textAlign: "center" }}>v1.1</p>
              </NavLink>

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

            <div className="container-right">

              <Routes>
                <Route path="chatHistory" element={<ChatHistory />} />
                <Route path="liveConversations" element={<LiveChat />} />
              </Routes>

            </div>

          </div>
          :
          <Login />
      }

    </>
  );
}

export default App;