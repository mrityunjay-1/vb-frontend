
import { useEffect, useState } from "react";
import Header from "../Header/Header";
import "./call-history.css";

const Caller = ({ details, currSession }: any) => {

    console.log("details: ", details.sessionId);
    console.log("currSession: ", currSession);

    return (
        <>
            <div onClick={() => details.callback(details.sessionId)} className="caller" style={{ padding: "1.5rem 1rem", display: "flex", borderBottom: "0.01rem solid lightgrey", backgroundColor: currSession === details.sessionId ? "lightgrey" : "white" }}>

                <div style={{ width: "14%" }}>

                    <h3 style={{ backgroundColor: "rgb(169,253, 166)", width: "2.5rem", height: "2.5rem", border: "0.1rem rgb(169,253, 166) grey", borderRadius: "4rem", display: "grid", placeItems: "center" }}>
                        {details.name[0]}
                    </h3>

                </div>

                <div style={{ width: "78%", padding: "0.2rem 1rem", display: "flex", flexDirection: "column" }}>
                    <h2 style={{ marginBottom: "0.5rem" }}>{details.phone}</h2>
                    <p style={{ color: "darkgrey" }}>{details.sessionId ?? "Alsngfkdfngknjdfnjhkgfjnhkjfgnkhn"}</p>
                </div>

            </div>

        </>
    );
}

const ChatHistory = () => {

    const [allSessions, setAllSessions] = useState([]);
    const [currSession, setCurrSession] = useState("");
    const [currSessionDetails, setCurrSessionDetails] = useState([]);

    // const [audio, setAudio] = useState();

    // var audio = new Audio('http://localhost:8080/MZ1ba472049bedce2be9bd15febdb89542/user_20230221144755.wav');
    // audio.play();

    const getAllSessions = async () => {
        try {

            const raw_res = await fetch(`http://localhost:8080/getAllTheSessions`);
            const res = await raw_res.json();

            console.log("response for getting all the sessions: ", res);

            if (!res || res.length === 0) {
                console.error("Error ocurred: ");
                return null;
            }

            setAllSessions(res);

        } catch (err) {
            console.log("err: ", err);
        }
    }

    const getSessionDetails = async (sessionId: string) => {
        try {

            console.log("sessionId: ", sessionId);

            const raw_res = await fetch(`http://localhost:8080/getSession/${sessionId}`);
            const res = await raw_res.json();

            console.log("Response: ", res);

            if (!res || res.length === 0) {
                console.error("Error ocurred: ");
                return null;
            }

            setCurrSessionDetails(res);

        } catch (err) {
            console.error(err);
        }
    }

    let aud: any;

    const playPauseAudio = (url: string) => {

        if (aud) aud.pause();

        const audio = new Audio(url);
        audio.play();

        aud = audio;

    }

    useEffect(() => {

        getAllSessions()

    }, []);

    useEffect(() => {

        if (currSession) {
            getSessionDetails(currSession);
        }

    }, [currSession]);

    return (
        <div className="call-history-container">

            <div className="call-history-container-header" style={{}}>
                <Header>
                    <span style={{ fontSize: "1.7rem", fontWeight: 599 }}>CALL HISTORY</span>
                </Header>
            </div>

            <div className="call-history-container-summary-filter">
                <br />
            </div>

            <div className="call-history-container-data-viewer">

                {/* child - 1 */}
                <div>

                    <div style={{ borderTopLeftRadius: "1rem", borderTopRightRadius: "1rem", position: "sticky", top: 0, padding: "1.5rem", display: "grid", placeItems: "center", backgroundColor: "rgb(169,253, 166)", height: "3rem" }}>
                        <span style={{ fontSize: "1.4rem", fontWeight: "bold" }}>Call History Data</span>
                    </div>

                    <div style={{ overflowY: "scroll", padding: "1rem" }}>
                        {
                            allSessions && allSessions.map((sid) => {
                                return (
                                    <Caller
                                        currSession={currSession}
                                        details={{
                                            name: "User",
                                            phone: "Phone",
                                            sessionId: sid,
                                            callback: (sid: string) => setCurrSession(sid)
                                        }}
                                    />
                                );
                            })
                        }
                    </div>

                </div>

                <div>

                    <div style={{ borderTopLeftRadius: "1rem", borderTopRightRadius: "1rem", position: "sticky", top: 0, padding: "1.5rem", display: "grid", placeItems: "center", backgroundColor: "rgb(233, 233, 233)", height: "3rem" }}>
                        <span style={{ fontSize: "1.4rem", fontWeight: "bold" }}>Call History Data</span>
                    </div>

                    <div style={{ overflowY: "scroll", padding: "1rem" }}>
                        {
                            currSessionDetails && currSessionDetails.map((chats: { user: { time: number, text: string, audio: string }, bot: { time: number, text: string, audio: string } }) => {
                                return (
                                    <div style={{ display: "flex", flexDirection: "column", fontSize: "1.4rem" }}>

                                        {/* User hai mai */}
                                        <div style={{ display: "flex", marginTop: "2rem", alignItems: "center" }}>

                                            <div style={{ width: "6%" }}>
                                                <h3 style={{ backgroundColor: "rgb(169,253, 166)", width: "2.5rem", height: "2.5rem", border: "0.1rem rgb(169,253, 166) grey", borderRadius: "4rem", display: "grid", placeItems: "center" }}>
                                                    U
                                                </h3>
                                            </div>

                                            <p style={{ width: "60%", backgroundColor: "lightgreen", borderRadius: "1rem", padding: "1rem" }}>
                                                {

                                                    chats?.user?.text ?? null
                                                }

                                                <br />
                                                <br />
                                                <div style={{ display: "flex", justifyContent: "space-between" }}>

                                                    <div>
                                                        <p>{chats?.user?.time ? new Date(chats?.user?.time).toLocaleDateString() : null}</p>
                                                    </div>

                                                </div>

                                            </p>

                                            <p onClick={() => playPauseAudio(chats?.user?.audio)} style={{ cursor: "pointer", width: "5%", marginLeft: "1rem" }}>

                                                🔉

                                            </p>

                                        </div>

                                        {/* aur bot hai mai */}
                                        <div style={{ marginTop: "2rem", display: "flex", alignItems: "center", justifyContent: "flex-end" }}>

                                            <p onClick={() => playPauseAudio(chats?.bot?.audio)}  style={{ cursor: "pointer", width: "5%" }}>
                                                🔉
                                                </p>

                                            <div style={{ marginLeft: "1rem", width: "7%", order: 2 }}>
                                                <h3 style={{ backgroundColor: "rgb(169,253, 166)", width: "2.5rem", height: "2.5rem", border: "0.1rem rgb(169,253, 166) grey", borderRadius: "4rem", display: "grid", placeItems: "center" }}>
                                                    B
                                                </h3>
                                            </div>
                                            <p style={{ border: "0.01rem solid lightgrey", width: "60%", backgroundColor: "white", borderRadius: "1rem", padding: "1rem" }}>
                                                {
                                                    chats?.bot?.text ?? null
                                                }

                                                <br />
                                                <br />
                                                <div style={{ display: "flex", justifyContent: "space-between" }}>

                                                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                                                        <p style={{ cursor: "pointer", width: "4%" }}>👍</p>
                                                        <p style={{ cursor: "pointer", width: "4%" }}>👎</p>
                                                    </div>

                                                    <div>
                                                        <p>{chats?.bot?.time ? new Date(chats?.bot?.time).toLocaleDateString() : null}</p>
                                                    </div>

                                                </div>
                                            </p>



                                        </div>

                                    </div>
                                );
                            })
                        }

                    </div>
                </div>

                <div>
                    3
                </div>
            </div>

        </div>
    );

}

export default ChatHistory;