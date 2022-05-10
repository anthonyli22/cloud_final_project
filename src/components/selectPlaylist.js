import { useState, useEffect } from "react"
import useAuth from "./useAuth"
import Player from "./Player"
import TrackSearchResult from "./TrackSearchResult"
import { Container, Form } from "react-bootstrap"
import SpotifyWebApi from "spotify-web-api-node"
import axios from "axios"
import requests from "requests"
import { Button } from "bootstrap"
import Alert from 'sweetalert2';
import { Redirect, Link, useHistory } from 'react-router-dom';

var url = 'https://api.spotify.com/v1'
var backendURL = 'http://localhost:5000/'

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
        const val = await axios.get("https://api.spotify.com/v1/me/playlists", config
        ).then((resp) => {
          console.log("resp1: ", resp)
          setPlaylists(resp.data.items)
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
