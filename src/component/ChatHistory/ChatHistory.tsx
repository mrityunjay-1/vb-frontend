
import { useEffect, useState } from "react";
import Header from "../Header/Header";
import "./call-history.css";

const Caller = ({ details, currSession }: any) => {

    console.log("details: ", details.sessionId);
    console.log("currSession: ", currSession);

    return (
        <>
            <div onClick={() => details.callback(details.sessionId)} className="caller" style={{ borderRadius: "0.3rem", padding: "1.5rem 1rem", display: "flex", borderBottom: "0.01rem solid lightgrey", backgroundColor: currSession === details.sessionId ? "#e6e6e6" : "white" }}>

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

        if (aud) aud.pause(); // clears memory for previous audio play if any

        const audio = new Audio(url);
        audio.play();

        aud = audio;

    }

    useEffect(() => {
        getAllSessions();
    }, []);

    useEffect(() => {
        if (currSession) getSessionDetails(currSession);
    }, [currSession]);

    return (
        <div className="call-history-container">

            <div className="call-history-container-header" style={{}}>
                <Header>
                    <span style={{ fontSize: "1.7rem", fontWeight: 599 }}>CALL HISTORY</span>
                </Header>
            </div>

            <div className="call-history-container-summary-filter">
                {/* Filter goes here */}

                <p style={{ marginRight: "2rem", cursor: "pointer", fontSize: "1.3rem" }}>🗓️</p>

                <input type="date" style={{ border: "0.01rem solid lightgrey", padding: "0.3%", height: "2rem", marginRight: "2rem", cursor: "pointer", fontSize: "1.3rem" }} />

                <p style={{ marginRight: "2rem", cursor: "pointer", fontSize: "1.3rem" }}>~</p>

                <input type="date" style={{ border: "0.01rem solid lightgrey", padding: "0.3%", height: "2rem", marginRight: "2rem", cursor: "pointer", fontSize: "1.3rem" }} />

                <p style={{ marginRight: "2rem", cursor: "pointer", fontSize: "1.3rem" }}>APPLY FILTERS</p>

                <p style={{ marginRight: "2rem", cursor: "pointer", fontSize: "1.3rem" }}>🔄</p>

                <p style={{ marginRight: "2rem", cursor: "pointer", fontSize: "1.3rem" }}>🧲</p>
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

                {/* Child - 2 showing actual logs */}
                <div>

                    <div style={{ borderTopLeftRadius: "1rem", borderTopRightRadius: "1rem", position: "sticky", top: 0, padding: "1.5rem", display: "grid", placeItems: "center", backgroundColor: "rgb(233, 233, 233)", height: "3rem" }}>
                        <span style={{ fontSize: "1.4rem", fontWeight: "bold" }}>Call History Data</span>
                    </div>

                    <div style={{ overflowY: "scroll", padding: "1rem" }}>
                        {
                            currSessionDetails && currSessionDetails.map((chats: { user: { time: string, text: string, audio: string }, bot: { time: string, text: string, audio: string } }) => {

                                let date = chats?.user?.time;
                                let time = chats?.user?.time;

                                date = date.substring(0, 4) + "-" + date.substring(4, 6) + "-" + date.substring(6, 8);
                                time = time.substring(8, 10) + ":" + time.substring(10, 12) + ":" + time.substring(12, 14);

                                console.log("date: ", date);

                                return (
                                    <div style={{ display: "flex", flexDirection: "column", fontSize: "1.4rem" }}>

                                        {/* User hai mai */}{
                                            chats?.user?.text && chats?.user?.audio ?
                                                <>
                                                    <div style={{ display: "flex", marginTop: "2rem", alignItems: "center" }}>

                                                        <div style={{ width: "6%" }}>
                                                            <h3 style={{ backgroundColor: "rgb(169,253, 166)", width: "2.5rem", height: "2.5rem", border: "0.1rem rgb(169,253, 166) grey", borderRadius: "4rem", display: "grid", placeItems: "center" }}>
                                                                U
                                                            </h3>
                                                        </div>

                                                        <p style={{ maxWidth: "60%", width: "auto", backgroundColor: "lightgreen", borderRadius: "1rem", padding: "1rem" }}>
                                                            {

                                                                chats?.user?.text ?? null
                                                            }

                                                            <br />
                                                            <br />
                                                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>

                                                                <div>
                                                                    <p style={{ color: "grey", fontSize: "1rem" }}>{time}</p>
                                                                </div>

                                                            </div>

                                                        </p>

                                                        <p onClick={() => playPauseAudio(chats?.user?.audio)} style={{ cursor: "pointer", width: "5%", marginLeft: "1rem" }}>

                                                            🔉

                                                        </p>

                                                    </div>
                                                </>
                                                :
                                                null
                                        }


                                        {/* aur bot hai mai */}

                                        {
                                            chats?.bot?.text && chats?.bot?.audio ?
                                                <>
                                                    <div style={{ marginTop: "2rem", display: "flex", alignItems: "center", justifyContent: "flex-end" }}>

                                                        <p onClick={() => playPauseAudio(chats?.bot?.audio)} style={{ cursor: "pointer", width: "5%" }}>
                                                            🔉
                                                        </p>

                                                        <div style={{ marginLeft: "1rem", width: "7%", order: 2 }}>
                                                            <h3 style={{ backgroundColor: "rgb(169,253, 166)", width: "2.5rem", height: "2.5rem", border: "0.1rem rgb(169,253, 166) grey", borderRadius: "4rem", display: "grid", placeItems: "center" }}>
                                                                B
                                                            </h3>
                                                        </div>


                                                        <p style={{ border: "0.01rem solid lightgrey", maxWidth: "60%", minWidth: "20%", width: "auto", backgroundColor: "white", borderRadius: "1rem", padding: "1rem" }}>
                                                            {
                                                                chats?.bot?.text ?? null
                                                            }

                                                            <br />
                                                            <br />
                                                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>

                                                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                                                    <p style={{ cursor: "pointer", width: "4%" }}>👍</p>
                                                                    <p style={{ cursor: "pointer", width: "4%" }}>👎</p>
                                                                </div>

                                                                <div>
                                                                    <p style={{ color: "grey", fontSize: "1rem" }}>{time}</p>
                                                                </div>

                                                            </div>
                                                        </p>

                                                    </div>

                                                </>
                                                :
                                                null
                                        }

                                    </div>
                                );
                            })
                        }

                    </div>
                </div>

                {/* User profile details */}
                <div style={{ overflowY: "scroll" }}>

                    <div style={{ display: "flex", padding: "1rem", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                        <p style={{ width: "8rem", height: "8rem", backgroundColor: "lightgreen", borderRadius: "10rem" }}>
                            <img src="https://mrityunjay-1.github.io/portfolio/static/media/my_profile_img.fdf6ddba.png" alt="profileimage" style={{ width: "100%", height: "100%", borderRadius: "10rem" }} />
                        </p>
                        <br />
                        <p style={{ fontSize: "1.4rem", marginBottom: "0.5rem" }}>{"Mrityunjay Kumar"}</p>
                        <p style={{ fontSize: "1.2rem", color: "grey" }}>{"7004516734"}</p>

                        {/* Making custom audio player in js */}

                        <br />
                        <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                            <div className="audio-player-controller">
                                <p style={{ cursor: "pointer" }}>🔉</p>
                                <input type="range" id="audio-seek-bar" style={{ cursor: "pointer", accentColor: "green", height: "0.3rem", width: "60%" }} />
                                <p style={{ cursor: "pointer" }}>▶️</p>
                                <p style={{ cursor: "pointer" }}>⏸️</p>

                                <p>12:00 / 30:00</p>
                            </div>
                            {/* <div>

                            </div> */}
                        </div>

                        {/* <audio controls>
                            <source src="http://localhost:8080/MZ1ba472049bedce2be9bd15febdb89543/user_20230221144836.wav" />
                        </audio> */}
                    </div>

                    <hr />
                    <div style={{ padding: "1rem", margin: "1rem 0" }}>
                        <h3 style={{}}> USER DETAILS </h3>

                        <br />

                        <div style={{ color: "grey", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                            <p>
                                Name
                            </p>
                            <p>
                                Mrityunjay Kumar
                            </p>
                        </div>


                        <div style={{ color: "grey", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                            <p>
                                Name
                            </p>
                            <p>
                                Mrityunjay Kumar
                            </p>
                        </div>


                        <div style={{ color: "grey", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                            <p>
                                Name
                            </p>
                            <p>
                                Mrityunjay Kumar
                            </p>
                        </div>
                    </div>
                    <hr />
                    <div style={{ padding: "1rem", margin: "1rem 0" }}>
                        <h3 style={{}}> LIVE CHAT DETAILS </h3>

                        <br />

                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                            <p>
                                Name
                            </p>
                            <p>
                                Mrityunjay Kumar
                            </p>
                        </div>


                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                            <p>
                                Name
                            </p>
                            <p>
                                Mrityunjay Kumar
                            </p>
                        </div>


                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                            <p>
                                Name
                            </p>
                            <p>
                                Mrityunjay Kumar
                            </p>
                        </div>
                    </div>
                    <hr />

                    <div style={{ padding: "1rem", margin: "1rem 0" }}>
                        <h3 style={{}}> USAGE PROFILE </h3>

                        <br />

                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                            <p>
                                Name
                            </p>
                            <p>
                                Mrityunjay Kumar
                            </p>
                        </div>


                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                            <p>
                                Name
                            </p>
                            <p>
                                Mrityunjay Kumar
                            </p>
                        </div>


                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                            <p>
                                Name
                            </p>
                            <p>
                                Mrityunjay Kumar
                            </p>
                        </div>
                    </div>
                    <hr />

                    <div style={{ padding: "1rem", margin: "1rem 0" }}>
                        <h3 style={{}}> USER SENTIMENTS </h3>

                        <br />

                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                            <p>
                                Name
                            </p>
                            <p>
                                Mrityunjay Kumar
                            </p>
                        </div>


                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                            <p>
                                Name
                            </p>
                            <p>
                                Mrityunjay Kumar
                            </p>
                        </div>


                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                            <p>
                                Name
                            </p>
                            <p>
                                Mrityunjay Kumar
                            </p>
                        </div>
                    </div>
                    <hr />

                    <div style={{ padding: "1rem", margin: "1rem 0" }}>
                        <h3 style={{}}> NOTES </h3>

                        <br />

                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                            <p>
                                Name
                            </p>
                            <p>
                                Mrityunjay Kumar
                            </p>
                        </div>


                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                            <p>
                                Name
                            </p>
                            <p>
                                Mrityunjay Kumar
                            </p>
                        </div>


                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                            <p>
                                Name
                            </p>
                            <p>
                                Mrityunjay Kumar
                            </p>
                        </div>
                    </div>
                    <hr />

                    <div style={{ padding: "1rem", margin: "1rem 0" }}>
                        <h3 style={{}}> TICKET - FRESHDESK </h3>

                        <br />

                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                            <p>
                                Name
                            </p>
                            <p>
                                Mrityunjay Kumar
                            </p>
                        </div>


                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                            <p>
                                Name
                            </p>
                            <p>
                                Mrityunjay Kumar
                            </p>
                        </div>


                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                            <p>
                                Name
                            </p>
                            <p>
                                Mrityunjay Kumar
                            </p>
                        </div>
                    </div>
                    <hr />
                </div>
            </div>

        </div>
    );

}

export default ChatHistory;