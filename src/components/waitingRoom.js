import { useState } from "react"
import { Redirect } from 'react-router-dom';


export default function WaitingRoom({leader}) {
    const [startMusic, setStartMusic] = useState(false)

    const start = () => {
        setStartMusic(true)
    }
    if(startMusic){
        return <Redirect to={'/listeningRoom'} />
    }
    return (
        <div style={{'textAlign': 'center', 'margin': 'auto'}}> 
            {leader === false && <h1 style={{'textAlign': 'center'}}> Waiting for group leader to start...</h1>}
            {leader === true && 
                <div >
                    <h1 > You are the leader </h1>
                    <p > Now when you group is ready, you may click the "Start" button below <br/> 
                        and we'll generate a playlist to your group's taste. <br/> Enjoy! </p>
                    <button onClick={start}> Start the music! </button>
                </div>
            }
        </div>
    )  
}
