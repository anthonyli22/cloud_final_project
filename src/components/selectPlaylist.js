import { useState } from "react"
import TrackSearchResult from "./TrackSearchResult"
import axios from "axios"
import { Redirect } from 'react-router-dom';
import { backendURL, spotifyURL } from './urls';

export default function SelectPlaylist({ leader, accessToken, changePlaylist, groupID }) {
    const [redirect, setRedirect] = useState(false);
    const [playlists, setPlaylists] = useState([])

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
        const val = await axios.get(spotifyURL+"me/playlists", config
        ).then((resp) => {
          console.log("resp1: ", resp)
          setPlaylists(resp.data.items)
          console.log("playlistssadsad: ", playlists)
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
        console.log("playlists123: ", playlists)
        return (
            
            <div style={{'textAlign': 'center', 'margin': 'auto', 'alignContent': 'center'}}> 
                <h1> Select Playlist</h1>

                <p> Your Key: {groupID} </p>

                <input></input>
                <button onClick={onSubmitRun}> Find Playlists </button>

                <div className="flex-grow-1 my-2" style={{ overflowY: "auto",'alignContent': 'center' }}>
                    {playlists.map(list => (
                    <TrackSearchResult
                        playlist={list}
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
