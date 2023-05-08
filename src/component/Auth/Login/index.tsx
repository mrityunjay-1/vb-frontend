import { useEffect, useState } from "react";
import "./css/login.css";
import { message } from "antd";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = ({ callback }: any) => {

    const authData: any = useAuth();

    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const login = async () => {
        try {
            if (!username || !password) {
                message.error("Please enter username and password both in order to login...");
                return;
            }

            authData.login({ email: username, password });
            navigate("/home");

        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        const loginDetails = localStorage.getItem("loginDetails");

        if (loginDetails) {
            const { isLoggedIn } = JSON.parse(loginDetails);
            if (isLoggedIn) {
                callback(isLoggedIn);
                return;
            }
        }

        // eslint-disable-next-line
    }, []);

    return (
        <>

                    <div className="login-box">

                        <div className="login-box-container">

                            <h1>Login</h1>
                            <br />

                            <input
                                autoComplete="off"
                                type="text"
                                placeholder="username"
                                value={username}
                                onChange={(e) => {
                                    setUsername(e.target.value);
                                }}
                            />

                            <input
                                autoComplete="off"
                                type="password"
                                placeholder="password"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                }}
                            />

                            <p style={{ color: "blue", margin: "1rem 0", cursor: "pointer" }} onClick={() => navigate("/forget-password")}>Forget Password ?</p>


                            <button onClick={login}>Login</button>

                            <h2 style={{ textAlign: "center", color: "blue", marginTop: "2rem", cursor: "pointer" }} onClick={() => navigate("/signup")}>Sign Up</h2>

                        </div>

                    </div>
            
        </>
    );
}

export default Login;