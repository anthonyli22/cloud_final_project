import Player from "./Player"


export default function ListeningRoom({accessToken, playingTrack}) {

    return (
        <div style={{'textAlign': 'center'}}> 
            <p> Listening!!!</p>
            <div>
                <Player accessToken={accessToken} trackUri={playingTrack?.uri} />
            </div>
        </div>
    )  
}
