import Header from "../Header/Header";
import { useEffect } from "react";
// import socketio from "socket.io-client";
// // const socket = socketio("http://localhost:9000");

const LiveChat = () => {

    // const [liveUsers, setLiveUsers] = useState([]);

    useEffect(() => {

        // socket.emit("getLiveUsers", "");

        // socket.on("showliveUsers", (users: any) => {
        //     console.log("users: ", users);
        //     setLiveUsers(users);;
        // });

    }, []);

    return (
        <>

            <Header Title="Live Chat" />

            {/* 
            {
                liveUsers?.map((user: any) => {
                    return (
                        <div onClick={() => {

                            // socket.emit("join_room", {
                            //     roomName: user.roomName,
                            //     userType: "agent",

                            // })

                        }} style={{ padding: "2rem", border: "0.1rem solid grey" }}>
                            <p>{user.name}</p>
                        </div>
                    );
                })
            } */}

        </>
    );
}

export default LiveChat;