import { useState } from "react"
import TrackSearchResult from "./TrackSearchResult"
import axios from "axios"
import { Redirect } from 'react-router-dom';
import { backendURL, frontendURL, spotifyURL } from './urls';

export default function SelectPlaylist({ leader, accessToken, changePlaylist, groupID }) {
    const [redirect, setRedirect] = useState(false);
    const [playlists, setPlaylists] = useState([]);
    const [songs, setSongs] = useState([]);

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
        await axios.get(spotifyURL+"me/playlists", config
        ).then((resp) => {
          console.log("resp1: ", resp)
          setPlaylists(resp.data.items)
          console.log("playlistssadsad: ", playlists)
        })
        .catch((e) => {
          console.log("error: ", e)
        })
    }
    
    const addToPlaylist = async (song) => {
        console.log("groupID: ", groupID)
        console.log("selected song: ", song)
        changePlaylist(song);
        await axios.post(backendURL + "addGroupMemberSong", { 
            "group_id": groupID,
            "spotify_id": song.id,
            "artist": song.artists.length !== 0 ? song.artists[0].name : " ",
            "song_name": song.name
        })
        .then((resp) => {
            if(resp.data === "Success!"){
                console.log("worked")
            } 
        })
        .catch((e) => {
            console.log("error: ", e)
        })
        setRedirect(true)
    }

    const findSongs = async (e) => {
        e.preventDefault()
        var songName = e.target.value
        console.log("song name: ", e.target.value)
        var head = "Bearer " + accessToken
        console.log("accesstoken: ", accessToken)
        let config = {
          headers: {
            "Authorization": head,
            'Content-Type': 'application/json',
          }
        }
        await axios.get(spotifyURL+"search?q="+ songName + "&type=track&include_external=audio&limit=10", config
        ).then((resp) => {
          console.log("song search resp: ", resp)
          setSongs(resp.data.tracks.items)
        })
        .catch((e) => {
          console.log("error: ", e)
        })
    }

    if (redirect) {
        return <Redirect to={"/waitingRoom"} />
    }
    else {
        return (
            
          <div style={{'textAlign': 'center', 'margin': 'auto', 'alignContent': 'center', height: "100vh", backgroundImage: "url("+frontendURL+'pic7.jpeg)'}}> 
              <h1> Select Song</h1>

              <p> <b> Your Key: {groupID} </b> </p>

              <input onChange={findSongs}></input>
              <button onClick={onSubmitRun}> Find Songs: </button>

              <div className="flex-grow-1 my-2" style={{ overflowY: "auto", backgroundColor: "white"}}>
                  {songs.map(list => (
                  <TrackSearchResult
                      songs={list}
                      selectPlaylist={addToPlaylist}
                  />
                  ))}
                  {songs.length === 0 && (
                  <div className="text-center" style={{ whiteSpace: "pre" }}>
                      No songs
                  </div>
              )}
              </div>

              
              
          </div>
        )       
    }
}
