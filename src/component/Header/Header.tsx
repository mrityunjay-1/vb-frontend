import { LogoutOutlined } from "@ant-design/icons";
import "./header.css";
import { useAuth } from "../../context/AuthContext";

const Header = ({ Title, children }: any) => {

    const authData: any = useAuth();

    const logout = () => {
        authData.logout();
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