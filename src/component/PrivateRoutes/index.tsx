import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";


const PrivateRoutes = () => {

    const auth: any = useAuth();

    return (
        <>

            {
                auth?.data?.isLoggedIn ?
                    <Outlet />
                    :
                    <Navigate to="/login" />
            }

        </>
    );
}

export default PrivateRoutes;