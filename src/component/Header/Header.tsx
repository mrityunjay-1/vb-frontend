import { LogoutOutlined } from "@ant-design/icons";
import "./header.css";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Header = ({ Title, children }: any) => {

    const navigate = useNavigate();

    const authData: any = useAuth();

    const logout = () => {
        authData.logout();
        navigate("/login");
    }

    return (
        <div className="header">
            {
                Title ?
                    <h1>{Title}</h1>
                    :
                    null
            }
            {
                children
                    ?
                    <>
                        {children}
                    </>
                    : null
            }
            <div>
                <h1 onClick={logout} style={{ cursor: "pointer" }}><LogoutOutlined /></h1>
            </div>
        </div>
    );
}

export default Header;