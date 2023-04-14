import { NavLink, Routes, Route } from "react-router-dom";
import "./App.css";
import ChatHistory from "./component/ChatHistory/ChatHistory";
import LiveChat from "./component/LiveChat";
// import Header from "./component/Header/Header";

import { WechatOutlined, HistoryOutlined } from "@ant-design/icons";

const routes = [
  {
    routeName: "Live Chats",
    routeUrl: "/liveConversations",
    icon: <WechatOutlined />
  },
  {
    routeName: "Chat History",
    routeUrl: "/chatHistory",
    icon: <HistoryOutlined />
  }
];

const App = () => {

  return (
    <>

      <div className="container">

        <div className="container-left">

          {/* Oribo Logo */}
          <NavLink to="/" className="nav-link" style={{ margin: 0 }}>
            <img src="https://vil-email-sprint-dashboard.oriserve.com/static/media/ori-logo-solo.2b103573806a735ad176.png" style={{ width: "50%" }} />
            <p style={{ textAlign: "center" }}>v1.1</p>
          </NavLink>

          {
            routes?.map((route: any) => {

              // console.log("window.location.pathname.includes(route?.routeUrl) : ", window?.location?.pathname?.endsWith(route?.routeUrl));

              return (
                <>
                  <NavLink to={route?.routeUrl} className="nav-link" style={{ background: window?.location?.pathname?.includes(route?.routeUrl) ? "lightgreen" : "none" }}>
                    {/* <img src="https://vil-email-sprint-dashboard.oriserve.com/static/media/ori-logo-solo.2b103573806a735ad176.png" style={{ width: "30%" }} /> */}
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

    </>
  );
}

export default App;