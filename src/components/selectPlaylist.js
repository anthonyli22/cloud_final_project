import { useState,  } from "react"
import TrackSearchResult from "./TrackSearchResult"
import axios from "axios"
import { Redirect } from 'react-router-dom';

var url = 'https://api.spotify.com/v1'
var backendURL = 'http://localhost:3001/'

export default function SelectPlaylist({ leader, accessToken, changePlaylist, groupID }) {
    const [redirect, setRedirect] = useState(false);
    const [playlists, setPlaylists] = useState([])
    const [selectedPlaylists, setSelectedPlaylists] = useState([])
    const selected = (e) => {
        e.preventDefault()
        setRedirect(true)
    }

    const onSubmitRun = async (e) => {
        e.preventDefault()
        console.log("loggers")
        if(!accessToken) return
        var head = "Bearer " + accessToken
        console.log("accesstoken: ", accessToken)
        let config = {
          headers: {
            "Authorization": head,
            'Content-Type': 'application/json'
          }
        }
        console.log("moneykkkd")
        const val = await axios.get("https://api.spotify.com/v1/me/playlists", config
        ).then((resp) => {
          setPlaylists(resp.data.items)
          console.log("resp1: ", resp)
        })
        .catch((e) => {
          console.log("error: ", e)
        })
    }
    
    const addToPlaylist = (playlist) => {
        changePlaylist(playlist)
        console.log("playlists:", playlist)
        setRedirect(true)
    }

    if (redirect) {
        // if(leader){
        //     return <Redirect to={"/leaderRoom"} />
        // }
        // else {
        //     return <Redirect to={"/waitingRoom"} />
        // }
        return <Redirect to={"/waitingRoom"} />
    }
    else {
        return (
            <div style={{'textAlign': 'center', 'margin': 'auto'}}> 
                <h1> Select Playlist</h1>

                <p> Your Key: {groupID} </p>

                <input></input>
                <button onClick={onSubmitRun}> Find Playlists </button>

                <div className="flex-grow-1 my-2" style={{ overflowY: "auto",'alignContent': 'center' }}>
                    {playlists.map(playlist => (
                    <TrackSearchResult
                        playlist={playlist}
                        selectPlaylist={addToPlaylist}
                    />
                    ))}
                    {playlists.length === 0 && (
                    <div className="text-center" style={{ whiteSpace: "pre" }}>
                        No PlayLists
                    </div>
                )}
                </div>

                
                
            </div>
        )       
    }
}
