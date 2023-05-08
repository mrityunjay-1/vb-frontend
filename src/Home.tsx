import { useEffect } from "react";
import { useAuth } from "./context/AuthContext";
import { useNavigate, Route, Routes, NavLink } from "react-router-dom";
import { routes } from "./config/config";
import WelcomePage from "./component/WelcomePage";
import ChatHistory from "./component/ChatHistory/ChatHistory";
import LiveChat from "./component/LiveChat";



const Home = () => {

    const auth: any = useAuth();

    const navigate = useNavigate();

    console.log("Auth in Home: ", auth);

    useEffect(() => {

        console.log("auth?.data?.isLoggedIn : ", auth?.data?.isLoggedIn);

        if (!auth?.data?.isLoggedIn) {
            // navigate("/login");
        }
    }, [auth]);

    return (
        <>
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

                        <Route>
                            {/* <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} /> */}

                            <Route path="/" element={<WelcomePage />} />
                            <Route path="chatHistory" element={<ChatHistory />} />
                            <Route path="liveConversations" element={<LiveChat />} />
                        </Route>

                        {/* <Route path="/*" element={<></>} /> */}

                    </Routes>

                </div>

            </div>
        </>
    );
}

export default Home;