import { message } from "antd";
import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const SignUp = () => {

    const authData: any = useAuth();

    const navigate = useNavigate();


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [name, setName] = useState("");

    const signUp = async () => {
        try {

            if (!name || !email || !password || !confirmPassword) {
                message.error("Please fill all the asked details for signing up!");
                return;
            }

            if (password !== confirmPassword) {
                return message.error("Password should be same");
            }

            if (password.length < 8) {
                return message.error("password length should be atleast 8 characters...");
            }

            const isSignUpSuccessful = await authData.signUp({ name, email, password });

            if (isSignUpSuccessful) {
                message.success("Great You are successfully signed up for VB. Kindly proceed to login now! ");
                navigate("/login");
            }


        } catch (err) {
            console.log("Error while signing up...");
        }
    }

    return (
        <>
            <div className="login-box">

                <div className="login-box-container">

                    <h1>Sign Up</h1>
                    <br />

                    <input
                        autoComplete="off"
                        type="name"
                        placeholder="name"
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value);
                        }}
                    />

                    <input
                        autoComplete="off"
                        type="email"
                        placeholder="email"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
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

                    <input
                        autoComplete="off"
                        type="password"
                        placeholder="confirm password"
                        value={confirmPassword}
                        onChange={(e) => {
                            setConfirmPassword(e.target.value);
                        }}
                    />

                    <button onClick={signUp}>Sign Up</button>

                    <h2 style={{textAlign: "center", color: "blue", marginTop: "2rem", cursor: "pointer"}} onClick={() => navigate("/login")}>Log In</h2>
                </div>

            </div>
        </>
    );
}

export default SignUp;