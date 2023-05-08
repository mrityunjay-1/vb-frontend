import { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const RouterPage = () => {

    const authData: any = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!authData.data.isLoggedIn) {
            navigate("/login");
        } else {
            navigate("/");
        }
        // eslint-disable-next-line
    }, []);

    return (
        <>

            <h1>Loading...</h1>

        </>
    );
}

export default RouterPage;