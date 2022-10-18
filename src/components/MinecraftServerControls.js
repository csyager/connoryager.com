import { useEffect, useState } from "react";
import PulseLoader from "react-spinners/PulseLoader";
import ClipLoader from "react-spinners/ClipLoader";

function StartServerForm() {
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const MINECRAFT_SERVER_START_URL = "https://3ety76pa44.execute-api.us-east-1.amazonaws.com/prod/minecraft-server/start"

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        const requestOptions = {
            method: 'POST',
            headers: { 'api-key': password}
        };
        fetch(MINECRAFT_SERVER_START_URL, requestOptions)
            .then(
                (result) => {
                    setLoading(false);
                    if (result.status === 200) {
                        window.location.reload();
                    }
                },
                (error) => {
                    setLoading(false);
                    setError(error);
                }
            );
    }

    if (loading) {
        return (
            <>
                <ClipLoader /><br />
            </>
        )
    } else if (error) {
        return (
            <p>Error:  couldn't start server.</p>
        )
    } else {
        return (
            <div className="container">
                <form onSubmit={e => { handleSubmit(e) }}>
                    <input type="password" className="form-control" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}/><br />
                    <button className="btn btn-primary" type="submit">Start server</button>
                </form>
            </div>
        )
    }
}

function StopServerForm() {
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const MINECRAFT_SERVER_STOP_URL = "https://3ety76pa44.execute-api.us-east-1.amazonaws.com/prod/minecraft-server/stop"

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        const requestOptions = {
            method: 'POST',
            headers: { 'api-key': password}
        };
        fetch(MINECRAFT_SERVER_STOP_URL, requestOptions)
            .then(
                (result) => {
                    setLoading(false);
                    if (result.status === 200) {
                        window.location.reload();
                    }
                },
                (error) => {
                    setLoading(false);
                    setError(error);
                }
            );
    }

    if (loading) {
        return (
            <>
                <ClipLoader /><br />
            </>
        )
    } else if (error) {
        return (
            <p>Error:  couldn't stop server.</p>
        )
    } else {
        return (
            <div className="container">
                <form onSubmit={e => { handleSubmit(e) }}>
                    <input type="password" className="form-control" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}/><br />
                    <button className="btn btn-danger" type="submit">Stop server</button>
                </form>
            </div>
        )
    }
}

function ServerStateMessage() {
    const [loading, setLoading] = useState(false);
    const [serverState, setServerState] = useState("");
    const [publicIp, setPublicIp] = useState("");
    const [error, setError] = useState(null);
    const MINECRAFT_SERVER_STATE_URL = "https://3ety76pa44.execute-api.us-east-1.amazonaws.com/prod/minecraft-server/status"
    
    useEffect(() => {
        setLoading(true);
        const requestOptions = {
            method: 'GET'
        };
        fetch(MINECRAFT_SERVER_STATE_URL, requestOptions)
            .then(res => res.json())
            .then(
                (result) => {
                    setLoading(false);
                    setServerState(result["state"]);
                    setPublicIp(result["publicIp"]);
                },
                (error) => {
                    setLoading(false);
                    setError(error);
                }
            );
    }, []);



    if (loading) {
        return (
            <>
                <PulseLoader /><br />
            </>
        )
    } else if (error) {
        console.log(error);
        return <p>Error:  server status could not be retrieved.</p>
    } else {
        if (serverState === "running") {
            return (
                <>
                    <h3>Server is <b><span style={{"color": "green"}}>running</span></b></h3>
                    <h3>Public IP:  <b>{publicIp}</b></h3>
                    <StopServerForm />
                </>
            )
        } else if (serverState === "stopped") {
            return (
                <>
                    <h3>Server is <b><span style={{"color": "red"}}>stopped</span></b></h3>
                    <StartServerForm />
                </>
                
            )
        } else {
            return (
                <h3>Server is <b>{serverState}</b></h3>
            )
        }
    }
}

function MinecraftServerControls() {
    return (
        <div className="container">
            <div className="row justify-content-center align-items-center">
                <div className="card" style={{"width": "70vw", "maxWidth": "500px"}}>
                    <div className="card-body">
                        <h1 className="card-title">Minecraft Server</h1>
                        <ServerStateMessage />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MinecraftServerControls;