import { message } from "antd";
import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext({});

const reducer: any = (state: any, action: any) => {

    // console.log("Action: ", action);

    switch (action.type) {

        case "login":
            return action.payload;

        case "logout":
            return { isLoggedIn: false };

        default:
            return state;
    }

}

const Auth = ({ children }: any) => {

    const [data, dispatch]: any = useReducer(reducer, { isLoggedIn: false });

    const login = async ({ email, password }: any) => {
        try {

            const raw_res = await fetch(`${process.env.REACT_APP_SERVER_URL}/userLogin`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            });

            if (raw_res.status !== 200) throw new Error("Login Api gived non 200 status code...");

            const res = await raw_res.json();

            const payload = { isLoggedIn: true, ...res };

            localStorage.setItem("AuthData", JSON.stringify(payload));

            message.success(`Welcome, ${res.name}`);

            dispatch({ type: "login", payload });

        } catch (err) {
            message.error("Login Failed Please Try Again !");
        }
    }

    const logout = () => {

        const authData = localStorage.getItem("AuthData");

        let userName  = "";

        if (authData) {
            userName = (JSON.parse(authData)).name;
        }

        localStorage.removeItem("AuthData");

        message.success(`${userName ? userName + " is" : ""} successfully logged out.`);

        dispatch({ type: "logout" });
    }

    const checkIfLoggedIn = async () => {
        try {

            let authData: any = localStorage.getItem("AuthData");

            if (authData) {
                authData = JSON.parse(authData);

                if (authData?.token) {
                    const raw_res = await fetch(`${process.env.REACT_APP_SERVER_URL}/verifyToken`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({ token: authData.token })
                    });

                    if (raw_res.status !== 200) {
                        message.error("Token Expired Please Login Again !");
                        logout();
                    };

                    const res = await raw_res.json();

                    if (res?.isValid) {
                        dispatch({ type: "login", payload: authData });
                    }
                }
            }

        } catch (err) {

            console.log("Error in check if logged in : ", err);
            // message.error("");
        }
    }

    return (
        <>

            <AuthContext.Provider value={{ data, login, logout, checkIfLoggedIn }}>
                {children}
            </AuthContext.Provider>

        </>
    );
}

const useAuth = () => {

    const auth = useContext(AuthContext);

    if (!auth) throw new Error("please create context first!");

    return auth;

}

export { Auth, useAuth };